import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import './App.css';
import { connect } from 'react-redux';

import history from './history';
import { addTodo, updateTodo, deleteTodo, filterTodo, sortTodos, filterFavTodo } from './actions/todoActions';
import { updateNotification, checkNotication } from './actions/notificationsActions';
import CreateTodo from './containers/CreateTodo';
import { DisplayTodo } from './containers/DisplayTodo';
import OneTodo from './containers/OneTodo';
import Settings from './containers/settings';
import Notifications from './containers/notifications';

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    //check every minute for tasks that are due in 30 min
    const checkForDueInterval = setInterval(()=>{
      props.checkNotication("CHECK_DUE");
    }, 60 * 1000);
    
    this.state = {
      createToDo: false,
      editTodo: null,
      displayTodos:props.todoState.todos,
      searchInput:"",
      checkForDueInterval: checkForDueInterval,
    }
    this.closeNotifications = this.closeNotifications.bind(this); 
  }

  render() {
    return (
      <div className="">
        <Router history={history}>
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
              <Route path="/settings" render={(props)=><Settings></Settings>}></Route>
              <Route path="/notifications" render={(props)=><Notifications notifications={this.props.todoState.notifications} updateNotification={this.props.updateNotification.bind(this)}></Notifications>}></Route>
            </Switch>
            {this.props.todoState.showNotifications?
            <div id="notificationAlert" className="notification-alert bg-info">
              <div className="container">
                <div className="row">
                  <div className="col"></div>
                <div className="col-2 header-col text-white h3" onClick={this.closeNotifications}>&times;</div>
                </div>
                <div className="row padding-p5">
                  <div className="col d-none d-md-block"></div>
                  <div className="col"><Link className="text-white h4" to={"/notifications"}>Notifications</Link></div>
                  <div className="col d-none d-md-block"></div>
                </div>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col">
                    You have <span className="text-light">{this.props.todoState.notifications.filter((el)=>{return !el.dismissed}).length}</span> new reminders.
                  </div>
                  <div className="col-1"></div>
                </div>
              </div>
            </div>
              :null}
        </Router>
      </div>
    );
  }

  componentDidMount() {
    console.log('componentDidMount()');
    console.log(this.state);
    console.log(this.props.store);
    setTimeout(()=>{
      document.getElementById("notificationAlert").classList.toggle("show-alert");
    },100);
  }

  componentWillUnmount(){
    clearInterval(this.state.checkForDueInterval);
    this.setState({checkForDueInterval:undefined});
  }

  closeNotifications(){
    this.props.checkNotication("CLOSE_NOTIFICATION");
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
    },
    sortTodos : (sortType) => {
      dispatch(sortTodos(sortType));
    },
    filterFavTodo : (fav) => {
      dispatch(filterFavTodo(fav));
    },
    updateNotification : (notification) => {
      dispatch(updateNotification(notification));
    },
    checkNotication : (check) => {
      dispatch(checkNotication(check));
    },
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
