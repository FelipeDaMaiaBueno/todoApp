import React, {Component} from 'react';
import api from '../../services/api';


import './styles.css';

export default class Create extends Component {
    state = {
        produto: []             //mesmo nome da tab no bd
    };


    componentDidMount(){
        //metodo executado quando o componente é mostrado em tela
        this.carregaProd();
    }
    
    carregaProd = async () => {
        const response = await api.get('/produtos');        //acessa /produtos
        
        this.setState({produtos: response.data.data});
        //console.log(response.data.data);                //mostra os produtos no console
    }
    
    addProdutos = _ => {
        const {produto} = this.state;
        fetch(`http://localhost:4000/produtos/add?nome=${produto.nome}&preco=${produto.preco}&descricao=${produto.descricao}
        &url=${produto.url}`)
        .then(this.carregaProd)
        .catch(err => console.error(err))
      }


    render() {
        const { produto } = this.state;
        return (
            <div className='lista-produto-add'>
            <input id = 'inputProdNome' placeholder="Novo Produto"
            value={produto.nome} onChange={e => this.setState({produto: {...produto, nome: e.target.value}})}/>
            <input id = 'inputProdPreco' placeholder="Preço"
            value={produto.preco} onChange={e => this.setState({produto: {...produto, preco: e.target.value}})}/>
            <input id = 'inputProdNome' placeholder="Descrição do Produto"
            value={produto.descricao} onChange={e => this.setState({produto: {...produto, descricao: e.target.value}})}/>
            <input id = 'inputProdPreco' placeholder="URL do produto"
            value={produto.url} onChange={e => this.setState({produto: {...produto, url: e.target.value}})}/>
            <a href="" class='myButton' onClick={this.addProdutos}>Add Produto</a>
            <a href="/" class='myButton'>Voltar para página Inicial</a>
          </div>
        
        );
    }
}