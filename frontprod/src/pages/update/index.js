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
        const response = await api.get('/todo/update/'+id);        //acessa /produtos

        console.log(response);                //mostra os produtos no console
        this.setState({ todo: response.data[0] });
    }

    updateProd = _ => {
        const { todo } = this.state;
        fetch(`http://localhost:4000/todo/update/${todo.idtodo}`)
            .then(this.carregaProd)
            .catch(err => console.error(err))
    }

    render() {
        const { todo } = this.state;

        return (
            <div className='lista-produto-update'>
                <input id='inputProdUp' disabled
                    value={todo.idtodo} onChange={e => this.setState({ todo: { ...todo, idtodo: e.target.value } })} />
                <input id='inputProdUp'
                    value={todo.descricao} onChange={e => this.setState({ todo: { ...todo, descricao: e.target.value } })} />

                    <FormControl className="formControl">
                        <Select
                            value={this.state.feito}
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