import { Modal, Button } from '@mui/material';

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
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <h2 id="modal-title">Error</h2>
                    <p id="modal-description">{errorMsg}</p>
                    <Button onClick={handleCloseModal}>Kapat</Button>
                </div>
            </Modal>
        </div>
    )
}

export default ErrorModal;
