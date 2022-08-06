import { atom } from "recoil";
const now = new Date();
let month = now.getMonth() + 1;

const date = now.getDate();
const day = now.getDay() - 1;
const year = now.getFullYear();
const hour = now.getHours();
let minute = now.getMinutes();

let startDateStamp;
let stopDateStamp;
let strMonth = month;
let strDate = date;
let strDate2 = date + 1;
let strMinute = minute;
let strMinute2 = minute;
if (month < 10) strMonth = "0" + month;

if (date < 10) strDate = "0" + date;
startDateStamp = `${year}-${strMonth}-0${date}`;
if (strDate2 < 10) stopDateStamp = `${year}-${strMonth}-0${date + 1}`;

if (minute < 10) strMinute = "0" + minute;
const startTimeStamp = `${hour}:${strMinute}`;
const stopTimeStamp = `${hour + 1}:${strMinute}`;
let start = 0;
let stop = 0;

export const dateState = atom({
  key: "dates",
  default: {
    headline: "",
    info: "",
    user: "",
    room: "",
    customer: "",
    startDateStamp: startDateStamp,
    stopDateStamp: stopDateStamp,

    startYear: year,
    startMonth: month,
    startDate: date,
    stopYear: year,
    stopMonth: month,
    stopDate: date + 1,

    day: day,
    hour: hour,
    stopHour: hour + 1,
    startMinute: minute,
    stopMinute: minute,
    startTime: startTimeStamp,
    stopTime: stopTimeStamp,
    startHour: 0,

    weekNumber: 0,
  },
});
