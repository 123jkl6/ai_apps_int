import React from 'react';
import { saveAs } from '@progress/kendo-file-saver';
import { Link, withRouter } from 'react-router-dom';

class OneTodo extends React.Component {

    constructor(props) {
        super(props);
        let statusColor = this.getStatusColor(props.todo.status);

        this.state = {
            statusColor: statusColor,
            showDeleteModal : false,
        };
        this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
        this.handleFavoriteUpdate = this.handleFavoriteUpdate.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.confirmDeleteModal = this.confirmDeleteModal.bind(this);
        this.closeConfirmDeleteModal = this.closeConfirmDeleteModal.bind(this);
        this.goBack = this.goBack.bind(this);
        //this.defaultTime = this.defaultTime.bind(this);
    };

    goBack(){
        this.props.history.push("/");
    }

    handleStatusUpdate(event) {
        const newPayload = { ...this.props.todo };
        newPayload.status = event.target.value;
        console.log(newPayload);
        this.props.updateTodo(newPayload);
        this.setState({ statusColor: this.getStatusColor(newPayload.status) });
    }

    handleFavoriteUpdate(){
        const newPayload = {...this.props.todo};
        newPayload.favorite = !newPayload.favorite;
        console.log(newPayload);
        this.props.updateTodo(newPayload);
    }

    handleDeleteTodo() {
        //only id needed
        //confirm("Are you sure you want to delete this todo?");
        const newPayload = { id: this.props.todo.id };
        console.log(newPayload);
        this.props.deleteTodo(newPayload);
        this.props.history.push("/");
    }

    confirmDeleteModal(){
        this.setState({showDeleteModal:true});
    }

    closeConfirmDeleteModal(){
        this.setState({showDeleteModal:false});
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
            <div className="container">
                {this.state.showDeleteModal?
                    <div class="modal" style={{display:"block"}} tabindex="-1" role="dialog">   
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Confirm</h5>
                                <button type="button" class="close" onClick={this.closeConfirmDeleteModal} aria-label="Close"> 
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Are you sure you want to delete this todo?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" onClick={this.handleDeleteTodo}>DELETE</button>
                                <button type="button" class="btn btn-secondary" onClick={this.closeConfirmDeleteModal}>Close</button>
                            </div>
                        </div>
                    </div>
                    </div>
                    :null}
                <div className="row" style={{height:"20px"}}></div>
                <div className="row">
                    <button className="btn btn-secondary" onClick={this.goBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </div>
                <div className="row">
                    <hr style={{ width: "100%" }} />
                    <div className="col-lg-9 col">
                        <div className="row">
                            <span className="col">ID {this.props.todo ? this.props.todo.id : null}</span>
                            <span className="col">
                                <Link to={"/edit/"+this.props.todo.id} style={{color:"black"}}>
                                    <i className="btn fas fa-edit" style={{fontSize:"24px"}} ></i>
                                </Link>
                            </span>
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
                        <span className="row btn btn-danger" style={{ marginBottom: "5%" }} onClick={this.confirmDeleteModal}>DELETE</span>

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
                        <span className="row">
                            <i className={"btn "+(this.props.todo.favorite?"fas":"far")+" fa-heart text-danger"} onClick={this.handleFavoriteUpdate}></i>
                        </span>
                    </div>

                </div>
            </div>
        );
    };
};

export default withRouter(OneTodo);