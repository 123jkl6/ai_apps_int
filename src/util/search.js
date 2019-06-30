export const filterWithSearchTerm = (searchTerm,todoArr)=>{
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