import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListaFornecedores.css';  // For custom styling

const ListaFornecedores = () => {
    const [fornecedores, setFornecedores] = useState([]);
    let id = 0
    useEffect(() => {
        axios.get('http://localhost:8080/fornecedores')
            .then(response => {
                setFornecedores(response.data._embedded.fornecedors);
                console.log(fornecedores.toString);
            })
            .catch(error => {
                console.error('Erro ao buscar lista de fornecedores', error);
            });
    }, []);

    return (
        <div className="fornecedores-list">
            <h1>Fornecedores</h1>
            <table>
                <thead>
                    <tr>
                        <th>CNPJ</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {fornecedores.map(fornecedor => (
                        <tr key={fornecedor.id}>
                            <td>{fornecedor.cnpj}</td>
                            <td>{fornecedor.nome}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaFornecedores;
