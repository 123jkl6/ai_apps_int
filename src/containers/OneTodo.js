import React from 'react';
export class OneTodo extends React.Component {

    constructor(props) {
        super(props);
        this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
        //this.defaultTime = this.defaultTime.bind(this);
    };

    handleStatusUpdate(event) {
        const newPayload = { ...this.props.todo };
        newPayload.status = event.target.value;
        console.log(newPayload);
        this.props.updateTodo(newPayload);
        //this.setState({todo:newPayload});
    }

    handleDeleteTodo() {
        //only id needed
        const newPayload = { id:this.props.todo.id };
        console.log(newPayload);
        this.props.deleteTodo(newPayload);
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
                    <div >
                        <span >ID {this.props.todo ? this.props.todo.id : null}</span>

                    </div>
                    <div>
                        <span className="title"> Title : </span>
                        {this.props.todo ? this.props.todo.title : null}

                    </div>
                    <div>
                        <span className="title">Summary</span>
                        <p>
                            {this.props.todo ? this.props.todo.summary.split('\n').map((item, key) => {
                                return <span key={key}>{item}<br /></span>
                            }) : null}
                        </p>
                    </div>
                    <div>
                        labels : {this.props.todo ? (this.props.todo.labels ? this.props.todo.labels.map((item, key) => {
                            return <span key={key}>{key!=this.props.todo.labels.length?item+", ":item}</span>
                        }) : null) : null}
                    </div>
                    <div>
                        attachments : {this.props.todo ? (this.props.todo.attachments ? this.props.todo.attachments.map((item, key) => {
                            return <span key={key}>{key!=this.props.todo.labels.length?item.name+", ":item.name}</span>
                        }) : null) : null}
                    </div>
                </div>
                <div className="col-lg-3 col">
                    <span className="row btn btn-danger" style={{marginBottom:"5%"}} onClick={this.handleDeleteTodo}>DELETE</span>
                    
                    <span className="row">Due</span>
                    <br />
                    <span className="row">Date : {this.props.todo ? this.props.todo.date : null}</span>
                    <span className="row">Time : {this.props.todo ? this.props.todo.time : null}</span>
                    <span className="row">
                        Status : <select className="form-control status-control" value={this.props.todo.status} onChange={this.handleStatusUpdate}>
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