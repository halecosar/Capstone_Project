import { Modal, Button } from '@mui/material';
import React from 'react';

function ErrorModal({ errorMsg, openModal, setOpenModal }) {
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div>
            <Modal
                open={openModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: 'rgba(255, 192, 203, 0.5)', borderRadius: 8, padding: 24 }}>
                    <h2 style={{ color: '#6B555E' }}
                        id="modal-title">HATA</h2> <br />
                    <p id="modal-description">{errorMsg}</p> <br />
                    <Button style={{ color: '#6B555E', }} onClick={handleCloseModal}>Kapat</Button>
                </div>
            </Modal>
        </div>
    )
}
export default ErrorModal;
