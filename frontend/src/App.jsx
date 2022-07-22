import "./App.css";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { allBookingsState } from "./recoil/allBookings/atom";
import { startBookingsState } from "./recoil/startBookings/atom";
import { stopBookingsState } from "./recoil/stopBookings/atom";
import { allTimeState } from "./recoil/allTime/atom";
import Bookings from "./components/Bookings";
import InputBox from "./components/InputBox";
import Timetable from "./components/Timetable";
const url = "http://localhost:4000";

function App() {
  let [allBookings, setAllBookings] = useRecoilState(allBookingsState);
  let [startBookings, setStartBookings] =
    useRecoilState(startBookingsState);
  let [stopBookings, setStopBookings] =
    useRecoilState(stopBookingsState);
  let [bookingId, setBookingId] = useState("");
  let destructedBookingsStart = [{}];
  let destructedBookingsStop = [];

  useEffect(() => {
    fetch(`${url}/bookings`)
      .then((res) => res.json())
      .then((json) => setAllBookings(json));
  }, []);
  let startBookingDate = [];
  let stopBookingDate = [];
  useEffect(() => {
    //if (allBookings[0] !== undefined) {
      allBookings.map((booking, i) => {
        startBookingDate[i] = new Date(booking.startDate);
        let startYear = startBookingDate[i].getFullYear();
        let startMonth = startBookingDate[i].getMonth() + 1;
        let startDate = startBookingDate[i].getDate();
        let startTime = booking.startTime.split(":");
        let startHours = parseInt(startTime[0]);
        let StartMinutes = parseInt(startTime[1]);
        startBookingDate[i].setHours(startHours);
        startBookingDate[i].setMinutes(StartMinutes);

        stopBookingDate[i] = new Date(booking.stopDate);
        let stopYear = stopBookingDate[i].getFullYear();
        let stopMonth = stopBookingDate[i].getMonth() + 1;
        let stopDate = stopBookingDate[i].getDate();
        let stopTime = booking.stopTime.split(":");
        let stopHours = parseInt(stopTime[0]);
        let stopMinutes = parseInt(stopTime[1]);
        stopBookingDate[i].setHours(stopHours);
        stopBookingDate[i].setMinutes(stopMinutes);
      });
     // if (stopBookingDate[0] !== undefined || startBookingDate[0] !== undefined) {
        setStartBookings(startBookingDate);
        setStopBookings(stopBookingDate);
      //}
   // }
  }, [allBookings]);

  useEffect(() => {
    setStopBookings;
    setStartBookings;
    setAllBookings;
  }, [allBookings, stopBookingDate, startBookingDate]);

  function addBooking(elements, form) {
    const headline = form.headline.value;
    const startDate = form.startDate.value;
    const stopDate = form.stopDate.value;
    const startTime = form.startTime.value;
    const stopTime = form.stopTime.value;
    const info = form.info.value;
    const user = form.user.value;
    const customer = form.customer.value;
    const room = form.room.value;

    fetch(`${url}/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        headline: headline,
        startDate: startDate,
        stopDate: stopDate,
        startTime: startTime,
        stopTime: stopTime,
        info: info,
        user: user,
        customer: customer,
        room: room,
      }),
    })
      .then((res) => res.json())
      .then((json) => setAllBookings(json));
  }

  function deleteBooking(id) {
    fetch(`${url}/booking/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((json) => setAllBookings(json));
  }

  return (
    <div className="App">
      <header className="App-header">
        <InputBox addBooking={addBooking} />
        <Timetable />
        <br />
        <Bookings deleteBooking={deleteBooking} />
      </header>
    </div>
  );
}
export default App;
