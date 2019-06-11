import React from 'react';

export class CreateTodo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            summary: '',
            date: '',
            time: '',
            submitted: false,
            validTitle: false,
            validSummary: false,
            validDate: false,
            validTime: false,
        }

        this.handleTitle = this.handleTitle.bind(this);
        this.handleSummary = this.handleSummary.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitle(event) {
        this.setState({ title: event.target.value, titleDirty: true });
        if (!event.target.value) {
            this.setState({ validTitle: false });
        }
        else {
            this.setState({ validTitle: true });
        }
        //console.log(this.state);
    }

    handleSummary(event) {
        this.setState({ summary: event.target.value, summaryDirty: true });
        if (!event.target.value) {
            this.setState({ validSummary: false });
        }
        else {
            this.setState({ validSummary: true });
        }
    }

    handleDate(event) {
        this.setState({ date: event.target.value });
    }

    handleTime(event) {

        if (event.target.value < 0 || event.target.value > 2400 || !event.target.value.match(/[0-9]/)) {
            this.setState({ time: '' });
            return;
        }

        this.setState({ time: event.target.value, validTime: true });

    }

    handleSubmit(event) {
        this.setState({ submitted: true });

        if (this.state.time.length == 4) {
            this.setState({ validTime: true });
        }

        if (this.state.date) {
            this.setState({ validDate: true });
        }

        if (this.state.validTitle && this.state.validSummary && this.state.validTime && this.state.validDate) {
            this.props.addTodo(this.state);
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
                        <span onClick={this.props.closeTodo} className="pull-right btn btn-danger">&times;</span>
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
                        <div className="row">
                            <label htmlFor="time" className={(!this.state.validTime && this.state.submitted ? 'text-danger' : '')}>Time 24H format</label>
                            <input id="time" className="form-control" maxLength="4" value={this.state.time} onChange={this.handleTime} />
                            {!this.state.validTime && this.state.submitted ? <span className="text-danger">Time is required and has to be in 24H format. </span> : ''}
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="time" className={(!this.state.validTime && this.state.submitted ? 'text-danger' : '')}>Time 24H format</label>
                            <input id="time" className="form-control" maxLength="4" value={this.state.time} onChange={this.handleTime} />
                            {!this.state.validTime && this.state.submitted ? <span className="text-danger">Time is required and has to be in 24H format. </span> : ''}
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <button className="btn btn-lg btn-primary" onClick={this.handleSubmit}>Create</button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
};