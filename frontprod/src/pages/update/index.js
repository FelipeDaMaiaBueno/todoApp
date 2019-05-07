import React, { Component } from 'react';
import api from '../../services/api';
import FormControl from '@material-ui/core/FormControl';


import './styles.css';
import { Select, InputLabel, MenuItem } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

export default class Update extends Component {
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

    updateProd = _ => {
        const { todo } = this.state;
        fetch(`http://localhost:4000/todo/update?idtodo=${todo.idtodo}&descricao=${todo.descricao}&feito=${todo.feito}`)
            .then(this.carregaProd)
            .catch(err => console.error(err))
    }

    render() {
        const { todo } = this.state;

        return (
            <div className='lista-produto-update'>
                <input id='inputProdUp' placeholder="ID da Tarefa ser Atualizada"
                    value={todo.idtodo} onChange={e => this.setState({ todo: { ...todo, idtodo: e.target.value } })} />
                <input id='inputProdUp' placeholder="Nova Descrição da Tarefa"
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

                <a href="" class='myButton' onClick={this.updateProd}>Atualiza Tarefa</a>
                <a href="/" class='myButton'>Voltar para página Inicial</a>
            </div>
        );
    }
}