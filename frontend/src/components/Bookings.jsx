import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { allBookingsState } from "../recoil/allBookings/atom";

function Bookings(props) {
  let { allBookings } = props;
  props.fetchBookings();
  function handleDelete(id) {
    props.deleteBooking(id);
  }
  return (
    <div className="list">
      <h1>Bookings</h1>
      {allBookings.map((item, i) => {
        return (
          <div key={`book${item.id}`} className="booking">
            <div key={`id${item.id}`}>
              <b>ID: </b>
              {item.id}
            </div>
            <div key={`headline${item.id}`}>
              <b>{item.headline}</b>
            </div>
            <div key={`start${item.id}`}>
              <b>From: </b>
              {item.start}
            </div>
            <div key={`stop${item.id}`}>
              <b>To: </b>
              {item.stop}
            </div>
            <div key={`info${item.id}`}>
              <b>Info: </b>
              {item.info}
            </div>
            <div key={`user${item.id}`}>
              <b>User: </b>
              {item.user}
            </div>
            <div key={`customer${item.id}`}>
              <b>Customer: </b>
              {item.customer}
            </div>
            <div key={`room${item.id}`}>
              <b>Room: </b>
              {item.room}
            </div>
            <div key={`edit${item.id}`}>
              <button>Edit</button>
              <button onClick={() => {handleDelete(item.id)}}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Bookings;
