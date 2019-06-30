import React from 'react';
import { Link } from 'react-router-dom';

import { OneRowTodo } from './OneRowTodo';

export const DisplayTodo = (props) => {
  const displayTodos = [];

  const sortType = props.sortType ? { ...props.sortType } : null;
  let idClass = "";
  let titleClass = "";
  let dateClass = "";
  let createClass = "";
  let favClass = "";
  if (sortType) {
    switch (sortType.sort) {
      case "ID": {
        if (sortType.order === "DESC") {
          idClass = "fas fa-arrow-down"
        } else {
          idClass = "fas fa-arrow-up"
        }
        break;
      }
      case "Title": {
        if (sortType.order === "DESC") {
          titleClass = "fas fa-arrow-down"
        } else {
          titleClass = "fas fa-arrow-up"
        }
        break;

      }
      case "Date": {
        if (sortType.order === "DESC") {
          dateClass = "fas fa-arrow-down"
        } else {
          dateClass = "fas fa-arrow-up"
        }
        break;
      }
      case "Created": {
        if (sortType.order === "DESC") {
          createClass = "fas fa-arrow-down"
        } else {
          createClass = "fas fa-arrow-up"
        }
        break;
      }
      // case "Fav" :{
      //   if (sortType.order==="YES"){
      //     favClass="fas fa-check"
      //   } else {
      //     favClass="";
      //   }
      //   break;
      // }
      default: {
        //ID ASC
        idClass = "fas fa-arrow-up";
        break;
      }
    }
  } else {
    idClass = "fas fa-arrow-up";
  }

  if (props.favFilterToggle) {
    favClass = "fas fa-check"
  }

  const sendSortType = (sort, classNameString) => {
    //catch fav first
    // if (sort=="Fav"){
    //   if (!classNameString) {
    //     return {
    //       sort:sort,
    //       order:"YES",
    //     };
    //   } else {
    //     return {
    //       sort:sort,
    //       order:"NO",
    //     };
    //   }
    // }
    if (classNameString.includes("down") || !classNameString) {
      return {
        sort: sort,
        order: "ASC",
      };
    } else {
      return {
        sort: sort,
        order: "DESC",
      };
    }
  };

  const toggleDropDown = () => {
    document.getElementById("menu").classList.toggle("menu-close");
    document.getElementById("nav-icon1").classList.toggle("open");
    document.getElementById("notificationsLink").classList.toggle("d-none");
    document.getElementById("search").classList.toggle("d-none");
    document.getElementsByTagName("body")[0].classList.toggle("modal-open");
  }

  for (var todoIdx in props.todos) {
    displayTodos.push(
      <div key={todoIdx} >
        <OneRowTodo todo={props.todos[todoIdx]} updateTodo={props.updateTodo} deleteTodo={props.deleteTodo} triggerEdit={props.triggerEdit} />
      </div>
    );
  }

  return (
    <div className="display-todo" >

      <div id="menu" className="menu-close bg-secondary text-white">
        <div className="container padding-p5">
          <h2>Menu</h2>
          <hr className="border-white" />
          <div>
            <div><Link to={"/settings"} className="text-white">Settings</Link></div>
          </div>
        </div>

      </div>

      <div className="bg-primary" id="fixedHeader" className="bg-primary" >
        <div className="row">
          <div className="col-7"></div>
          <div className="col-3">
            <input id="search" className="form-control" placeholder="Search" onChange={() => { props.filterTodo(document.getElementById("search").value) }} />
          </div>
          <div className="col-1">
            <Link id="notificationsLink" to={"/notifications"} className="text-white">
              <span className="btn fas fa-bell fa-2x"></span>
            </Link>

          </div>
          <div className="col-1 text-white">
            <div id="nav-icon1" onClick={()=>{toggleDropDown();}}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ 'padding': '5% 5%' }}>Todos</h2>
      <div className="row" style={{ 'paddingBottom': '5%' }}>
        <Link to={"create"}>
          <button className="btn btn-primary" >
            New
              </button>
        </Link>
      </div>
      <div className="row">
        <span className="header-col col-2" onClick={() => { props.sortTodos(sendSortType("ID", idClass)); }}>
          ID  <i className={idClass}></i>
        </span>
        <span className="header-col col" onClick={() => { props.sortTodos(sendSortType("Title", titleClass)); }}>
          Title <i className={titleClass}></i>
        </span>
        <span className="header-col col-2" onClick={() => { props.sortTodos(sendSortType("Date", dateClass)); }}>
          Due <i className={dateClass}></i>
        </span>
        <span className="header-col col-2" onClick={() => { props.sortTodos(sendSortType("Created", createClass)); }}>
          Created <i className={createClass}></i>
        </span>
        <span className={"header-col col-1 " + favClass} onClick={() => { props.filterFavTodo(!props.favFilterToggle); }}>
          Fav
            </span>
      </div>
      {displayTodos}
    </div>
  );
};