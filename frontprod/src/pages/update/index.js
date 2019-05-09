import React, { Component } from 'react';
import api from '../../services/api';
import FormControl from '@material-ui/core/FormControl';

import './styles.css';
import { Select, MenuItem } from '@material-ui/core';


export default class Update extends Component {
    state = { todo: [] };

    componentDidMount() {
        //metodo executado quando o componente é mostrado em tela
        const {idtodo} = this.props.match.params;

            this.carregaProd(idtodo);
        }
        

    carregaProd = async (id) => {
        const response = await api.get('/todo/select/'+id);        

        if (Object.keys(response.data).length != 0){
        this.setState({ todo: response.data[0] });
        // console.log(this.state.todo)
        }
        else{
            return console.log("ERRO ID NÃO ENCONTRADO")
        }
    }

    updateProd = _ => {
        const { todo } = this.state;
        fetch(`http://localhost:4000/todo/update?id=${todo.idtodo}&descricao=${todo.descricao}&feito=${todo.feito}`)
            .then(e => {
                window.location="/"
            })
            .catch(err => console.error(err))
    }

    render() {
        const {todo} = this.state;

        return (
            <div className='lista-produto-update'>
                <h3>ID da Tarefa</h3>
                <input id='inputProdUpIDTODO' value={todo.idtodo} disabled/>
                <h3>Descrição da Tarefa</h3>
                <input id='inputProdUpDESC'
                    value={todo.descricao} onChange={e => this.setState({ todo: { ...todo, descricao: e.target.value } })} />
                    <h3>Estado da Tarefa</h3>
                    <FormControl className="formControl">
                        <Select
                            value={todo.feito}
                            onChange={e => {
                                this.setState({ todo: { ...todo, feito: e.target.value }});
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

                <a class='myButton' onClick={this.updateProd}>Atualiza Tarefa</a>
                <a href="/" class='myButton'>Voltar para página Inicial</a>
            </div>
        );
    }
}