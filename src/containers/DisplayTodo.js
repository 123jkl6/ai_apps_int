import React from 'react';

import {OneTodo} from './OneTodo';

export const DisplayTodo = (props) => {
    const displayTodos = [];

    for (var todoIdx in props.todos){
        displayTodos.push(
            <div key={todoIdx} >
                <OneTodo todo={props.todos[todoIdx]} />
            </div>
        );
    }

    return (
        <div className="display-todo">
            <h2 style={{'padding-bottom':'5%'}}>Todos</h2>
            {displayTodos}
        </div>
    );
};