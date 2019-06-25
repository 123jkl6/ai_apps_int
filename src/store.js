import { createStore, combineReducers, bindActionCreators } from 'redux';



const initialState = {
    currentId: 1,
    todos: [],
    lastValues: [],
    display:[],
    searchTerm:null,
    sortType : {
        sort:"ID",
        order:"ASC",
    },
    notifications : [],
    favFilterToggle:false,
};

console.log('creating store');
const localStorageState = localStorage.getItem('todoState');
if (localStorageState) {
    const localStorageStateObj = JSON.parse(localStorageState);
    if (
        localStorageStateObj.currentId && 
        localStorageStateObj.todos && 
        localStorageStateObj.lastValues &&
        localStorageStateObj.notifications
        ) {
        initialState.currentId = localStorageStateObj.currentId;
        initialState.todos = localStorageStateObj.todos;
        initialState.lastValues = localStorageStateObj.lastValues;
        initialState.notifications = localStorageStateObj.notifications;
    }
}

//set up notifications when app starts
initialState.notifications = setUpNotifications(initialState.todos, initialState.notifications);

const reducer = (state = initialState, action) => {
    console.log(state);
    switch (action.type) {
        case "ADD": {
            const newPayload = action.payload;
            newPayload.id = state.currentId;

            let displayTodosID = [];
            if (state.display.length>0){
                displayTodosID = state.display.map((el)=>{return el.id});
            }
            let displayTodos = state.todos.filter((el)=>{return displayTodosID.includes(el.id);});
            console.log(displayTodos);

            let currentDate = (new Date()).toISOString().split("T")[0];

            let newTodos = [...state.todos, {...newPayload,createDate: currentDate},];
            
            //check if new todo is near due or past due
            let notifications = setUpNotifications(newTodos, state.notifications);

            const newState = {
                currentId: state.currentId + 1,
                todos: newTodos,
                //make this empty first, should come up with a more seamless way to integrate new todos into filtered ones
                display: [],
                searchTerm:state.searchTerm,
                sortType:{...state.sortType},
                notifications : notifications,
                lastValues: [...state.todos,],
                favFilterToggle:state.favFilterToggle,
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
                        createDate : newPayload.createDate,
                        time: newPayload.time,
                        labels: [...newPayload.labels],
                        attachments: [...newPayload.attachments],
                        status: newPayload.status,
                        favorite:newPayload.favorite,
                    };
                    newTodos.push(updatedTodo);
                } else {
                    //BAU
                    newTodos.push({
                        id: oneTodo.id,
                        title: oneTodo.title,
                        summary: oneTodo.summary,
                        date: oneTodo.date,
                        createDate : oneTodo.createDate,
                        time: oneTodo.time,
                        labels: [...oneTodo.labels],
                        attachments: [...oneTodo.attachments],
                        status: oneTodo.status,
                        favorite:oneTodo.favorite,
                    });
                }
            }
            let displayTodosID = [];
            if (state.display.length>0){
                displayTodosID = state.display.map((el)=>{return el.id});
            }
            
            let displayTodos = newTodos.filter((el)=>{return displayTodosID.includes(el.id);});
            console.log(displayTodos);
            //update notifications
            let todoInNotification  =false;
            const updatedNotifications = state.notifications.map((el)=>{
                if (el.id===newPayload.id){
                    //found todo
                    todoInNotification = true;
                    return {
                        id:newPayload.id,
                        title: newPayload.title,
                        date : newPayload.date,
                        time :newPayload.time,
                        status : newPayload.status,
                        dismissed :el.dismissed, 
                    };
                } else {
                    return {
                        ...el
                    };
                };
            });

            //check if new due date or time is within half hour, or overdue
            let notification = qualifyNotification(newPayload);
            if (notification && !todoInNotification){
                updatedNotifications.push(notification);
            }
            const newState = {
                currentId: state.currentId,
                todos: [...newTodos],
                display: [...displayTodos],
                searchTerm:state.searchTerm,
                sortType:state.sortType,
                notifications : updatedNotifications,
                lastValues: [...state.todos,],
                favFilterToggle:state.favFilterToggle,
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
            let displayTodosID = [];
            if (state.display.length>0){
                displayTodosID = state.display.map((el)=>{return el.id});
            }
            let displayTodos = newTodos.filter((el)=>{return (displayTodosID.includes(el.id) && action.payload.id !=  el.id);});
            console.log(displayTodos);
            const newState = {
                currentId: state.currentId,
                todos: [...newTodos],
                display: [...displayTodos],
                searchTerm:state.searchTerm,
                sortType:state.sortType,
                notifications : [...state.notifications],
                lastValues: [...state.todos,],
                favFilterToggle:state.favFilterToggle,
            };
            localStorage.setItem('todoState', JSON.stringify(newState));
            return newState;
        }
        case "FILTER": {
            const searchTerm = action.payload;
            
            const displayTodos = filterWithSearchTerm(searchTerm.trim(),state.favFilterToggle?state.display:state.todos);
            if (state.sortType){
                sortTodos(state.sortType,displayTodos);
            }
            const newState = {
                currentId: state.currentId,
                todos: [...state.todos],
                display: displayTodos,
                searchTerm: searchTerm,
                sortType:{...state.sortType},
                notifications : [...state.notifications],
                lastValues: [...state.todos,],
                favFilterToggle:state.favFilterToggle,
            };

            return newState;
        }
        case "SORT" : {
            const sortType = action.payload;
            let displayTodo = [];
            if (state.display && state.display.length>0){
                displayTodo = [...state.display];
            } else {
                displayTodo = [...state.todos];
            }
            
            sortTodos(sortType,displayTodo);

            const newState = {
                currentId: state.currentId,
                todos: [...state.todos],
                display: displayTodo,
                searchTerm: state.searchTerm,
                sortType:{...sortType},
                notifications : [...state.notifications],
                lastValues: [...state.todos,],
                favFilterToggle:state.favFilterToggle,
            }

            return newState;
        }
        case "FILTER_FAV": {
            //conditional statements can be refactored.
            console.log(action.payload);
            let displayTodo = [];
            if (state.display && state.display.length>0){
                displayTodo = [...state.display];
            } else {
                displayTodo = [...state.todos];
            }

            if (action.payload && state.display && state.display.length>0){
                console.log("reached.");
                displayTodo = state.display.filter((el)=>{return el.favorite;});
            } else if (action.payload && (!state.display || state.display.length<1)) {
                displayTodo = state.todos.filter((el)=>{return el.favorite;});
            } else {
                if (state.searchTerm){
                    console.log("reached.");
                    displayTodo = filterWithSearchTerm(state.searchTerm,state.todos);
                } else {
                    console.log("reached.");
                    displayTodo = [...state.todos];
                }
            }
            //if there is sort, apply the sort
            if (state.sortType){
                sortTodos(state.sortType,displayTodo);
            }
            console.log(displayTodo);
            const newState = {
                currentId: state.currentId,
                todos: [...state.todos],
                display: displayTodo,
                searchTerm: state.searchTerm,
                sortType:{...state.sortType},
                lastValues: [...state.todos,],
                notifications:[...state.notifications],
                favFilterToggle:action.payload,
            }

            return newState;
        }
        case "UPDATE_NOTIFICATION" :{
            const updatedNotifications = [];
            const payload = {...action.payload};

            for (let oneNotification of state.notifications){
                if (payload.id===oneNotification.id){
                    //push the new payload
                    updatedNotifications.push({
                        ...payload
                    });
                } else {
                    //just push with no change
                    updatedNotifications.push({
                        ...oneNotification
                    });
                }
            }

            const newState = {
                currentId: state.currentId,
                todos: [...state.todos],
                display: [...state.display],
                searchTerm: state.searchTerm,
                sortType:{...state.sortType},
                notifications : updatedNotifications,
                lastValues: [...state.todos,],
                favFilterToggle:state.favFilterToggle,
            }
            localStorage.setItem('todoState', JSON.stringify(newState));
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
    //catch empty input otherwise calling toUpperCase will throw an error. 
    if (!searchTerm){
        return displayTodos;
    }

    for (let oneTodo of todoArr) {
        let added = false;
        if (oneTodo.title.toUpperCase().includes(searchTerm.toUpperCase())) {
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
                    return (""+b.title.toUpperCase()).localeCompare(a.title.toUpperCase());
                });
            } else {
                displayTodo.sort((a,b)=>{
                    return (""+a.title.toUpperCase()).localeCompare(b.title.toUpperCase());
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
        case "Created" : {
            if (sortType.order=="DESC"){
                displayTodo.sort((a,b)=>{
                    return (new Date(b.createDate))-(new Date(a.createDate));
                });
            } else {
                displayTodo.sort((a,b)=>{
                    return (new Date(a.createDate))-(new Date(b.createDate));
                });
            }
        }
    }
    console.log(displayTodo);
};

function setUpNotifications (todos,oldNotifications) {
    const notifications = [...oldNotifications];
    const currentDateTime = new Date();

    for (let oneTodo of todos){
        let oneTodoDate = new Date(oneTodo.date);
        let oneTodoTimeStamp = new Date(
            oneTodoDate.getFullYear(),
            oneTodoDate.getMonth(),
            oneTodoDate.getDate(),
            oneTodoDate.getHours(),
            oneTodoDate.getMinutes(),
            0);
        if (
            oneTodo.date<=currentDateTime.toISOString().split("T")[0] && 
            //add only if it is past due
            (oneTodo.date<=currentDateTime.toISOString().split("T")[0] && 
            oneTodo.time <= (currentDateTime.getHours().toString()+currentDateTime.getMinutes().toString())
            ) &&
            oneTodo.status != "Completed" &&
            !notifications.find((el)=>{return el.id === oneTodo.id})
            ){
            const notification = {
                id : oneTodo.id,
                title: oneTodo.title,
                date : oneTodo.date,
                time :oneTodo.time,
                status : oneTodo.status,
                dismissed :false, //false by default
            };
            notifications.push(notification);
        } else if (
                    dueIn30Min(currentDateTime,oneTodoTimeStamp) &&
                    oneTodo.status != "Completed" &&
                    !notifications.find((el)=>{return el.id === oneTodo.id})
                    ) {
            const notification = {
                id : oneTodo.id,
                title: oneTodo.title,
                date : oneTodo.date,
                time :oneTodo.time,
                status : oneTodo.status,
                dismissed :false, //false by default
            };
            notifications.push(notification);
        }
    }

    //ascending date
    notifications.sort((a,b)=>{
        return (new Date(a.date))-(new Date(b.date));
    });

    return notifications;
}

function qualifyNotification(oneTodo){
    const currentDateTime = new Date();
    let oneTodoDate = new Date(oneTodo.date);
    let oneTodoTimeStamp = new Date(
        oneTodoDate.getFullYear(),
        oneTodoDate.getMonth(),
        oneTodoDate.getDate(),
        oneTodoDate.getHours(),
        oneTodoDate.getMinutes(),
        0);
    if (
        oneTodo.date<=currentDateTime.toISOString().split("T")[0] && 
        //add only if it is past due
        (oneTodo.date<=currentDateTime.toISOString().split("T")[0] && 
        oneTodo.time <= (currentDateTime.getHours().toString()+currentDateTime.getMinutes().toString())
        ) &&
        oneTodo.status != "Completed" 
        //!notifications.find((el)=>{return el.id === oneTodo.id})
        ){
        const notification = {
            id : oneTodo.id,
            title: oneTodo.title,
            date : oneTodo.date,
            time :oneTodo.time,
            status : oneTodo.status,
            dismissed :false, //false by default
        };
        return notification;
    } else if (
                dueIn30Min(currentDateTime,oneTodoTimeStamp) &&
                oneTodo.status != "Completed" 
                //!notifications.find((el)=>{return el.id === oneTodo.id})
                ) {
        const notification = {
            id : oneTodo.id,
            title: oneTodo.title,
            date : oneTodo.date,
            time :oneTodo.time,
            status : oneTodo.status,
            dismissed :false, //false by default
        };
        return notification;
    } else {
        //default case
        return null;
    }
}

function dueIn30Min(firstTime,secondTime){
    const halfHourInms = 30*60*1000; 
    if (secondTime.getTime()-firstTime.getTime() <= halfHourInms){
        return true; 
    } else {
        return false;
    }
}

export default createStore(combineReducers({ reducer }));