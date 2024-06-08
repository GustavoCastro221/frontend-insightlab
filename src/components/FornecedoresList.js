import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalForm from './ModalForm';
import DeleteConfirmation from './DeleteConfirmation';
import './FornecedoresList.css';

const FornecedoresList = () => {
    const [fornecedores, setFornecedores] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentFornecedor, setCurrentFornecedor] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchFornecedores();
    }, [page]);

    const fetchFornecedores = () => {
        console.log(page)
        axios.get(`http://localhost:8080/fornecedores?page=${page}&size=20`)
            .then(response => {
                setFornecedores(response.data._embedded.fornecedors);
                setTotalPages(response.data.page.totalPages);
            })
            .catch(error => console.error('Erro ao buscar fornecedores:', error));
    };

    const handleSave = (fornecedor) => {
        if (currentFornecedor) {
            
            axios.patch(currentFornecedor._links.self.href, fornecedor)
                .then(() => {
                    fetchFornecedores();
                    setCurrentFornecedor(null);
                });
        } else {
            axios.post('http://localhost:8080/fornecedores', fornecedor)
                .then(() => fetchFornecedores());
        }
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        axios.delete(currentFornecedor._links.self.href)
            .then(() => {
                fetchFornecedores();
                setCurrentFornecedor(null);
                setIsDeleteModalOpen(false);
            });
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePreviousPage = () => {
        setPage(page - 1);
    };

    return (
        <div className="fornecedores-list">
            <h1>Lista de Fornecedores</h1>
            <button type="add" onClick={() => { setCurrentFornecedor(null); setIsModalOpen(true); }}>Adicionar Fornecedor</button>
            <table>
                <thead>
                    <tr>
                        <th>CNPJ</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>

                </thead>
                <tbody>
                    {fornecedores.map(f => (
                        <tr key={f.id}>
                            <td>{f.cnpj}</td>
                            <td>{f.nome}</td>
                            <td>
                                <button type="edit" onClick={() => { setCurrentFornecedor(f); setIsModalOpen(true); }}>Editar</button>
                                <button type="delete" onClick={() => { setCurrentFornecedor(f); setIsDeleteModalOpen(true); }}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 0}>Anterior</button>
                <span>Página {page + 1} de {totalPages}</span>
                <button onClick={handleNextPage} disabled={page === totalPages - 1}>Próximo</button>
            </div>

            <ModalForm
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                fornecedor={currentFornecedor}
            />

            <DeleteConfirmation
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default FornecedoresList;
