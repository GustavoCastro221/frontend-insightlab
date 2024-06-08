import React from 'react';
import Modal from 'react-modal';

const DeleteConfirmation = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
        <Modal
        
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirm Delete"
            className="ReactModal__Content"
            overlayClassName="ReactModal__Overlay"
        >
            <form className="modal-form">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza de que deseja excluir este fornecedor?</p>
            <div className="form-buttons">
                <button onClick={onConfirm} className="delete-button">Excluir</button>
                <button onClick={onRequestClose}>Cancelar</button>
            </div>
            </form>
        </Modal>
    );
};

export default DeleteConfirmation;