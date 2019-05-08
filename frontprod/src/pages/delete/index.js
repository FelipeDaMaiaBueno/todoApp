import React, { Component } from 'react';
import api from '../../services/api';


import './styles.css';

export default class Delete extends Component {
    state = { todo: [] };

    componentDidMount() {
        //metodo executado quando o componente é mostrado em tela
        const {idtodo} = this.props.match.params;
        this.carregaProd(idtodo);
    }

    carregaProd = async (id) => {
        const response = await api.get('/todo/delete/'+id);        //acessa /produtos

        console.log(response);                //mostra os produtos no console
        this.setState({ todo: response.data[0] });
    }

    delProdutos = _ => {
        const { todo } = this.state;
        fetch(`http://localhost:4000/todo/delete/${todo.idtodo}`)
            .then(this.carregaProd)
            .catch(err => console.error(err))
    }

    render() {
        const { todo } = this.state;

        return (
            <div className='lista-produto-del'>
                <h1>Tarefa Apagada</h1>
                <a href="/" class='myButton'>Voltar para página Inicial</a>
            </div>
        );
    }
}