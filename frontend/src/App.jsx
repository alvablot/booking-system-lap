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
  function fetchBookings() {
    useEffect(() => {
      fetch(`${url}/bookings`)
        .then((res) => res.json())
        .then((json) => setAllBookings(json));
    }, []);
  }

  function addBooking(elements) {
    fetch(`${url}/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        headline: elements.headline,
        start: `${elements.startDate} ${elements.startTime}:00`,
        stop: `${elements.stopDate} ${elements.stopTime}:00`,
        info: elements.info,
        user: elements.user,
        customer: elements.customer,
        room: elements.room,
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
