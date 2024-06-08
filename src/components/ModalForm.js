import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const ModalForm = ({ isOpen, onRequestClose, onSave, fornecedor }) => {
    const [formData, setFormData] = useState({
        cnpj: '',
        nome: ''
    });

    useEffect(() => {
        if (fornecedor) {
            setFormData({
                cnpj: fornecedor.cnpj,
                nome: fornecedor.nome
            });
        } else {
            setFormData({
                cnpj: '',
                nome: ''
            });
        }
    }, [fornecedor, isOpen]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Fornecedor Form"
            className="ReactModal__Content"
            overlayClassName="ReactModal__Overlay"
        >
            <h2>{fornecedor ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}</h2>
            <form onSubmit={handleSubmit} className="modal-form">

            <div className="form-group">
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>CNPJ:</label>
                    <input
                        type="text"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-buttons">
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={onRequestClose}>Cancelar</button>
                </div>
            </form>
        </Modal>
    );
};

export default ModalForm;
