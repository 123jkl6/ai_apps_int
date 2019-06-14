import React, { Component } from 'react';

import './App.css';
import { connect } from 'react-redux';

import { addTodo, updateTodo, deleteTodo } from './actions/todoActions';
import store from './store';
import {CreateTodo} from './containers/CreateTodo';
import {DisplayTodo} from './containers/DisplayTodo';

class App extends Component {
  constructor(props){
    super(props);
    console.log(props);

    this.state = {
      createToDo:false,
      editTodo : {

      }
    }
  }

  render(){
    return (
      <div>
        
        {this.state.createTodo ? <CreateTodo addTodo={this.props.addTodo.bind(this)} closeTodo={this.closeCreateTodoModal.bind(this)} /> : null}
        <button onClick={this.showCreateTodoModal.bind(this)} className="btn btn-primary btn-large" >
          New
        </button>
        {this.state.currentId}
        <DisplayTodo updateTodo={this.props.updateTodo.bind(this)} deleteTodo={this.props.deleteTodo.bind(this)} todos={this.props.todoState.todos} />
      </div>
    );
  }

  componentDidMount(){
    console.log('componentDidMount()');
    console.log(this.state);
    console.log(this.props.store);
  }

  editTodo(todo){
    this.showCreateTodoModal();
    this.setState({editTodo:todo});
  }

  showCreateTodoModal(){
    this.setState({createTodo:true});
  }

  closeCreateTodoModal(){
    this.setState({createTodo:false});
  }

}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    todoState:state.reducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    addTodo : (todo) => {
      console.log(todo);
      dispatch(addTodo(todo));
    },
    updateTodo : (todo) => {
      console.log(todo);
      dispatch(updateTodo(todo));
    },
    deleteTodo : (todo) => {
      console.log(todo);
      dispatch(deleteTodo(todo));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
