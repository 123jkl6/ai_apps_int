import React from 'react';
import { saveAs } from '@progress/kendo-file-saver';

export class OneTodo extends React.Component {

    constructor(props) {
        super(props);
        let statusColor = this.getStatusColor(props.todo.status);

        this.state = {
            statusColor: statusColor,
        };
        this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        //this.defaultTime = this.defaultTime.bind(this);
    };

    handleStatusUpdate(event) {
        const newPayload = { ...this.props.todo };
        newPayload.status = event.target.value;
        console.log(newPayload);
        this.props.updateTodo(newPayload);
        this.setState({ statusColor: this.getStatusColor(newPayload.status) });
    }

    handleDeleteTodo() {
        //only id needed
        const newPayload = { id: this.props.todo.id };
        console.log(newPayload);
        this.props.deleteTodo(newPayload);
    }

    getStatusColor(inputStatus) {
        let statusColor = "border-danger";
        if (inputStatus === "Work In Progress") {
            statusColor = "border-warning";
        } else if (inputStatus === "Completed") {
            statusColor = "border-success";
        }
        return statusColor;
    }

    downloadFile(key) {
        console.log(key);
        let file = this.props.todo.attachments[key];
        console.log(file);
        saveAs(file.content, file.name);
    }

    // defaultTime() {
    //     const newPayload = { ...this.props.todo };
    //     newPayload.time = "DEFAULT_TIME";
    //     console.log(newPayload);
    //     this.props.updateTodo(newPayload);
    // }

    render() {
        return (
            <div className="row">
                <hr style={{ width: "100%" }} />
                <div className="col-lg-9 col">
                    <div className="row">
                        <span className="col">ID {this.props.todo ? this.props.todo.id : null}</span>
                        <span className="col"><i className="btn fas fa-edit" style={{fontSize:"24px"}} onClick={()=>{this.props.triggerEdit(this.props.todo);}}></i></span>
                    </div>
                    <div>
                        <span className="title"> Title : </span>
                        {this.props.todo ? this.props.todo.title : null}

                    </div>
                    <div>
                        <span className="title">Summary</span>
                        <p>
                            {this.props.todo ? this.props.todo.summary ? (this.props.todo.summary.split('\n').map((item, key) => {
                                return <span key={key}>{item}<br /></span>
                            })) : null : null}
                        </p>
                    </div>
                    <div>
                        labels : {this.props.todo ? (this.props.todo.labels ? this.props.todo.labels.map((item, key) => {
                            return <span key={key}>{key !== (this.props.todo.labels.length - 1) ? item + ", " : item}</span>
                        }) : null) : null}
                    </div>
                    <div>
                        attachments : {this.props.todo ? (this.props.todo.attachments ? this.props.todo.attachments.map((item, key) => {
                            return <span key={key}><a className="btn text-info" onClick={() => { this.downloadFile(key); }} >{item.name}</a>{key !== (this.props.todo.attachments.length - 1) ? ", " : ""}</span>
                        }) : null) : null}
                    </div>
                </div>
                <div className="col-lg-3 col">
                    <span className="row btn btn-danger" style={{ marginBottom: "5%" }} onClick={this.handleDeleteTodo}>DELETE</span>

                    <span className="row">Due</span>
                    <br />
                    <span className="row">Date : {this.props.todo ? this.props.todo.date : null}</span>
                    <span className="row">Time : {this.props.todo ? this.props.todo.time : null}</span>
                    <span className="row">
                        Status : <select className={"form-control status-control border-bottom " + this.state.statusColor} value={this.props.todo.status} onChange={this.handleStatusUpdate}>
                            <option value="Not Started" >Not Started</option>
                            <option value="Work In Progress">Work In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </span>
                </div>

            </div>
        );
    };
};