export function addTodo(todo) {
    return {
        type: "ADD",
        payload: todo,
    };
}

export function updateTodo(todo) {
    return {
        type: "UPDATE_TODO",
        payload: todo,
    };
}

export function deleteTodo(todo) {
    return {
        type: "DELETE",
        payload: todo,
    };
}

export function filterTodo(searchTerm){
    return {
        type:"FILTER",
        payload:searchTerm,
    };
}

export function sortTodos(sortType){
    return {
        type:"SORT",
        payload:sortType,
    };
}

export function filterFavTodo(fav){
    return {
        type:"FILTER_FAV",
        payload:fav,
    };
}