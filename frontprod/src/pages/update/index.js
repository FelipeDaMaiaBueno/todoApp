import React, { Component } from 'react';
import api from '../../services/api';


import './styles.css';

export default class Update extends Component {
    state = {
        produto: []
    };

    componentDidMount() {
        //metodo executado quando o componente é mostrado em tela
        this.carregaProd();
    }

    carregaProd = async () => {
        const response = await api.get('/produtos');        //acessa /produtos

        this.setState({ produtos: response.data.data });
        //console.log(response.data.data);                //mostra os produtos no console
    }

    updateProd = _ => {
        const {produto} = this.state;
        fetch (`http://localhost:4000/produtos/update?idproduto=${produto.idproduto}&nome=${produto.nome}
        &preco=${produto.preco}&descricao=${produto.descricao}&url=${produto.url}`)
        .then(this.getProdutos)
        .catch(err => console.error(err))
      }

      render() {
          const { produto } = this.state;
          return (
            <div className='lista-produto-update'>
                <input id = 'inputProdUp' placeholder="ID do Produto a ser atualizado"
                value={produto.idproduto} onChange={e => this.setState({produto: {...produto, idproduto: e.target.value}})}/>
                <input id = 'inputProdUp' placeholder="Novo Nome"
                value={produto.nome} onChange={e => this.setState({produto: {...produto, nome: e.target.value}})}/>
                <input id = 'inputProdUp' placeholder="Novo Preço"
                value={produto.preco} onChange={e => this.setState({produto: {...produto, preco: e.target.value}})}/>
                <input id = 'inputProdUp' placeholder="Nova Descrição"
                value={produto.descricao} onChange={e => this.setState({produto: {...produto, descricao: e.target.value}})}/>
                <input id = 'inputProdUp' placeholder="Nova URL"
                value={produto.url} onChange={e => this.setState({produto: {...produto, url: e.target.value}})}/>

                <a href="" class='myButton' onClick={this.updateProd}>Atualiza Produto</a>
                <a href="/" class='myButton'>Voltar para página Inicial</a>                
           </div>
          );
    }
}