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
    if (localStorageStateObj.currentId && localStorageStateObj.todos){
        initialState.currentId = localStorageStateObj.currentId;
        initialState.todos = localStorageStateObj.todos;
    }
}

const reducer = (state = initialState, action) => {
    //console.log(state);
    switch (action.type) {
        case "ADD": {
            const newPayload = action.payload;
            newPayload.id = state.currentId;
            const newState = {
                currentId:state.currentId+1,
                todos:[...state.todos,newPayload],
                lastValues : [...state.lastValues,]
            };
            localStorage.setItem('todoState',JSON.stringify(newState));
            return newState;
           
        }
        case "UPDATE": {
            return state;
        }
        case "DELETE": {
            return state;
        }
        default : {
            return state;
        }
    }
}

export default createStore(combineReducers({reducer}));