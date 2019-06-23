import React from 'react';
import {withRouter} from 'react-router-dom';

import { OneNotification } from './oneNotification';

//making this clas stateful only to make it compatible with withRouter
class Notifications extends React.Component {

    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack () {
        this.props.history.goBack();
    }

    render(){
        
        const notifications = this.props.notifications;
        const displayNotifications = [];
        for (let notification of notifications){
            displayNotifications.push(<OneNotification todo={notification} updateNotification={this.props.updateNotification}></OneNotification>);
        }

        return (
            <div>
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