import "./App.css";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { allBookingsState } from "./recoil/allBookings/atom";
import { allTimeState } from "./recoil/allTime/atom";
import Bookings from "./components/Bookings";
import InputBox from "./components/InputBox";
import Timetable from "./components/Timetable";
const url = "http://localhost:4000";

function App() {
  let [allBookings, setAllBookings] = useRecoilState(allBookingsState);
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
    if (allBookings[0] !== undefined) {
      allBookings.forEach((booking, i) => {
        startBookingDate[i] = new Date(booking.startDate);
        let startYear = startBookingDate[i].getFullYear();
        let startMonth = startBookingDate[i].getMonth() + 1;
        let startDate = startBookingDate[i].getDate();
        let time = booking.startTime.split(":");
        let hours = parseInt(time[0]);
        let minutes = parseInt(time[1]);
        startBookingDate[i].setHours(hours);
        startBookingDate[i].setMinutes(minutes);
      });

      console.log(startBookingDate);
    }
  }, [allBookings]);

  /*
  if (allBookings[0] !== undefined) {
    let a = 0;
    allBookings.forEach((booking, i) => {
      if (a < 2) {
        let destructedTime = booking.startTime.split(":");
        destructedTime.join(",");
        let hour = parseInt(destructedTime[0]);
        let minute = parseInt(destructedTime[1]);
        if (destructedBookingsStart[i] !== undefined) {
          destructedBookingsStart[i] = new Date(booking.startDate);
        }
        console.log(destructedBookingsStart);
        //destructedBookingsStop[i] = new Date(booking.stoptDate, booking.stopTime);
      }
      a++;
    });
    console.log(destructedBookingsStart);
  }
*/
  useEffect(() => {
    setAllBookings;
  }, [allBookings]);

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
