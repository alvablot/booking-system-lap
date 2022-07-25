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
import { bookingDaysState } from "../recoil/bookingDays/atom";
import yearArray from "../yearArray.json";

function NewTable() {
  const hours = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const dayNameArray = ["Monday", "Thusday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let countHours = -24;
  let tdTime;
  const [allTime, setAllTime] = useRecoilState(allTimeState);
  const [allBookings, setAllBookings] = useRecoilState(allBookingsState);
  let [startBookings, setStartBookings] = useRecoilState(startBookingsState);
  let [stopBookings, setStopBookings] = useRecoilState(stopBookingsState);
  const [week, setWeek] = useRecoilState(weekState);
  const [month, setMonth] = useRecoilState(monthState);
  const [year, setYear] = useRecoilState(yearState);
  const [date, setDate] = useRecoilState(dateState);
  let [thisMonday, setThisMonday] = useState(date);
  let [daysBeetwenBookings, setDaysBeetwenBookings] = useRecoilState(bookingDaysState);
  let [booked, setBooked] = useState(false);
  //////////////////
  let now = new Date();
  let yearList;
  let date_1;
  let date_2;
  let difference;
  let TotalDays;
  function initDate(date) {
    yearList = [...yearArray];
    date_1 = new Date("2022-01-01");
    date_2 = date;
    difference = date_1.getTime() - date_2.getTime();
    TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return -TotalDays;
  }
  initDate(now);

  //if(daysBeetwenBookings[0] !== undefined) console.log(daysBeetwenBookings[0]);

  const [thisWeek, setThisWeek] = useState(0);
  let [inputBox, setInputBox] = useRecoilState(inputBoxState);
  let [days, setDays] = useState([]);
  let dayOfTheWeek = new Date().getDay() - 1;
  let monday = -dayOfTheWeek;
  let newBookingArray = [];
  let startBokingHour;
  let stopBokingHour;
  let countHour;
  let hoursBooked;

  for (let i = 0; i < 7; i++) {
    days[i] = yearList[-TotalDays + thisWeek + i].date;
  }
  let [weekNumber, setWeekNumber] = useState(yearList[-TotalDays].week);
  //console.log(startBookings)
  //console.log(stopBookings)
  ////////////////////////////////////////////////////////////////////
  function handleTimeClick(year, month, obj, date, time, cellId) {
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
      startHour: cellId,
      time: time,
      day: date.day,
    });

    setInputBox("block");
    obj.style.background = "#ff008c";
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
            setWeekNumber(weekNumber - 1), setThisWeek(thisWeek - 7);
          }}
        >
          Previous
        </button>
        <div id="date-prev">
          {" "}
          {yearList[-TotalDays + thisWeek].month} {yearList[-TotalDays].year} {yearList[-TotalDays + thisWeek].date} Week: {weekNumber}
        </div>
        <button
          id="button-next"
          onClick={() => {
            setWeekNumber(weekNumber + 1), setThisWeek(thisWeek + 7);
          }}
        >
          Next
        </button>
      </div>
      <main id="table">
        <div className="col">
          <div className="headCell">Time</div>
          {allTime.map((time, i) => {
            return <div className="divCell">{time}</div>;
          })}
        </div>

        {days.map((day, numberOfDays) => {
          countHours += 24;

          return (
            <div className="col">
              <div className="headCell">
                {dayNameArray[numberOfDays]} {yearList[-TotalDays + thisWeek - dayOfTheWeek + numberOfDays].date}
              </div>

              {hours.map((hour, a) => {
                let cellId = a + countHours;
                let time = `${a}:00`;
                let dayCorrection = 0;
                let adjust = false;
                let tdDate = new Date(`${yearList[-TotalDays].year}-${yearList[-TotalDays + thisWeek].monthInt}-${yearList[-TotalDays + thisWeek - dayOfTheWeek + numberOfDays].date} ${time}`);
                let numberOfHours
                startBookings.map((booking, i) => {
                  if (stopBookings[i].getDate() > startBookings[i].getDate()) {
                       numberOfHours = startBookings[i].getDate() + startBookings[i].getDate()

                  } 
                else if(stopBookings[i].getDate() === startBookings[i].getDate()) {
                    numberOfHours = stopBookings[i].getHours() - startBookings[i].getHours();
                    
                  } 
                  for (let b = dayCorrection; b < numberOfHours; b++) {
                   if (startBookings[i].getDate() === tdDate.getDate() && startBookings[i].getHours() + b === tdDate.getHours()) {
                      cellId = "booked";
                    }
                    ///////////
                    if (stopBookings[i].getDate() === tdDate.getDate() && startBookings[i].getHours() - b - 1 === tdDate.getHours()) {
                      cellId = "booked";
                    }
                    if (adjust && stopBookings[i].getDate() === tdDate.getDate() && startBookings[i].getHours()  === tdDate.getHours()) {
                      cellId = "booked";
                      console.log(startBookings[i].getHours())
                    }
                    ////////////
                  }
                });
                /*if (hoursBooked[1] === cellId) {
                  let hej = "booked";
                }
                */
                tdDate = yearList[-TotalDays + thisWeek - dayOfTheWeek + numberOfDays].date;
                return (
                  <div
                    key={`cell_${a} ${countHours}`}
                    id={cellId}
                    className="divCell"
                    onClick={(e) => {
                      handleTimeClick(yearList[-TotalDays].year, yearList[-TotalDays + thisWeek].monthInt, e.target, tdDate, time, cellId);
                    }}
                  >
                    {cellId}
                  </div>
                );
              })}
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default NewTable;
