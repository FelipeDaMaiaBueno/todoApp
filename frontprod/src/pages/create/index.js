import React, { Component } from 'react';
import api from '../../services/api';

import FormControl from '@material-ui/core/FormControl';
import { Select, MenuItem } from '@material-ui/core';

import './styles.css';

export default class Create extends Component {
    state = {
        todo: []             //mesmo nome da tab no bd
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

    addProdutos = _ => {
        const { todo } = this.state;
        fetch(`http://localhost:4000/todo/add?descricao=${todo.descricao}&feito=${todo.feito}`)
        .then(e => {
            window.location="/"
        })
            .catch(err => console.error(err))
    }


    render() {
        const { todo } = this.state;
        return (
            <div className='lista-produto-add'>
                <h3>Nova Tarefa</h3>
                <input id='inputProdNome' placeholder="Digite a descrição da nova tarefa"
                    value={todo.descricao} onChange={e => this.setState({ todo: { ...todo, descricao: e.target.value } })} />
                <h3>Estado da tarefa</h3>
                <FormControl className="formControl">
                    <Select
                        value={this.state.feito}
                        onChange={e => {
                            this.setState({ todo: { ...todo, feito: e.target.value } });
                            this.setState({ [e.target.name]: e.target.value });
                        }
                        }
                        displayEmpty
                        name="feito"
                    >
                        <MenuItem value="">
                            <em>Nenhum</em>
                        </MenuItem>
                        <MenuItem value={0}>Completa</MenuItem>
                        <MenuItem value={1}>Incompleta</MenuItem>
                    </Select>
                </FormControl>


                <a className="btn-add" class='myButton' onClick={this.addProdutos}>Adicionar tarefa</a>
                <a href="/" class='myButton'>Voltar para página Inicial</a>
            </div>

        );
    }
}