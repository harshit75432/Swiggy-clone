function getDate(t){
    let date = new Date(t)
    return ((date.getMonth() + 1) + '/' +
            (date.getDate()) + '/' +
            date.getFullYear())
}


function getTime(t){
    let date = new Date(t)
    let str = "";
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        str += "PM"
    } else {
        str += "AM"
    }
    return str;
}


getDateAndTime = {
    getDate,
    getTime
} 

module.exports = getDateAndTime