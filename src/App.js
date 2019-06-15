import React, { Component } from 'react';

import './App.css';
import { connect } from 'react-redux';

import { addTodo, updateTodo, deleteTodo, filterTodo } from './actions/todoActions';
import store from './store';
import { CreateTodo } from './containers/CreateTodo';
import { DisplayTodo } from './containers/DisplayTodo';

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      createToDo: false,
      editTodo: null,
      displayTodos:props.todoState.todos,
      searchInput:"",
    }

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.triggerEdit = this.triggerEdit.bind(this);
  }

  render() {
    return (
      <div>

        {this.state.createTodo ? <CreateTodo updateTodo={this.props.updateTodo.bind(this)} addTodo={this.props.addTodo.bind(this)} editTodo={this.state.editTodo} closeTodo={this.closeCreateTodoModal.bind(this)} /> : null}

        {this.state.currentId}
        {!this.state.createTodo ?
          (
            <div>
              <div className="row">
                <div className="col-5">
                  <button onClick={this.showCreateTodoModal.bind(this)} className="btn btn-primary btn-large" >
                  New
                  </button>
                </div>
                <div className="col-3">
                  
                </div>
                
                <div className="col-3">
                  <input id="search" className="form-control" value={this.state.searchInput} onChange={this.handleSearchInput}/>
                </div>
                
              </div>
              <DisplayTodo updateTodo={this.props.updateTodo.bind(this)} deleteTodo={this.props.deleteTodo.bind(this)} todos={this.props.todoState.searchTerm?this.props.todoState.display:this.props.todoState.todos} triggerEdit={this.triggerEdit}></DisplayTodo>
            </div>
            )
          : null}

      </div>
    );
  }

  componentDidMount() {
    console.log('componentDidMount()');
    console.log(this.state);
    console.log(this.props.store);
  }

  editTodo(todo) {
    this.showCreateTodoModal();
    this.setState({ editTodo: todo });
  }

  showCreateTodoModal() {
    this.setState({ createTodo: true }); 
  }

  closeCreateTodoModal() {
    this.setState({ createTodo: false, editTodo:null });
  }

  handleSearchInput (event) {
    const input = event.target.value;
    console.log(input);
    this.setState({searchInput:input});
    //if empty string or input does not contain at least 2 characters, show all and stop execution. 
    // const trimmedInput = input.trim();
    // if (!trimmedInput || trimmedInput.length<2){
    //   this.setState({displayTodos:[...this.props.todoState.todos]});
    //   return;
    // }

    // const displayTodos = [];
    // for (var oneTodo of this.props.todoState.todos){
    //   let added = false;
    //   if (oneTodo.title.includes(trimmedInput) || oneTodo.summary.includes(trimmedInput)){
    //     displayTodos.push({...oneTodo});
    //     added = true;
    //   }

    //   for (var oneLabel of oneTodo.labels){
    //     if (oneLabel.includes(trimmedInput) && !added){
    //       displayTodos.push({...oneTodo});
    //     }
    //   }
    // }
    // console.log(displayTodos);
    // this.setState({displayTodos:displayTodos});
    this.props.filterTodo(input.trim());
  }

  triggerEdit(todo) {
    this.setState({ createTodo: true,editTodo:{...todo} });
  }
}



const mapStateToProps = (state) => {
  console.log(state);
  return {
    todoState: state.reducer,
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    addTodo: (todo) => {
      console.log(todo);
      dispatch(addTodo(todo));
    },
    updateTodo: (todo) => {
      console.log(todo);
      dispatch(updateTodo(todo));
    },
    deleteTodo: (todo) => {
      console.log(todo);
      dispatch(deleteTodo(todo));
    },
    filterTodo : (searchTerm) => {
      dispatch(filterTodo(searchTerm));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
