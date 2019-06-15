import React from 'react';

import {OneTodo} from './OneTodo';

export const DisplayTodo = (props) => {
    const displayTodos = [];

    for (var todoIdx in props.todos){
        displayTodos.push(
            <div key={todoIdx} >
                <OneTodo todo={props.todos[todoIdx]} updateTodo={props.updateTodo} deleteTodo={props.deleteTodo} triggerEdit={props.triggerEdit}/>
            </div>
        );
    }

    return (
        <div className="display-todo" >
            <h2 style={{'paddingBottom':'5%'}}>Todos</h2>
            <div className="row">
                    <span className="col-1">Sort by:</span>
                    <span className="col-2">
                      <select id="sort" className="form-control" onChange={()=>{console.log('sort');}}>
                        <option>ID</option>
                        <option>Title</option>
                        <option>Date</option>
                      </select>
                    </span>
                    <span className="col-2">
                      <select id="order" className="form-control" onChange={()=>{console.log('order');}}>
                        <option>ASC</option>
                        <option>DSC</option>
                      </select>

                    </span>
                  </div>
            {displayTodos}
        </div>
    );
};