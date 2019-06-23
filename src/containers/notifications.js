import React from 'react';
import {withRouter} from 'react-router-dom';

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
        
        return (
            <div>
                <div className="row">
                    <button className="btn btn-secondary" onClick={this.goBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </div>
                <h2>Notifications</h2>
            </div>
        );
    }
}

export default withRouter(Notifications);