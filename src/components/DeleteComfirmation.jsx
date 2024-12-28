import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDeleteConfirmationModal } from '../store/slices/common';
import {
    Dialog,
    Button,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText
} from '@mui/material';

export const DeleteConfirmation = ({ cb }) => {
    const dispatch = useDispatch();
    const { showDeleteConfirmationModal } = useSelector((state) => state.common);

    const handleCloseModal = () => {
        toast.error("Delete operation is cancelled.");
        dispatch(toggleDeleteConfirmationModal(undefined));
    }

    const handleConfirmDelete = () => {
        if (cb && typeof cb === 'function') {
            cb();
            dispatch(toggleDeleteConfirmationModal(undefined));
        }
    };

    return (
        <Dialog open={showDeleteConfirmationModal} onClose={handleCloseModal} >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this item? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog >
    )
}