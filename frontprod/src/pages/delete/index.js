import React, { Component } from 'react';
import api from '../../services/api';


import './styles.css';

export default class Delete extends Component {
    state = {
        produto: []
    };

    componentDidMount() {
        //metodo executado quando o componente é mostrado em tela
        this.carregaProd();
    }

    carregaProd = async () => {
        const response = await api.get('/produtos');        //acessa /produtos

        this.setState({ produto: response.data.data });
        //console.log(response.data.data);                //mostra os produtos no console
    }

    delProdutos = _ => {
        const { produto } = this.state;
        fetch(`http://localhost:4000/produtos/delete?idproduto=${produto.idproduto}`)
            .then(this.carregaProd)
            .catch(err => console.error(err))
    }

    render() {
        const { produto } = this.state;
        return (
            <div className='lista-produto-del'>
                <input className='inputProdNome' placeholder="ID do Produto a ser Deletado"
                    value={produto.idproduto} onChange={e => this.setState({ produto: { ...produto, idproduto: e.target.value }})}/>

                    <a href="" class='myButton' onClick={this.delProdutos}>Del Produto</a>
                    
                    <a href="/" class='myButton'>Voltar para página Inicial</a>
            </div>
        );
    }
}