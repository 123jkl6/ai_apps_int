export const sortTodos = (sortType,displayTodo) => {
    switch (sortType.sort) {
        case "ID" : {
            if (sortType.order=="DESC"){
                displayTodo.sort((a,b)=>{
                    console.log(b.id-a.id);
                    return b.id-a.id;
                });
            } else {
                displayTodo.sort((a,b)=>{
                    return a.id-b.id;
                });
            }
            break;
        }
        case "Title" : {
            if (sortType.order=="DESC"){
                displayTodo.sort((a,b)=>{
                    if(b.title.toUpperCase()>a.title.toUpperCase()) {
                        return 1;
                    } 
                    if (b.title.toUpperCase()<a.title.toUpperCase()){
                        return -1;
                    }
                    return 0;
                });
            } else {
                displayTodo.sort((a,b)=>{
                    if (b.title.toUpperCase()>a.title.toUpperCase()) {
                        return -1;
                    } 
                    if (b.title.toUpperCase()<a.title.toUpperCase()){
                        return 1;
                    }
                    return 0;
                });
            }
            break;
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
            break;
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
            break;
        }
    }
    console.log(displayTodo);
};