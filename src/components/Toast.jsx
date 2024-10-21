import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Toast = () => {
    return (
        <ToastContainer
            draggable
            rtl={false}
            closeOnClick
            pauseOnHover
            theme="light"
            autoClose={5000}
            pauseOnFocusLoss
            transition:Bounce
            newestOnTop={false}
            position="top-right"
            hideProgressBar={false}
        />
    );
};

export default Toast;
