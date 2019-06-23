import React from 'react';
import { pipelineTopicExpression } from '@babel/types';

export const OneNotification = (props) => {
    let notificationStyle = "";
    let dismissButtonStyle = "btn btn-success";
    let dismissButtonText = "Dismissed";
    if (!props.todo.dismissed){
        notificationStyle = "bg-info text-white";
        dismissButtonStyle = "btn btn-danger";
        dismissButtonText = "Dismiss";
    } 

    const updateNotification = () =>{
        props.updateNotification({
            id : props.todo.id,
            title: props.todo.title,
            date : props.todo.date,
            time :props.todo.time,
            status : props.todo.status,
            dismissed : !props.todo.dismissed,
        });
    }

    return (
        <div className={"row border border-primary padding-p5 margin-m5 "+notificationStyle}>
            <div className="col">{props.todo.id}</div>
            <div className="col">{props.todo.title}</div>
            <div className="col">{props.todo.date}</div>
            <div className="col">{props.todo.time}</div>
            <div className="col">{props.todo.status}</div>
            <div className="col">
                <button type="button" className={dismissButtonStyle} onClick={()=>{updateNotification();}}>
                    {dismissButtonText}
                </button>
            </div>
        </div>
    );
}