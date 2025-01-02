import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../store/slices/auth';
import { clearItems } from '../store/slices/item';
import { clearOrders } from '../store/slices/order';
import { clearVendors } from '../store/slices/vendor';
import { clearCustomers } from '../store/slices/customer';
import { clearLocalStorage, clearSessionStorage } from '../helpers/storage';

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logout = () => {
        toast.success("Logout successfully!");
        emptyEveryThing();
        navigate('/login');
    }

    const emptyEveryThing = () => {
        dispatch(clearCustomers());
        dispatch(clearVendors());
        dispatch(clearOrders());
        dispatch(clearItems());
        dispatch(clearUser());
        clearSessionStorage();
        clearLocalStorage();
    }

    return { logout, emptyEveryThing };
};
