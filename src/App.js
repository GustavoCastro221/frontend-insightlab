import React from 'react';
import ListaFornecedores from './components/FornecedoresList';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const App = () => {
    return (
        <div className="App">
            <ListaFornecedores />
        </div>
    );
};

export default App;