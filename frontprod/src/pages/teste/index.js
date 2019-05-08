import React from 'react';

const Teste = (props) => {
    return (
      <div>
        <h1>Teste</h1>
        Essa página equivale a tarefa {props.params.idtodo}
      </div>
    );
};

export default Teste;