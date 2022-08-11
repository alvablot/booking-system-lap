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
  const dayNameArray = [
    "Monday",
    "Thusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
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
  let [todayPlusSevenBeetwenBookings, setDaysBeetwenBookings] = useRecoilState(bookingDaysState);
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

  const [thisWeek, setThisWeek] = useState(0);
  let [inputBox, setInputBox] = useRecoilState(inputBoxState);
  let [todayPlusSeven, setDays] = useState([]);
  let dayOfTheWeek = new Date().getDay() - 1;
  let monday = -dayOfTheWeek;
  let newBookingArray = [];
  let startBokingHour;
  let stopBokingHour;
  let countHour;
  let hoursBooked;
  let countWeek = 0;

  let beginBooking = [];
  let beginYear;
  let beginMonth;
  let beginDate;
  let beginBookingHour = [];
  let beginHour;
  let endHour;

  let endBooking;
  let endinYear;
  let endinMonth;
  let endinDate;
  let bookmark = "";

  for (let i = 0; i < 7; i++) {
    todayPlusSeven[i] = yearList[-TotalDays + thisWeek + i].date;
  }
  let [weekNumber, setWeekNumber] = useState(yearList[-TotalDays].week);

  ////////////////////////////////////////////////////////////////////
  function handleTimeClick(year, month, obj, date, time, cellId, weekNumber) {
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
      weekNumber: weekNumber,
    });
    setInputBox("block");
  }
  /////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setDate(date);
    setStartBookings(startBookings);
  }, [date, startBookings]);

  return (
    <div id="timetable-wrap">
      <div className="time-table-head">
        <button
          id="button-prev"
          onClick={() => {
            countWeek--, setWeekNumber(weekNumber - 1), setThisWeek(thisWeek - 7);
          }}
        >
          Previous
        </button>
        <div id="date-prev">
          {yearList[-TotalDays + thisWeek].month} {yearList[-TotalDays].year} Week{" "}
          {yearList[-TotalDays + thisWeek + countWeek].week}
        </div>
        <button
          id="button-next"
          onClick={() => {
            countWeek++, setWeekNumber(weekNumber + 1), setThisWeek(thisWeek + 7);
          }}
        >
          Next
        </button>
      </div>
      <main id="table">
        <div className="col">
          <div className="headCell">Time</div>
          {allTime.map((time, i) => {
            return (
              <div className="divCell" key={`cell_${i}_${time}`}>
                {time}
              </div>
            );
          })}
        </div>

        {todayPlusSeven.map((day, numberOfDays) => {
          if (allBookings[0] != undefined) {
            beginBooking = allBookings[0].startDate.split("-");
            beginYear = parseInt(beginBooking[0]);
            beginMonth = parseInt(beginBooking[1]);
            beginDate = parseInt(beginBooking[2]);

            endBooking = allBookings[0].stopDate.split("-");
            endinYear = parseInt(endBooking[0]);
            endinMonth = parseInt(endBooking[1]);
            endinDate = parseInt(endBooking[2]);
          }
          countHours += 24;
          allBookings.map((bookings) => {
            beginBookingHour = bookings.startTime.split(":");
            beginHour = parseInt(beginBookingHour[0]);
            endHour = parseInt(beginBookingHour[1]);
          });
          return (
            <div className="col" key={`col_${numberOfDays}_`}>
              <div className="headCell">
                {/*//// Day week and date*/}
                {dayNameArray[numberOfDays]}{" "}
                {yearList[-TotalDays + thisWeek - dayOfTheWeek + numberOfDays].date}
              </div>



              {hours.map((hour, a) => {
                let cellId = a + countHours;
                let time = `${a}:00`;
                let tdDate = new Date(
                  `${yearList[-TotalDays].year}-${yearList[-TotalDays + thisWeek].monthInt}-${
                    yearList[-TotalDays + thisWeek - dayOfTheWeek + numberOfDays].date
                  } ${time}`
                );
                if(startBookings[0] != undefined) {
                  startBookings.map((start, i)=>{
                    console.log(start.getDate())
                    console.log(stopBookings[i].getDate())
                  })
                }
                return (
                  <div
                    key={`cell_${a}_${countHours}`}
                    id={cellId}
                    className={"divCell"}
                    onClick={(e) => {
                      e.target.style.backgroundColor = "#ff008c";
                      handleTimeClick(
                        yearList[-TotalDays].year,
                        yearList[-TotalDays + thisWeek].monthInt,
                        e.target,
                        tdDate,
                        time,
                        cellId,
                        weekNumber
                      );
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
