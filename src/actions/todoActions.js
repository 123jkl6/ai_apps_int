export function addTodo(todo) {
    return {
        type: "ADD",
        payload: todo
    };
}

export function updateTodo(todo) {
    return {
        type: "DELETE",
        payload: todo
    };
}

export function deleteTodo(todo) {
    return {
        type: "DELETE",
        payload: todo
    };
}