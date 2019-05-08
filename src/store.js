import { createStore } from 'redux';

const initialState = {
    currentId : 1,
    todos : []
};

const localStorageState = localStorage.getItem('todoState');
if (localStorageState) {
    var localStorageStateObj = JSON.parse(localStorageState);
    if (localStorageState.currentId && localStorageStateObj.todos){
        initialState.currentId = localStorageStateObj.currentId;
        initialState.todos = localStorageStateObj.todos;
    }
} 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD": {
            return state;
        }
        case "UPDATE": {
            return state;
        }
        case "DELETE": {
            return state;
        }
    }
}

export default createStore(reducer);