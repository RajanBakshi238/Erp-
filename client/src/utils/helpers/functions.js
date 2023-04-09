import moment from "moment";

export function getFormatTime(timeStamp){
    return moment(timeStamp).format("hh:mm A")
}

export function getFormatDate(timeStamp){
    return moment(timeStamp).format("MMMM, Do, YYYY")
} 
