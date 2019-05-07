import React, { Component } from 'react';
import api from '../../services/api';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import './styles.css';


export default class Main extends Component {
    state = {
        todo: [],
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
        const response = await api.get('/todo');        //acessa /produtos

        this.setState({ todo: response.data.data });
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
        const response = await api.get(`/todo?page=${this.pagePosition}&limit=${this.limit}`);
        this.setState({ produtos: response.data.data });
        const { produtos } = this.state;
        if (produtos.length === 0) {
            this.prevPage()
        }
    }



    render() {
        const { todo } = this.state;

        return (
            <div className='lista-produto'>
                {todo.map(todo => {
                    return <div key={todo.idtodo} class="flexfather produto">
                        <div class="flexson checkboxFeito">{todo.feito}</div>
                        <div class="flexson">
                            <p>
                                {todo.descricao}
                                {/* <strong>{todo.descricao}</strong>
                                <span>{todo.idtodo}</span> */}
                            </p>
                        </div>
                        <div class="flexson opcaoBtn editbtn">
                        <Fab href="/produtos/update" color="default" aria-label="Edit" className={todo.fab}>
                            <Icon>edit_icon</Icon>
                        </Fab>
                        </div>
                        <div class="flexson opcaoBtn">
                            <IconButton arial-label="Delete" className={todo.margin} >
                                <DeleteIcon fontSize="large" />
                            </IconButton>
                        </div>
                    </div>
                }
                )
                }
                <div className="actions">

                    <button onClick={this.prevPage}>Anterior</button>

                    <a href="/produtos/add">Add Produto</a>

                    <button onClick={this.nextPage}>Próximo</button>
                </div>

            </div>
        );
    }
}