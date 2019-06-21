import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class CreateTodo extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.history);
        let editTodo = props.editTodo?{...props.editTodo}:null;
        console.log(editTodo);
        this.state = {
            title: editTodo?editTodo.title:'',
            summary: editTodo?editTodo.summary:'',
            date: editTodo?editTodo.date:'',
            time: '',
            hour: editTodo?editTodo.time[0]+editTodo.time[1]:'',
            minute: editTodo?editTodo.time[2]+editTodo.time[3]:'',
            oneLabel: "",
            labels: editTodo?[...editTodo.labels]:[],
            status: editTodo?editTodo.status:"",
            attachments: editTodo?[...editTodo.attachments]:[],
            favorite:editTodo?editTodo.favorite:false,
            submitted: false,
            validTitle: editTodo?true:false,
            validSummary: editTodo?true:false,
            validDate: editTodo?true:false,
            //validTime: editTodo?true:false,
            validHour: editTodo?true:false,
            validMinute: editTodo?true:false,
        }

        this.handleTitle = this.handleTitle.bind(this);
        this.handleSummary = this.handleSummary.bind(this);
        this.handleLabel = this.handleLabel.bind(this);
        this.removeLabel = this.removeLabel.bind(this);
        this.handleEnterAtLabel = this.handleEnterAtLabel.bind(this);
        this.handleDate = this.handleDate.bind(this);
        //this.handleTime = this.handleTime.bind(this);
        this.handleHour = this.handleHour.bind(this);
        this.handleMinute = this.handleMinute.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.fileInput = React.createRef();
    }

    handleTitle(event) {
        const input = event.target.value;
        this.setState({ title: input });
        if (!input.trim()) {
            this.setState({ validTitle: false });
        }
        else {
            this.setState({ validTitle: true });
        }
        //console.log(this.state);
    }

    handleSummary(event) {
        const input = event.target.value;
        this.setState({ summary: input });
        if (!input.trim()) {
            this.setState({ validSummary: false });
        }
        else {
            this.setState({ validSummary: true });
        }
    }

    handleLabel(event) {
        //console.log(event.key);
        //event.key is undefined here 
        // if (event.key == 'Enter'){
        //     event.preventDefault();
        // }
        this.setState({ oneLabel: event.target.value });
    }

    removeLabel(key){
        console.log(key);
        const oldLabels = this.state.labels;
        const newLabels = [];
        for (var oneLabelIdx in oldLabels){
            if (oneLabelIdx != key){
                newLabels.push(oldLabels[oneLabelIdx]);
            }
        }
        this.setState({labels:newLabels});
    }

    handleEnterAtLabel(event) {
        const input = event.target.value.trim(); 
        //if hit enter, add labels and don't submit form, otherwise, submit form.
        if (event.key == 'Enter' && input) {
            //don't submit form
            event.preventDefault();
            if (!this.state.labels.includes(this.state.oneLabel.trim()) && this.state.oneLabel.trim()) {
                this.setState({ labels: [...this.state.labels, this.state.oneLabel.trim()], oneLabel:"" });
            }
        }
    }

    handleLabelFocusOut(event){
        console.log(event.target);
        if (!this.state.labels.includes(this.state.oneLabel.trim()) && this.state.oneLabel.trim()) {
            this.setState({ labels: [...this.state.labels, this.state.oneLabel.trim()], oneLabel:"" });
        }
    }

    handleDate(event) {
        this.setState({ date: event.target.value });
        if (event.target.value) {
            this.setState({ validDate: true });
        } else {
            this.setState({ validDate: false });
        }

    }

    // handleTime(event) {

    //     if (event.target.value < 0 || event.target.value > 2400 || !event.target.value.match(/[0-9]/)) {
    //         this.setState({ time: '' });
    //         return;
    //     }

    //     this.setState({ time: event.target.value, validTime: true });

    // }

    handleHour(event) {
        console.log(event.target.value);
        if (event.target.value < 0 || event.target.value > 23 ||
            !event.target.value.match(/^[0-9]+$/)) {
            this.setState({ hour: '', validHour: false });
            return;
        }

        this.setState({ hour: event.target.value, validHour: true });

    }

    handleMinute(event) {

        if (event.target.value < 0 || event.target.value > 59 ||
            !event.target.value.match(/^[0-9]+$/)) {
            this.setState({ minute: '', validMinute: false });
            return;
        }

        this.setState({ minute: event.target.value, validMinute: true });
        console.log(this.state);
    }

    handleFile(event) {
        console.log(event.target.value);
        const files = this.fileInput.current.files;
        console.log(this.fileInput.current.files);
        this.convertFile(files[0]).then((fileObj)=>{
            this.setState({ attachments: [...this.state.attachments, fileObj] },() => { console.log(this.state); });
        });
    }

    convertFile(file){
        return new Promise((resolve,reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
              console.log(reader.result);
              var oneFile = reader.result;
              resolve({
                  name: file.name,
                  content:oneFile,
              });
            };
            reader.onerror = function (error) {
              console.log('Error: ', error);
              reject(error);
            };
        });
    }

    removeFile(key){
        console.log(key);
        const oldFiles = this.state.attachments;
        const newFiles = [];
        for (var oneFileIdx in oldFiles){
            if (oneFileIdx != key){
                newFiles.push(oldFiles[oneFileIdx]);
            }
        }
        this.setState({attachments:newFiles});
    }

    handleSubmit(event) {
        this.setState({ submitted: true });
        console.log(this.state);
        if (this.state.validTitle && this.state.validSummary && this.state.validHour && this.state.validMinute && this.state.date) {
            //reconcile hour and minute by concatenating. 
            var hourString = this.state.hour.length == 2 ? this.state.hour : "0" + this.state.hour;
            var minuteString = this.state.minute.length == 2 ? this.state.minute : "0" + this.state.minute;
            //setState is asynchronous. 
            this.setState({ time: hourString + minuteString }, function () {
                console.log(this.state);
                
                if (this.props.editTodo){
                    this.props.updateTodo({
                        id:this.props.editTodo.id,
                        title: this.state.title.trim(),
                        summary: this.state.summary.trim(),
                        labels: this.state.labels,
                        date: this.state.date,
                        time: this.state.time,
                        status: this.props.editTodo?this.props.editTodo.status:"Not Started",
                        attachments:this.state.attachments,
                        favorite:this.props.editTodo?this.props.editTodo.favorite:false,
                    });
                } else {
                    this.props.addTodo({
                        title: this.state.title.trim(),
                        summary: this.state.summary.trim(),
                        labels: this.state.labels,
                        date: this.state.date,
                        time: this.state.time,
                        status: "Not Started",
                        attachments:this.state.attachments,
                        favorite:false,
                    });
                }
                //not relevant
                //this.props.closeTodo();
                if (!this.props.editTodo){
                    this.props.history.push("/");
                } else {
                    this.props.history.push("/todo/"+this.props.editTodo.id);
                }
                
            });

        }
        else {
            //pointless to have if button type is no longer "submit"
            event.preventDefault();
        }

    }

    closeForm(){
        this.props.history.goBack();
    }

    render() {
        return (
            <div id="createTodoForm" className="">
                <form className="container add-padding form-width">

                    <div className="row">
                        <div className="col-11"></div>
                        <div className="col-1">
                            <span className="pull-right btn btn-danger" onClick={()=>{this.closeForm()}}>&times;</span>
                        </div>
                    </div>

                    <div className="form-group" >
                        <div className="row">
                            <label htmlFor="title" className={(!this.state.validTitle && this.state.submitted ? 'text-danger' : '')}>Title </label>
                            <input id="title" className={'form-control'+(!this.state.validTitle && this.state.submitted ? ' border-danger':'')} value={this.state.title}
                                onChange={this.handleTitle} />
                            {!this.state.validTitle && this.state.submitted ? <span className="text-danger">Title is required. </span> : ''}
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="summary" className={(!this.state.validSummary && this.state.submitted ? 'text-danger' : '')}>Summary </label>
                            <textarea id="summary" className={"form-control "+(!this.state.validSummary && this.state.submitted?"border-danger":"")} value={this.state.summary} onChange={this.handleSummary} ></textarea>
                            {!this.state.validSummary && this.state.submitted ? <span className="text-danger">Summary is required. </span> : ''}
                        </div>
                    </div>


                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="labels" >
                                Labels
                            </label>
                            <input id="labels" className="form-control" value={this.state.oneLabel} onChange={this.handleLabel} onBlur={this.handleLabelFocusOut.bind(this)} onKeyDown={this.handleEnterAtLabel} />
                            
                        </div>
                    </div>

                    <ul>
                        {this.state.labels.map((item, key) => {
                            return (
                                <li className="row bg-secondary rounded text-white margin-m5" key={key}>
                                    <span className="col-10">{item}</span><span className="col-2 btn bg-danger" onClick={()=>{this.removeLabel(key);}}>&times; </span>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="date" className={(!this.state.validDate && this.state.submitted ? 'text-danger' : '')}>Date </label>
                            <input type="date" id="date" className={"form-control "+(!this.state.validDate && this.state.submitted?"border-danger":"")} value={this.state.date} onChange={this.handleDate} />
                            {!this.state.validDate && this.state.submitted ? <span className="text-danger">Date is required. </span> : ''}
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            Due
                        </div>
                        <div className="row" >
                            <div className="col" >
                                <label htmlFor="hour" className={(!this.state.validHour && this.state.submitted ? 'text-danger' : '')} >Hour</label>
                                <input id="hour" className={"form-control "+(!this.state.validHour && this.state.submitted ? "border-danger":"")} maxLength="2" value={this.state.hour} onChange={this.handleHour} />
                                {!this.state.validHour && this.state.submitted ? <span className="text-danger">Hour is required and has to be 0 to 23. </span> : ''}
                            </div>
                            <div className="col">
                                <label htmlFor="minute" className={(!this.state.validMinute && this.state.submitted ? 'text-danger' : '')} >Minute</label>
                                <input id="minute" className={"form-control "+(!this.state.validMinute && this.state.submitted ? "border-danger":"")} maxLength="2" value={this.state.minute} onChange={this.handleMinute} />
                                {!this.state.validMinute && this.state.submitted ? <span className="text-danger">Minute is required and has to be 0 to 59. </span> : ''}
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="col">
                            <label htmlFor="attachment">
                                <input type="file" id="file" className="form-control" ref={this.fileInput} onChange={this.handleFile} />
                            </label>
                        </div>
                    </div>

                    <ul>
                        {this.state.attachments.map((item, key) => {
                            return (
                                <li className="row bg-secondary text-white rounded margin-m5" key={key}>
                                    <span className="col-10">{item.name}</span><span className="col-2 btn bg-danger" onClick={()=>{this.removeFile(key)}}>&times; </span>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="form-group">
                        <div className="row">
                            <button className="btn btn-lg btn-primary" type="submit" onClick={this.handleSubmit}>{this.props.editTodo?'Edit':'Create'}</button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
};

export default withRouter(CreateTodo);