import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../store/slices/auth';
import { clearItems } from '../store/slices/item';
import { clearOrders } from '../store/slices/order';
import { clearVendors } from '../store/slices/vendor';
import { clearCsutomers } from '../store/slices/customer';
import { clearLocalStorage, clearSessionStorage } from '../helpers/storage';

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logout = () => {
        toast.error("Logout successfully!");
        dispatch(clearCsutomers());
        dispatch(clearVendors());
        dispatch(clearOrders());
        dispatch(clearItems());
        dispatch(clearUser());
        clearSessionStorage();
        clearLocalStorage();
        navigate('/login');
    }

    return { logout };
};
