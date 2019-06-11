import React from 'react';

export class CreateTodo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            summary: '',
            date: '',
            time: '',
            hour: '',
            minute: '',
            submitted: false,
            validTitle: false,
            validSummary: false,
            validDate: false,
            validTime: false,
            validHour: false,
            validMinute: false,
        }

        this.handleTitle = this.handleTitle.bind(this);
        this.handleSummary = this.handleSummary.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleHour = this.handleHour.bind(this);
        this.handleMinute = this.handleMinute.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitle(event) {
        this.setState({ title: event.target.value });
        if (!event.target.value) {
            this.setState({ validTitle: false });
        }
        else {
            this.setState({ validTitle: true });
        }
        //console.log(this.state);
    }

    handleSummary(event) {
        this.setState({ summary: event.target.value });
        if (!event.target.value) {
            this.setState({ validSummary: false });
        }
        else {
            this.setState({ validSummary: true });
        }
    }

    handleDate(event) {
        this.setState({ date: event.target.value});
        if (event.target.value){
            this.setState({ validDate: true});
        } else {
            this.setState({validDate:false});
        }
        
    }

    handleTime(event) {

        if (event.target.value < 0 || event.target.value > 2400 || !event.target.value.match(/[0-9]/)) {
            this.setState({ time: '' });
            return;
        }

        this.setState({ time: event.target.value, validTime: true });

    }

    handleHour(event) {

        if (event.target.value < 0 || event.target.value > 23 ||
            !event.target.value.match(/[0-9]/)) {
            this.setState({ hour: '' , validHour:false });
            return;
        }

        this.setState({ hour: event.target.value, validHour: true });

    }

    handleMinute(event) {

        if (event.target.value < 0 || event.target.value > 59 ||
            !event.target.value.match(/[0-9]/)) {
            this.setState({ minute: '', validMinute:false });
            return;
        }

        this.setState({ minute: event.target.value, validMinute: true });
        console.log(this.state);
    }

    handleSubmit(event) {
        this.setState({ submitted: true });
        console.log(this.state);
        if (this.state.validTitle && this.state.validSummary && this.state.validHour && this.state.validMinute && this.state.date) {
            //reconcile hour and minute by concatenating. 
            var hourString = this.state.hour.length == 2 ? this.state.hour : "0" + this.state.hour;
            var minuteString = this.state.minute.length == 2 ? this.state.minute : "0" + this.state.minute;
            //setState is asynchronous. 
            this.setState({ time: hourString + minuteString },function(){
                console.log(this.state);
                this.props.addTodo(this.state);
                this.props.closeTodo();
            });
            
        }
        else {
            event.preventDefault();
        }

    }

    render() {
        return (
            <div id="createTodoForm">
                <form className="container add-padding form-width">

                    <div className="row">
                        <div className="col-11"></div>
                        <div className="col-1">
                            <span onClick={this.props.closeTodo} className="pull-right btn btn-danger">&times;</span>
                        </div>
                    </div>
                    <div className="form-group" >
                        <div className="row">
                            <label htmlFor="title" className={(!this.state.validTitle && this.state.submitted ? 'text-danger' : '')}>Title </label>
                            <input id="title" className='form-control' value={this.state.title}
                                onChange={this.handleTitle} />
                            {!this.state.validTitle && this.state.submitted ? <span className="text-danger">Title is required. </span> : ''}
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="summary" className={(!this.state.validSummary && this.state.submitted ? 'text-danger' : '')}>Summary </label>
                            <input id="summary" className="form-control" value={this.state.summary} onChange={this.handleSummary} />
                            {!this.state.validSummary && this.state.submitted ? <span className="text-danger">Summary is required. </span> : ''}
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="date" className={(!this.state.validDate && this.state.submitted ? 'text-danger' : '')}>Date </label>
                            <input type="date" id="date" className="form-control" value={this.state.date} onChange={this.handleDate} />
                            {!this.state.validDate && this.state.submitted ? <span className="text-danger">Date is required. </span> : ''}
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row" >
                            <div className="col" >
                                <label htmlFor="hour" className={(!this.state.validHour && this.state.submitted ? 'text-danger' : '')} >Hour</label>
                                <input id="hour" className="form-control" maxLength="2" value={this.state.hour} onChange={this.handleHour} />
                                {!this.state.validHour && this.state.submitted ? <span className="text-danger">Hour is required and has to be 0 to 23. </span> : ''}
                            </div>
                            <div className="col">
                                <label htmlFor="minute" className={(!this.state.validMinute && this.state.submitted ? 'text-danger' : '')} >Minute</label>
                                <input id="minute" className="form-control" maxLength="2" value={this.state.minute} onChange={this.handleMinute} />
                                {!this.state.validMinute && this.state.submitted ? <span className="text-danger">Minute is required and has to be 0 to 59. </span> : ''}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <button className="btn btn-lg btn-primary" type="button" onClick={this.handleSubmit}>Create</button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
};