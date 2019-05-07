import React from 'react';

const todo = (props) => {
    return (<li>
        <span> descricao: {props.children}, idtodo={props.idtodo} </span>
    </li>
    )
}

export default todo;