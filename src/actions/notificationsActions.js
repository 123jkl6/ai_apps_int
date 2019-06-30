export function updateNotification(notification) {
    return {
        type:"UPDATE_NOTIFICATION",
        payload:notification,
    }; 
}

export function checkNotication(check){
    return {
        type:"CHECK_NOTIFICATION",
        payload:check,
    };
}