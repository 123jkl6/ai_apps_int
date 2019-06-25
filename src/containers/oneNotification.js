import React from 'react';
import { pipelineTopicExpression } from '@babel/types';

export const OneNotification = (props) => {
    let notificationStyle = "";
    let dismissButtonStyle = "btn btn-success";
    let dismissHeaderStyle = "text-secondary";
    let dismissButtonText = "Dismissed";
    if (!props.todo.dismissed){
        dismissHeaderStyle = "text-dark";
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
    };

    const gotoTodo = (event) => {
        if (event.target.id.includes("dismiss")){
            //don't disrupt dismiss flow, stay on notifications page. 
            return;
        } else {
            props.gotoTodo(props.todo.id);
        }
    };

    return (
        <div className={"row border border-primary margin-m5 header-col align-items-center "+notificationStyle} onClick={gotoTodo} > 
            <div className="col-10">
                <div className={"row align-items-end "+dismissHeaderStyle}>
                <div className="col">Title</div>
                    <div className="col">Due Date</div>
                    <div className="col">Due Time</div>
                    <div className="col">Status</div>
                </div>
                <div className="row padding-p5">
                    {/*<div className="col">{props.todo.id}</div>*/}
                    <div className="col">{props.todo.title}</div>
                    <div className="col">{props.todo.date}</div>
                    <div className="col">{props.todo.time}</div>
                    <div className="col">{props.todo.status}</div>
                </div>
            </div>
            
            <div className="col-2">
                <button type="button" className={dismissButtonStyle} id={"dismiss"+props.todo.id} onClick={()=>{updateNotification();}}>
                    {dismissButtonText}
                </button>
            </div>
        </div>
    );
}