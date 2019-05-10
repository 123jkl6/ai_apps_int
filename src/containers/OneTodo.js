import React from 'react';

export const OneTodo = (props) => {

    return (
        <div clasName="row">
            <div >
                <div className="d-flex">
                    <span >ID {props.todo ? props.todo.id : null}</span>
                    <div className="d-flex flex-column pull-right">
                    <span className="p-2">Date : {props.todo ? props.todo.date : null}</span>
                    <br />
                    <span className="p-2">Time : {props.todo ? props.todo.time : null}</span>
                    </div>
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
           
            <hr />
        </div>
    );
};