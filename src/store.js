import { createStore, combineReducers } from 'redux';

const initialState = {
    currentId: 1,
    todos: [],
    lastValues: [],
    display:[],
    searchTerm:null,
};

console.log('creating store');
const localStorageState = localStorage.getItem('todoState');
if (localStorageState) {
    const localStorageStateObj = JSON.parse(localStorageState);
    if (localStorageStateObj.currentId && localStorageStateObj.todos && localStorageStateObj.lastValues) {
        initialState.currentId = localStorageStateObj.currentId;
        initialState.todos = localStorageStateObj.todos;
        initialState.lastValues = localStorageStateObj.lastValues;
    }
}

const reducer = (state = initialState, action) => {
    console.log(state);
    switch (action.type) {
        case "ADD": {
            const newPayload = action.payload;
            newPayload.id = state.currentId;
            const newState = {
                currentId: state.currentId + 1,
                todos: [...state.todos, newPayload,],
                display: [],
                searchTerm:null,
                sortType:{...state.sortType},
                lastValues: [...state.todos,],
            };
            localStorage.setItem('todoState', JSON.stringify(newState));
            return newState;

        }
        case "UPDATE_TODO": {
            const newPayload = action.payload;
            const oldTodos = state.todos;
            const newTodos = [];
            for (let oneTodo of oldTodos) {
                if (oneTodo.id == newPayload.id) {
                    const updatedTodo = {
                        // might need to change with attachment implementations. 
                        id: newPayload.id,
                        title: newPayload.title,
                        summary: newPayload.summary,
                        date: newPayload.date,
                        time: newPayload.time,
                        labels: [...newPayload.labels],
                        attachments: [...newPayload.attachments],
                        status: newPayload.status,
                        favorite:newPayload.favorite,
                    };
                    newTodos.push(updatedTodo);
                } else {
                    //BAU
                    newTodos.push(oneTodo);
                }
            }
            let displayTodosID = [];
            if (state.display.length>0){
                displayTodosID = state.display.map((el)=>{return el.id});
            }
            
            // if (state.searchTerm) {
            //     let searchTerm = state.searchTerm;
            //     displayTodos = filterWithSearchTerm(searchTerm,newTodos);
            // }
            let displayTodos = newTodos.filter((el)=>{return displayTodosID.includes(el.id);});
            console.log(displayTodos);
            const newState = {
                currentId: state.currentId,
                todos: [...newTodos],
                display: [...displayTodos],
                searchTerm:state.searchTerm,
                sortType:state.sortType,
                lastValues: [...state.todos,],
            };
            //persist to localStorage first
            localStorage.setItem('todoState', JSON.stringify(newState));
            return newState;
        }
        case "DELETE": {
            //immutability is a good practice
            const oldTodos = state.todos;
            const newTodos = [];

            for (var todoIdx in oldTodos) {
                //add
                if (action.payload.id != oldTodos[todoIdx].id) {
                    const oneTodo = { ...oldTodos[todoIdx] };
                    newTodos.push(oneTodo);
                }
            }

            const newState = {
                currentId: state.currentId,
                todos: [...newTodos],
                display: [],
                lastValues: [...state.todos,],
            };
            localStorage.setItem('todoState', JSON.stringify(newState));
            return newState;
        }
        case "FILTER": {
            const searchTerm = action.payload;
            
            const displayTodos = filterWithSearchTerm(searchTerm,state.todos);
            
            const newState = {
                currentId: state.currentId,
                todos: [...state.todos],
                display: displayTodos,
                searchTerm: searchTerm,
                sortType:{...state.sortType},
                lastValues: [...state.todos,],
            };

            return newState;
        }
        case "SORT" :{
            const sortType = action.payload;
            let displayTodo = [];
            if (state.display && state.display.length>0){
                displayTodo = [...state.display];
            } else {
                displayTodo = [...state.todos];
            }
            if (sortType.sort=="Fav"){
                
                if (sortType.order=="YES"){
                    let newDisplayTodo = displayTodo.filter((el)=>{return el.favorite;});
                    displayTodo = newDisplayTodo;
                } else {
                    //copy all
                    displayTodo = [...state.todos];
                }
                
            }
            sortTodos(sortType,displayTodo);

            const newState = {
                currentId: state.currentId,
                todos: [...state.todos],
                display: displayTodo,
                searchTerm: state.searchTerm,
                sortType:{...sortType},
                lastValues: [...state.todos,],
            }

            return newState;
        }
        default: {
            //immutability is a good practice
            const newState = {
                ...state,
            };
            return newState;
        }
    }
}

const filterWithSearchTerm = (searchTerm,todoArr)=>{
    const displayTodos = [];
    
    for (let oneTodo of todoArr) {
        let added = false;
        if (oneTodo.title.includes(searchTerm)) {
            displayTodos.push({ ...oneTodo });
            added = true;
        }
        console.log(displayTodos);
        for (var oneLabel of oneTodo.labels) {
            if (oneLabel.includes(searchTerm) && !added) {
                displayTodos.push({ ...oneTodo });
            }
        }
    }
    return displayTodos;
};

const sortTodos = (sortType,displayTodo) => {
    switch (sortType.sort) {
        case "ID" : {
            if (sortType.order=="DESC"){
                displayTodo.sort((a,b)=>{
                    return b.id-a.id;
                });
            } else {
                displayTodo.sort((a,b)=>{
                    return a.id-b.id;
                });
            }
        }
        case "Title" : {
            if (sortType.order=="DESC"){
                displayTodo.sort((a,b)=>{
                    return (""+b.title).localeCompare(a.title);
                });
            } else {
                displayTodo.sort((a,b)=>{
                    return (""+a.title).localeCompare(b.title);
                });
            }
        }
        case "Date" : {
            if (sortType.order=="DESC"){
                displayTodo.sort((a,b)=>{
                    return (new Date(b.date))-(new Date(a.date));
                });
            } else {
                displayTodo.sort((a,b)=>{
                    return (new Date(a.date))-(new Date(b.date));
                });
            }
        }
    }
    console.log(displayTodo);
};

export default createStore(combineReducers({ reducer }));