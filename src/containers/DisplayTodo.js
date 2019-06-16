import React from 'react';
import { Link } from 'react-router-dom';

import { OneRowTodo } from './OneRowTodo';

export const DisplayTodo = (props) => {
    const displayTodos = [];

    for (var todoIdx in props.todos){
        displayTodos.push(
            <div key={todoIdx} >
                <OneRowTodo todo={props.todos[todoIdx]} updateTodo={props.updateTodo} deleteTodo={props.deleteTodo} triggerEdit={props.triggerEdit}/>
            </div>
        );
    }

    return (
        <div className="display-todo" >
          <div>
                <div className="row">
                  <div className="col-8"></div>
                  <div className="col-3">
                    <label htmlFor="search">Search</label>
                    <input id="search" className="form-control" onChange={()=>{props.filterTodo(document.getElementById("search").value)}}/>
                  </div>
                  
                </div>
                
              </div>
            <h2 style={{'paddingBottom':'5%'}}>Todos</h2>
            <div className="row" style={{'paddingBottom':'5%'}}>
              <Link to={"create"}>
                <button className="btn btn-primary" >
                  New
                </button>
              </Link>
            </div>
            <div className="row">
              <span className="btn col-2">
                ID
              </span>
              <span className="btn col">
                Title
              </span>
              <span className="btn col-2">
                Date
              </span>
              <span className="btn col-1">
                Fav
              </span>
            </div>
            {displayTodos}
        </div>
    );
};