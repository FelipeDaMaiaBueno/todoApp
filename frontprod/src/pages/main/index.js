import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';


export default class Main extends Component {
    state = {
        produto: [],
        pagePosition: '',
        maxPage: '',
        limit: ''
    };

    componentDidMount() {
        //metodo executado quando o componente é mostrado em tela
        this.pagePosition = 1
        this.limit = 3
        this.carregaProd();
    }

    carregaProd = async () => {
        const response = await api.get('/produtos');        //acessa /produtos

        this.setState({ produto: response.data.data });
        //console.log(response.data.data);                //mostra os produtos no console
    }


    prevPage = async () => {
        if (this.pagePosition > 1) {
            this.pagePosition--;
            const response = await api.get(`/produtos?page=${this.pagePosition}&limit=${this.limit}`);
            this.setState({ produtos: response.data.data });
        }
    }

    nextPage = async () => {
        this.pagePosition++;
        const response = await api.get(`/produtos?page=${this.pagePosition}&limit=${this.limit}`);
        this.setState({ produtos: response.data.data });
        const { produtos } = this.state;
        if (produtos.length === 0) {
            this.prevPage()
        }
    }

    render() {
        const { produto } = this.state;

        return (
            <div className='lista-produto'>
                {produto.map(produto => {
                    return <article key={produto.idproduto}>
                        <strong>{produto.nome}</strong>
                        <p><b>R$ {produto.preco}</b></p>
                        <p><b> {produto.descricao}</b></p>
                        <p><b> {produto.url}</b></p>
                        <p><b>ID {produto.idproduto}</b></p>
                    </article>
                })}
                <div className="actions">

                    <button onClick={this.prevPage}>Anterior</button>
                    
                    <a href="/produtos/delete">Excluir</a>

                    <a href="/produtos/add">Add Produto</a>

                    <a href="/produtos/update">Editar</a>

                    

                    <button onClick={this.nextPage}>Próximo</button>
                </div>

            </div>
        );
    }
}