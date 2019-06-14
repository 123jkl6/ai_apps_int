import React from 'react';

import {OneTodo} from './OneTodo';
import { deleteTodo } from '../actions/todoActions';

export const DisplayTodo = (props) => {
    const displayTodos = [];

    for (var todoIdx in props.todos){
        displayTodos.push(
            <div key={todoIdx} >
                <OneTodo todo={props.todos[todoIdx]} updateTodo={props.updateTodo} deleteTodo={props.deleteTodo} />
            </div>
        );
    }

    return (
        <div className="display-todo" >
            <h2 style={{'paddingBottom':'5%'}}>Todos</h2>
            {displayTodos}
        </div>
    );
};