import React from 'react';
import {withRouter} from 'react-router-dom';

class Settings extends React.Component{
    constructor(props){
        super(props);

        this.goBack = this.goBack.bind(this);
    }

    goBack(){
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
                <div className="row padding-p5">
                    Just a setting page, I don't even know what I want here.
                </div>
            </div>
        );
    }
}

export default withRouter(Settings);