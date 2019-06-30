export function setUpNotifications (todos,oldNotifications) {
    const notifications = [...oldNotifications];
    const currentDateTime = new Date();

    for (let oneTodo of todos){
        let oneTodoDate = new Date(oneTodo.date);
        let oneTodoTimeStamp = new Date(
            oneTodoDate.getFullYear(),
            oneTodoDate.getMonth()-1,
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
            console.log("overdue");
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
            console.log("due in 30 min");
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

export function qualifyNotification(oneTodo){
    const currentDateTime = new Date();
    let oneTodoDate = new Date(oneTodo.date);
    let oneTodoTimeStamp = new Date(
        oneTodoDate.getFullYear(),
        oneTodoDate.getMonth()-1,
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
        console.log("overdue");
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
        console.log("due in 30min");
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

export function dueIn30Min(firstTime,secondTime){
    const halfHourInms = 30*60*1000; 
    if (secondTime.getTime()-firstTime.getTime() <= halfHourInms){
        return true; 
    } else {
        return false;
    }
}