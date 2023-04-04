import moment from "moment";

export function getFormatTime(timeStamp){
    return moment(timeStamp).format("HH:mm A")
}