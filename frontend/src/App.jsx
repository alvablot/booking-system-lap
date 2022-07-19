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
  let bookingsArray = [...allBookings];
  let splitBookings;
  let [bookingId, setBookingId] = useState("");
  function fetchBookings() {
    useEffect(() => {
      fetch(`${url}/bookings`)
        .then((res) => res.json())
        .then((json) => setAllBookings(json));
    }, []);
  }

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
  let splitStartDate;
  useEffect(() => {
    if (bookingsArray[0].startDate !== undefined) {
      splitStartDate = bookingsArray[0].startDate.split("-");
      console.log(splitStartDate);
    }
  }, [allBookings]);

  return (
    <div className="App">
      <header className="App-header">
        <InputBox addBooking={addBooking} />
        <Timetable />
        <br />
        <Bookings
          fetchBookings={fetchBookings}
          deleteBooking={deleteBooking}
          allBookings={allBookings}
        />
      </header>
    </div>
  );
}
export default App;
