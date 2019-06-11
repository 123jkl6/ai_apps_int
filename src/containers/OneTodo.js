import React from 'react';

export const OneTodo = (props) => {

    return (
        <div className="row">
            <div className="col-lg-9 col">
                <div >
                    <span >ID {props.todo ? props.todo.id : null}</span>
                    
                </div>
                <div>
                    <span className="title"> Title : </span>
                    {props.todo ? props.todo.title : null}

                </div>
                <div>
                    <span className="title">Summary</span>
                    <p>{props.todo ? props.todo.summary : null}</p>
                </div>
            </div>
            <div className="col-lg-3 col">
                <span className="p-2">Date : {props.todo ? props.todo.date : null}</span>
                <br />
                <span className="p-2">Time : {props.todo ? props.todo.time : null}</span>
            </div>
            <hr />
        </div>
    );
};