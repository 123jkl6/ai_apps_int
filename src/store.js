import { createStore, combineReducers } from 'redux';

const initialState = {
    currentId : 1,
    todos : [],
    lastValues : [],
};

console.log('creating store');
const localStorageState = localStorage.getItem('todoState');
if (localStorageState){
    const localStorageStateObj = JSON.parse(localStorageState);
    if (localStorageStateObj.currentId && localStorageStateObj.todos && localStorageStateObj.lastValues){
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
                currentId:state.currentId+1,
                todos:[...state.todos,newPayload,],
                lastValues : [...state.todos,],
            };
            localStorage.setItem('todoState',JSON.stringify(newState));
            return newState;
           
        }
        case "UPDATE_TODO": {
            const newPayload = action.payload;
            const oldTodos = state.todos;
            const newTodos = [];
            for (var oneTodo of oldTodos){
                if (oneTodo.id==newPayload.id){
                    const updatedTodo = {
                        // might need to change with attachment implementations. 
                        ...newPayload
                    };
                    newTodos.push(updatedTodo);
                } else  {
                    //BAU
                    newTodos.push(oneTodo);
                }
            }
            const newState = {
                currentId : state.currentId,
                todos : [...newTodos],
                lastValues : [state.todos,],
            };
            //persist to localStorage first
            localStorage.setItem('todoState',JSON.stringify(newState));
            return newState;
        }
        case "DELETE": {
            //immutability is a good practice
            const oldTodos = state.todos;
            const newTodos = [];

            for (var todoIdx in oldTodos){
                //add
                if (action.payload.id != oldTodos[todoIdx].id){
                    const oneTodo = {...oldTodos[todoIdx]};
                    newTodos.push(oneTodo);
                }
            }

            const newState = {
                currentId : state.currentId,
                todos : [...newTodos],
                lastValues : [state.todos,],
            };
            localStorage.setItem('todoState',JSON.stringify(newState));
            return newState;
        }
        default : {
            //immutability is a good practice
            const newState = {
                ...state,
            };
            return newState;
        }
    }
}

export default createStore(combineReducers({reducer}));