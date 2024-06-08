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
    }, [fornecedor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "cnpj" && !/^\d*$/.test(value)) {
            return;
        }
        setFormData({
            ...formData,
            [name]: value
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
                    <label htmlFor="nome">CNPJ:</label>
                    <input
                        type="text"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleChange}
                        pattern="\d*"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-buttons">
                    <button type="button" onClick={onRequestClose}>Cancelar</button>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </Modal>
    );
};

export default ModalForm;

