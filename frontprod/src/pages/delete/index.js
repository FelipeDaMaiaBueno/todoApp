import React, { Component } from 'react';
import api from '../../services/api';


import './styles.css';

export default class Delete extends Component {
    state = {
        todo: []
    };

    componentDidMount() {
        //metodo executado quando o componente é mostrado em tela
        this.carregaProd();
    }

    carregaProd = async () => {
        const response = await api.get('/todo');        //acessa /produtos

        this.setState({ todo: response.data.data });
        //console.log(response.data.data);                //mostra os produtos no console
    }

    delProdutos = _ => {
        const { todo } = this.state;
        fetch(`http://localhost:4000/todo/delete?idtodo=${todo.idtodo}`)
            .then(this.carregaProd)
            .catch(err => console.error(err))
    }

    render() {
        const { todo } = this.state;
        return (<li key={todo.idtodo}>
            {todo.descricao}
            <a href="#" onClick={this.delProdutos}>Del</a>
        </li>
        );
    }
}