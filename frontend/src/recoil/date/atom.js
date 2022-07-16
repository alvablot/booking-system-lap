import { atom } from "recoil";
const now = new Date();
let month = now.getMonth() + 1;

const date = now.getDate();
const day = now.getDay() - 1;
const year = now.getYear() + 1900;
const hour = now.getHours();
let minute = now.getMinutes();

let strMonth = month;
let strDate = date;
let strMinute = minute;
if (month < 10) strMonth = "0" + month;
if (date < 10) strDate = "0" + date;
const dateStamp = `${year}-${strMonth}-${strDate}`;

if (minute < 10) strMinute = "0" + minute;
const timeStamp = `${hour}:${minute}`;


export const dateState = atom({
  key: "dates",
  default: {
    year: year,
    month: month,
    date: date - day,
    day: day,
    hour: hour,
    minute: minute,
    time: timeStamp,
    dateStamp: dateStamp,
  },
});
