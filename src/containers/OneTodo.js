import React from 'react';

export const OneTodo = (props) => {

    return (
        <div className="row">
            <div className="col-8" >
                <div >
                    <span >ID {props.todo ? props.todo.id : null}</span>

                </div>
                <div>
                    <span className="title"> Title : </span>
                    {props.todo ? props.todo.title : null}

                </div>
                <div>
                    <span className="title">Summary : </span>
                    <span>{props.todo ? props.todo.summary : null}</span>
                </div>
            </div>

            <div className="col-4" >
                <span className="p-2">Date : {props.todo ? props.todo.date : null}</span>
                <span className="p-2">Time : {props.todo ? props.todo.time : null}</span>
            </div>
            
            <hr />
        </div>
    );
};