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