import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentId : 1 ,
      todos : [],
    }
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

  componentDidMount(){
    console.log('componentDidMount()');
    console.log(this.state);
  }

}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    todoState:state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ADD : (state) => {
      dispatch({
        type:"ADD",
        payload:state,
      });
    },
    UPDATE : (state) => {
      dispatch({
        type:"ADD",
        payload:state,
      });
    },
    DELETE : (state) => {
      dispatch({
        type:"ADD",
        payload:state,
      });
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
