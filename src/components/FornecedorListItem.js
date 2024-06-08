import React, { useState } from 'react';
import ModalForm from './ModalForm';

const FornecedorListItem = ({ fornecedor, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (formData) => {
        onEdit(fornecedor.id, formData);
        setIsEditing(false);
    };

    return (
        <tr>
            <td>{fornecedor.cnpj}</td>
            <td>{fornecedor.nome}</td>
            <td>
                <button onClick={() => setIsEditing(true)}>Editar</button>
                <button onClick={() => onDelete(fornecedor.id)}>Excluir</button>
            </td>
            <ModalForm
                isOpen={isEditing}
                onRequestClose={() => setIsEditing(false)}
                onSave={handleEdit}
                fornecedor={fornecedor}
            />
        </tr>
    );
};

export default FornecedorListItem;
