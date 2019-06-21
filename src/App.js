import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import './App.css';
import { connect } from 'react-redux';

import history from './history';
import { addTodo, updateTodo, deleteTodo, filterTodo, sortTodos, filterFavTodo } from './actions/todoActions';
import CreateTodo from './containers/CreateTodo';
import { DisplayTodo } from './containers/DisplayTodo';
import OneTodo from './containers/OneTodo';

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

    //this.handleSearchInput = this.handleSearchInput.bind(this);
    //this.triggerEdit = this.triggerEdit.bind(this);
    //this.showCreateTodoModal = this.showCreateTodoModal.bind(this);
  }




  render() {
    return (
      <div className="">
        <Router history={history}>
          {this.state.createTodo ? <CreateTodo updateTodo={this.props.updateTodo.bind(this)} addTodo={this.props.addTodo.bind(this)} editTodo={this.state.editTodo} closeTodo={this.closeCreateTodoModal.bind(this)} /> : null}

          {this.state.currentId}
          
            <Switch>
              <Route exact path="/">
                <DisplayTodo 
                    updateTodo={this.props.updateTodo.bind(this)} 
                    deleteTodo={this.props.deleteTodo.bind(this)} 
                    sortTodos={this.props.sortTodos.bind(this)}
                    todos={(!this.props.todoState.display || this.props.todoState.display.length<1) && !this.props.todoState.searchTerm && (this.props.todoState.sortType.sort==="ID") && (this.props.todoState.sortType.order==="ASC") && !this.props.todoState.favFilterToggle ?this.props.todoState.todos:this.props.todoState.display} 
                    sortType={this.props.todoState.sortType}
                    filterTodo={this.props.filterTodo}
                    favFilterToggle={this.props.todoState.favFilterToggle}
                    filterFavTodo={this.props.filterFavTodo}>
                  </DisplayTodo>
              </Route>
              <Route path="/create" 
                render={()=><CreateTodo updateTodo={this.props.updateTodo.bind(this)} addTodo={this.props.addTodo.bind(this)} />}>
                </Route>
              <Route path="/edit/:id" 
                render={(props)=><CreateTodo updateTodo={this.props.updateTodo.bind(this)} addTodo={this.props.addTodo.bind(this)} editTodo={this.props.todoState.todos.find((el)=>el.id==props.match.params.id)} />}>
                </Route>
              <Route path="/todo/:id" render={(props)=><OneTodo todo={this.props.todoState.todos.find((el)=>el.id==props.match.params.id)} updateTodo={this.props.updateTodo.bind(this)} deleteTodo={this.props.deleteTodo.bind(this)}></OneTodo>}></Route>
            </Switch>
        </Router>
      </div>
    );
  }

  componentDidMount() {
    console.log('componentDidMount()');
    console.log(this.state);
    console.log(this.props.store);
  }

  // editTodo(todo) {
  //   this.showCreateTodoModal();
  //   this.setState({ editTodo: todo });
  // }

  // showCreateTodoModal() {
  //   this.setState({ createTodo: true }); 
  // }

  // closeCreateTodoModal() {
  //   this.setState({ createTodo: false, editTodo:null });
  // }

  // handleSearchInput (event) {
  //   const input = event.target.value;
  //   console.log(input);
  //   this.setState({searchInput:input});
  //   if empty string or input does not contain at least 2 characters, show all and stop execution. 
  //   const trimmedInput = input.trim();
  //   if (!trimmedInput || trimmedInput.length<2){
  //     this.setState({displayTodos:[...this.props.todoState.todos]});
  //     return;
  //   }

  //   const displayTodos = [];
  //   for (var oneTodo of this.props.todoState.todos){
  //     let added = false;
  //     if (oneTodo.title.includes(trimmedInput) || oneTodo.summary.includes(trimmedInput)){
  //       displayTodos.push({...oneTodo});
  //       added = true;
  //     }

  //     for (var oneLabel of oneTodo.labels){
  //       if (oneLabel.includes(trimmedInput) && !added){
  //         displayTodos.push({...oneTodo});
  //       }
  //     }
  //   }
  //   console.log(displayTodos);
  //   this.setState({displayTodos:displayTodos});
  //   this.props.filterTodo(input.trim());
  // }

//   triggerEdit(todo) {
//     this.setState({ createTodo: true,editTodo:{...todo} });
//   }
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
    },
    sortTodos : (sortType) => {
      dispatch(sortTodos(sortType));
    },
    filterFavTodo : (fav) => {
      dispatch(filterFavTodo(fav));
    },
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
