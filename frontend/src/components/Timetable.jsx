import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { allBookingsState } from "../recoil/allBookings/atom";
import { startBookingsState } from "../recoil/startBookings/atom";
import { stopBookingsState } from "../recoil/stopBookings/atom";
import { allTimeState } from "../recoil/allTime/atom";
import { weekState } from "../recoil/week/atom";
import { monthState } from "../recoil/month/atom";
import { yearState } from "../recoil/year/atom";
import { dateState } from "../recoil/date/atom";
import { inputBoxState } from "../recoil/inputBox/atom";
import yearArray from "../yearArray.json";

function Timetable(props) {
  let tdDate;
  let tdTime;
  const dayNameArray = [
    "Monday",
    "Thusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [allTime, setAllTime] = useRecoilState(allTimeState);
  const [allBookings, setAllBookings] = useRecoilState(allBookingsState);
  let [startBookings, setStartBookings] =
    useRecoilState(startBookingsState);
  let [stopBookings, setStopBookings] =
    useRecoilState(stopBookingsState);
  const [week, setWeek] = useRecoilState(weekState);
  const [month, setMonth] = useRecoilState(monthState);
  const [year, setYear] = useRecoilState(yearState);
  const [date, setDate] = useRecoilState(dateState);
  let [thisMonday, setThisMonday] = useState(date);
  let yearList = [...yearArray];
  let date_1 = new Date("01/01/2022");
  let date_2 = new Date();
  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

  const [thisWeek, setThisWeek] = useState(0);
  let [inputBox, setInputBox] = useRecoilState(inputBoxState);
  let [days, setDays] = useState([]);
  let dayOfTheWeek = new Date().getDay() - 1;
  let monday = -dayOfTheWeek;
  let newBookingArray = [];

  for (let i = 0; i < 7; i++) {
    days[i] = yearList[-TotalDays + thisWeek + i].date;
  }

  ////////////////////////////////////////////////////////////////////
  function handleTimeClick(year, month, obj, date, time) {
    let strMonth = month;
    let strDate = date;
    if (strMonth.toString().length < 2) strMonth = "0" + strMonth;
    if (strDate.toString().length < 2) strDate = "0" + strDate;
    const dateStamp = `${year}-${strMonth}-${strDate}`;

    setDate({
      dateStamp: dateStamp,
      year: year,
      month: month,
      date: date,
      //hour: hour,
      //minute: minute,
      time: time,
      day: date.day,
    });

    setInputBox("block");
    if (obj.className === "day") obj.className = "activeDay";
    else obj.className = "day";
  }
  /////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setDate(date);
  }, [date]);

  return (
    <div id="timetable-wrap">
      <div className="time-table-head">
        <button
          id="button-prev"
          onClick={() => {
            setThisWeek(thisWeek - 7);
          }}
        >
          Previous
        </button>
        <div id="date-prev">
          {" "}
          {yearList[-TotalDays + thisWeek].month} {yearList[-TotalDays].year}{" "}
          {yearList[-TotalDays + thisWeek].date} Week:{" "}
          {yearList[-TotalDays + thisWeek].date}
        </div>
        <button
          id="button-next"
          onClick={() => {
            setThisWeek(thisWeek + 7);
          }}
        >
          Next
        </button>
      </div>
      <table className="timetable">
        <thead>
          <tr className="dayRow">
            <td className="time">Time</td>
            {days.map((day, i) => {
              return (
                <td className="day" key={`day_${i}`}>
                  {dayNameArray[i]}{" "}
                  {yearList[-TotalDays + thisWeek - dayOfTheWeek + i].date}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {allTime.map((time, i) => {
            let booked = [];
            return (
              <tr className="dayRow" key={`dayRow${time}`}>
                <td className="time" key={`time${time}`}>
                  {time}
                </td>

                {days.map((day, numberOfDays) => {
                  ////////////////////////////////////////////////////////////////////////////////////////////////////
                  let tdDate = new Date(
                    `${yearList[-TotalDays].year}-${
                      yearList[-TotalDays + thisWeek].monthInt
                    }-${
                      yearList[-TotalDays + numberOfDays + thisWeek - 4].date
                    } ${time}`
                  );
                  startBookings.map((startBooking, i) => {
                    if (
/*
                      startBooking.getYear() === tdDate.getYear() && 
                      startBooking.getMonth() === tdDate.getMonth() &&
                      startBooking.getDate() === tdDate.getDate() &&
                      startBooking.getHours() <= tdDate.getHours() &&
                      startBooking.getMinutes() <= tdDate.getMinutes()
                      */


                      startBooking.getYear() <= tdDate.getYear() && stopBookings[i].getYear() >= tdDate.getYear() &&
                      startBooking.getMonth() <= tdDate.getMonth() && stopBookings[i].getMonth() >= tdDate.getMonth() &&
                      startBooking.getDate() <= tdDate.getDate() && stopBookings[i].getDate() >= tdDate.getDate() &&
                      startBooking.getHours() <= tdDate.getHours() && stopBookings[i].getHours() >= tdDate.getHours() &&
                      startBooking.getMinutes() <= tdDate.getMinutes() &&  stopBookings[i].getMinutes() >= tdDate.getMinutes()




                    ) {
                      booked[numberOfDays] = true;
                    }
                  });

                  if (booked[numberOfDays]) {
                    return <td key={`timeCell${day}`}>Booked</td>;
                  } else {
                    return (
                      <td
                        key={`timeCell${day}`}
                        className="day"
                        onClick={(e) => {
                          handleTimeClick(
                            yearList[-TotalDays].year,
                            yearList[-TotalDays + thisWeek].monthInt,
                            e.target,
                            yearList[-TotalDays + numberOfDays + thisWeek - 4]
                              .date,
                            time
                          );
                          console.log(tdDate);
                        }}
                      ></td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;
