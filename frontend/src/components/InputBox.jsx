import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { allBookingsState } from "../recoil/allBookings/atom";

import { dateState } from "../recoil/date/atom";
import { inputBoxState } from "../recoil/inputBox/atom";
import dateList from "../dateList.json";

function InputBox(props) {
  const [date, setDate] = useRecoilState(dateState);
  let [inputBox, setInputBox] = useRecoilState(inputBoxState);
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addBooking(inputs, event.target);
  };

  return (
    <div id="inputBox" style={{ display: inputBox }}>
      <form onSubmit={handleSubmit}>
        <div id="container">
          <div id="headInput">
            <div id="h1" className="headline">New Booking </div>
            <div id="close" className="headline">
              <a
                href="#"
                id="closing"
                onClick={() => {
                  setInputBox("none");
                }}
              >
                Close
              </a>
            </div>
          </div>
        </div>
        <label htmlFor="headline">Headline</label>
        <br />
        <input
          id="headline"
          name="headline"
          className="textInput"
          type="text"
          value={inputs.headline || ""}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="startDate" className="date-label">
          From
        </label>
        <input
          type="text"
          id="startDate"
          name="startDate"
          value={inputs.startDate || `${date.year}-${date.month}-${date.date}`}
          onChange={handleChange}
        />
        <input
          type="text"
          id="startTime"
          name="startTime"
          value={inputs.startTime || date.time}
          onChange={handleChange}
        ></input>
        <br />
        <label htmlFor="stopDate" className="date-label">
          To
        </label>
        <input
          type="text"
          id="stopDate"
          name="stopDate"
          value={inputs.stopDate || `${date.year}-${date.month}-${date.date}`}
          onChange={handleChange}
        />
        <input
          type="text"
          id="stopTime"
          name="stopTime"
          value={inputs.stopTime || date.time}
          onChange={handleChange}
        ></input>
        <br />
        <label htmlFor="info">Info</label>
        <br />
        <div className="input-wrap">
          <textarea
            id="info"
            name="info"
            className="infoInput"
            rows="4"
            cols="50"
            onChange={handleChange}
          />
          <select id="room" name="room" onChange={handleChange}>
            <option value="Room">Room</option>
            <option value="Room1">Room1</option>
            <option value="Room2">Room2</option>
            <option value="Room3">Room3</option>
            <option value="Room4">Room4</option>
          </select>
          <input
            id="user"
            name="user"
            className="textInput"
            type="text"
            defaultValue={inputs.user || "User"}
            onChange={handleChange}
          />
          <select id="customer" name="customer" onChange={handleChange}>
            <option value="Chose Customer">Chose Customer</option>
            <option value="New customer">New customer</option>
            <option value="Saab">Saab</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Audi">Audi</option>
          </select>
        </div>
        <div>
          <button type="submit" className="after-box">
            Add booking
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputBox;
