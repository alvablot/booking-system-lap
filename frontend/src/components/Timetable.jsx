import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { allBookingsState } from "../recoil/allBookings/atom";
import { allTimeState } from "../recoil/allTime/atom";
import { weekState } from "../recoil/week/atom";
import { monthState } from "../recoil/month/atom";
import { yearState } from "../recoil/year/atom";
import { dateState } from "../recoil/date/atom";
import { inputBoxState } from "../recoil/inputBox/atom";
import yearArray from "../yearArray.json";

function Timetable(props) {
  let tdDate = [];
  let tdTime = [];
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

  for (let i = 0; i < 7; i++) {
    days[i] = yearList[-TotalDays + thisWeek + i].date;
  }
  useEffect(() => {
    setThisWeek(thisWeek);
  }, [thisWeek]);

  console.log(allBookings);
  function handleTimeClick(year, month, obj, date, hour, minute) {
    let strMonth = month;
    let strDate = date;
    if (strMonth.toString().length < 2) strMonth = "0" + strMonth;
    if (strDate.toString().length < 2) strDate = "0" + strDate;
    const dateStamp = `${year}-${strMonth}-${strDate}`;
    console.log(tdDate);
    console.log(tdTime);

    let strHour = hour;
    let strMinute = minute;
    if (strHour.toString().length < 2) strHour = "0" + strHour;
    if (strMinute.toString().length < 2) strMinute = "0" + strMinute;
    const time = `${strHour}:${strMinute}`;
    //if (month.toString().length < 2) month = "0" + month;
  

    setDate({
      dateStamp: dateStamp,
      year: year,
      month: month,
      date: obj.id,
      hour: hour,
      minute: minute,
      time: time,
      day: date.day,
    });
    setInputBox("block");

    if (obj.className === "day") obj.className = "activeDay";
    else obj.className = "day";
  }

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
          Year: {yearList[-TotalDays].year} Month:{" "}
          {yearList[-TotalDays + thisWeek].month} Date:{" "}
          {yearList[-TotalDays + thisWeek].date}{" "}
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
                <td className="day">
                  {dayNameArray[i]} {day}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {allTime.map((item, i) => {
            return (
              <tr className="dayRow" key={`dayRow${item}`}>
                <td className="time" key={`time${item}`}>
                  {item}
                </td>
                {days.map((day, numberOfDays) => {
                  let bookStart = false;
                  let bookEnd = false;

                  allBookings.forEach((booking) => {
                    let newTdDate = [
                      `${yearList[-TotalDays].year}-${
                        yearList[-TotalDays + thisWeek].monthInt
                      }-${days[numberOfDays]}`,
                    ];
                    tdDate.push(newTdDate);

                    let newTdTime = [`${i}:00`];
                    tdTime.push(newTdTime);

                    if (i < 10) tdTime[0] = `0${i}:00`;
                    if (
                      booking.startDate === tdDate[0] &&
                      booking.startTime === tdTime[0]
                    ) {
                      bookStart = true;
                    }
                  });
                  if (bookStart) {
                    return <td key={`timeCell${day}`}>Booked</td>;
                  } else {
                    return (
                      <td
                        key={`timeCell${day}`}
                        className="day"
                        id={days[numberOfDays]}
                        onClick={(e) => {
                          handleTimeClick(
                            yearList[-TotalDays].year,
                            yearList[-TotalDays + thisWeek].monthInt,
                            e.target,
                            days[numberOfDays],
                            i,
                            0
                          );
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
