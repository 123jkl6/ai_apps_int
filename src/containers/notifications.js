import React from 'react';
import {withRouter} from 'react-router-dom';

import { OneNotification } from './oneNotification';

//making this clas stateful only to make it compatible with withRouter
class Notifications extends React.Component {

    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
        this.gotoTodo = this.gotoTodo.bind(this); 
    }

    goBack () {
        this.props.history.goBack();
    }

    gotoTodo(todoId){
        console.log(todoId);
        this.props.history.push("/todo/"+todoId);
    }

    render(){
        
        const notifications = this.props.notifications;
        const displayNotifications = [];
        for (let idx in notifications){
            displayNotifications.push(<OneNotification key={idx} todo={notifications[idx]} updateNotification={this.props.updateNotification} gotoTodo={this.gotoTodo}></OneNotification>);
        }

        return (
            <div >
                <div className="row">
                    <button className="btn btn-secondary" onClick={this.goBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </div>
                <h2>Notifications</h2>
                {displayNotifications}
            </div>
        );
    }
}

export default withRouter(Notifications);