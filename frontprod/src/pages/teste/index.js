import React, { Component } from 'react';
import api from '../../services/api';
import Todo from '../../components/todo';

export default class Teste extends Component{

      state = {
        todos: []
      };

      render() {
        return (
          <div className="App">
            <ul>
            {
              this.state.todos.map((todo) =>{
                return (<Todo 
                  idtodo={todo.idtodo}>
                  {todo.descricao}
                  </Todo>)
              })
            }
            </ul>
          </div>
        );
      }





}