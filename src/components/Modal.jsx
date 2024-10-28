import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    p: 4,
    top: '50%',
    left: '50%',
    width: 800,
    boxShadow: 24,
    position: 'absolute',
    border: '2px solid #000',
    bgcolor: 'background.paper',
    transform: 'translate(-50%, -50%)',
};

export default function BasicModal({ open, handleClose, children }) {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}