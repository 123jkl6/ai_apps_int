import React from 'react';
import { saveAs } from '@progress/kendo-file-saver';
import { Link, withRouter } from 'react-router-dom';

class OneTodo extends React.Component {

    constructor(props) {
        super(props);
        let statusColor = this.getStatusColor(props.todo.status);

        this.state = {
            statusColor: statusColor,
            showDeleteModal: false,
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

    goBack() {
        this.props.history.goBack();
    }

    handleStatusUpdate(event) {
        const newPayload = { ...this.props.todo };
        newPayload.status = event.target.value;
        console.log(newPayload);
        this.props.updateTodo(newPayload);
        this.setState({ statusColor: this.getStatusColor(newPayload.status) });
    }

    handleFavoriteUpdate() {
        const newPayload = { ...this.props.todo };
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

    confirmDeleteModal() {
        this.setState({ showDeleteModal: true },()=>{
            document.getElementsByTagName("body")[0].classList.toggle("modal-open");
            //add slight delay to allow animation to kick in.
            setTimeout(()=>{
                document.getElementById("deleteModal").classList.toggle("custom-modal-open");
            },80);
            
        });
    }

    closeConfirmDeleteModal() {
        this.setState({ showDeleteModal: false },()=>{
            document.getElementsByTagName("body")[0].classList.toggle("modal-open");
        });
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
            <div className=""> 
                {this.state.showDeleteModal?
                <div className="custom-modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content custom-modal-content" id="deleteModal">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm</h5>
                            <button type="button" className="close"  aria-label="Close" onClick={()=>{this.closeConfirmDeleteModal();}}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this todo?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={()=>{this.handleDeleteTodo();}}>DELETE</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>{this.closeConfirmDeleteModal();}}>Close</button>
                        </div>
                        </div>
                    </div>
                </div>
                    :null}
                
                
                <div className="row" style={{ height: "20px" }}></div>
                <div className="row">
                    <button className="btn btn-secondary" onClick={this.goBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </div>
                <div className="row">
                    <hr style={{ width: "100%" }} />
                    <div className="col-lg-9 col">

                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <label className="col-4 text-secondary">ID : </label>
                                    <span className="col-5">{this.props.todo ? this.props.todo.id : null}</span>
                                    <span className="col-3">
                                        <Link to={"/edit/" + this.props.todo.id} style={{ color: "black" }}>
                                            <i className="btn fas fa-edit" style={{ fontSize: "24px" }} ></i>
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <span className="col-4 text-secondary"> Title : </span>
                            <span className="col-5">{this.props.todo ? this.props.todo.title : null}</span>
                        </div>

                        <div className="row text-secondary padding-p5">
                            <span className="col-4">Summary</span>
                        </div>

                        <div className="row padding-p5">

                            <div className="col-4">
                                <p>
                                    {this.props.todo ? this.props.todo.summary ? (this.props.todo.summary.split('\n').map((item, key) => {
                                        return <span key={key}>{item}<br /></span>
                                    })) : null : null}
                                </p>
                            </div>

                        </div>
                        <div className="row padding-p5">
                            <span className="col-4 text-secondary">labels : </span>
                            <span className="col-5">
                                {this.props.todo ? (this.props.todo.labels ? this.props.todo.labels.map((item, key) => {
                                    return <span key={key}>{key !== (this.props.todo.labels.length - 1) ? item + ", " : item}</span>
                                }) : null) : null}
                            </span>
                        </div>
                        <div className="row padding-p5">
                            <span className="col-4 text-secondary">attachments</span>
                            <span className="col-5">
                                {this.props.todo ? (this.props.todo.attachments ? this.props.todo.attachments.map((item, key) => {
                                    return <span key={key}><a className="btn text-info" onClick={() => { this.downloadFile(key); }} >{item.name}</a>{key !== (this.props.todo.attachments.length - 1) ? ", " : ""}</span>
                                }) : null) : null}
                            </span>
                        </div>
                    </div>
                    <div className="col-lg-3 col">
                        <div className="row">
                            <span className="offset-4 col-4 btn btn-danger" style={{ marginBottom: "20%" }} onClick={this.confirmDeleteModal}>
                                DELETE
                            </span>
                        </div>
                        <div className="row padding-p5">
                                <span className="col text-secondary">Created On : </span>
                                <span className="col">
                                    {this.props.todo ? this.props.todo.createDate : null}
                                </span>
                        </div>
                        <div className="row padding-p5">
                            <span className="col text-secondary">Due Date :</span>
                            <span className="col">{this.props.todo ? this.props.todo.date : null}</span>
                        </div>
                        <div className="row padding-p5">
                            <span className="col text-secondary">Due Time :</span>
                            <span className="col">{this.props.todo ? this.props.todo.time : null}</span>
                        </div> 
                        <div className="row padding-p5">
                            <span className="col text-secondary">Status :</span>
                            <span className="">
                            <select className={"col form-control-sm status-control border-bottom " + this.state.statusColor} value={this.props.todo.status} onChange={this.handleStatusUpdate}>
                                <option value="Not Started" >Not Started</option>
                                <option value="Work In Progress">Work In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            </span>
                             
                        </div>
                        <div className="row">
                            <i className={"btn " + (this.props.todo.favorite ? "fas" : "far") + " fa-heart text-danger"} onClick={this.handleFavoriteUpdate}></i>
                        </div>
                    </div>

                </div>
            </div>
        );
    };
};

export default withRouter(OneTodo);