import { useLogout } from './useLogout';

export const useAuth = () => {
  const { logout } = useLogout();

  const checkSession = async (token) => {
    try {
      const { expiry, sessionDateTime } = extractDetails(token);

      const today = new Date();
      const sessionStartTime = new Date(sessionDateTime);
      const hoursPassed = (today - sessionStartTime) / 3600000;

      if (hoursPassed > expiry) {
        logout(); // Log out if session has expired.
        return false;
      }

      return true; // Session is valid.
    } catch (error) {
      console.error('Failed to validate session:', error);
      logout(); // Force logout on error.
      return false;
    }
  };

  const extractDetails = (token) => {
    try {
      const decoded = decrypt(token).toString();
      const extractedDetails = decoded.split(' - ');

      if (extractedDetails.length < 4) {
        throw new Error('Malformed token');
      }

      return {
        email: extractedDetails[0],
        expiry: parseFloat(extractedDetails[2]), // Ensure expiry is a number.
        sessionDateTime: extractedDetails[3],
      };
    } catch (error) {
      throw new Error('Failed to extract token details');
    }
  };
  
  const decrypt = (encoded) => {
    const salt = import.meta.env.VITE_PASSWORD_SALT;
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

    try {
      return encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join("");
    } catch (error) {
      throw new Error('Failed to decrypt token');
    }
  };

  return { checkSession };
};
