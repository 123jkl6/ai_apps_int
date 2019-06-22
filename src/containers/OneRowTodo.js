import React from 'react';
import {Link} from 'react-router-dom';

export const OneRowTodo = (props) => {
    const updateFavorite = () =>{
        const newPayload = {...props.todo};
        newPayload.favorite = !newPayload.favorite;
        props.updateTodo(newPayload);
    }
    return (
        <div className="row">
            <hr style={{ width: "100%" }} />
            <span className="col-2">
                <Link to={"/edit/"+props.todo.id} className="d-none d-sm-block btn fas fa-edit " style={{color:"black"}}>
                </Link>
                
                <Link to={"/todo/"+props.todo.id}>
                    {props.todo.id}
                </Link>
            </span>
            <span className="col">
            <Link to={"/todo/"+props.todo.id}>
                {props.todo.title}
            </Link> 
            </span>
            <span className="col-2">
                {props.todo.date}
            </span>
            <span className="col-2">
                {props.todo.createDate}
            </span>
            <span className="col-1">
                <i className={"btn "+(props.todo.favorite?"fas":"far")+" fa-heart text-danger"} 
                    onClick={()=>{updateFavorite()}}>
                </i>
            </span>
        </div>
    );
}