import { createStore, combineReducers } from 'redux';

const initialState = {
    currentId: 1,
    todos: [],
    lastValues: [],
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
                sortType:null,
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
                    };
                    newTodos.push(updatedTodo);
                } else {
                    //BAU
                    newTodos.push(oneTodo);
                }
            }
            let displayTodos = [];
            if (state.searchTerm) {
                let searchTerm = state.searchTerm;
                displayTodos = filterWithSearchTerm(searchTerm,newTodos);
            }
            const newState = {
                currentId: state.currentId,
                todos: [...newTodos],
                display: displayTodos,
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
                sortType:state.sortType,
                lastValues: [...state.todos,],
            };

            return newState;
        }
        case "SORT" :{
            const sortType = action.payload;
            let displayTodo = [];
            if (state.display && state.display.length!=0){
                displayTodo = [...state.display];
            } else {
                displayTodo = [...state.todos];
            }
            sortTodos(displayTodo);

            const newState = {
                currentId: state.currentId,
                todos: [...state.todos],
                display: displayTodo,
                searchTerm: state.searchTerm,
                sortType:sortType,
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
        if (oneTodo.title.includes(searchTerm) || oneTodo.summary.includes(searchTerm)) {
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
                    return b.title-a.title;
                });
            } else {
                displayTodo.sort((a,b)=>{
                    return a.title-b.title;
                });
            }
        }
        case "Date" : {
            if (sortType.order=="DESC"){
                displayTodo.sort((a,b)=>{
                    return b.date-a.date;
                });
            } else {
                displayTodo.sort((a,b)=>{
                    return a.date-b.date;
                });
            }
        }
    }
};

export default createStore(combineReducers({ reducer }));