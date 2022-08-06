import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { allBookingsState } from '../recoil/allBookings/atom'

import { usersState } from '../recoil/users/atom'
import { dateState } from '../recoil/date/atom'
import { inputBoxState } from '../recoil/inputBox/atom'
import { inputState } from '../recoil/input/atom'
import dateList from '../dateList.json'
import { startBookingsState } from '../recoil/startBookings/atom'
import { stopBookingsState } from '../recoil/stopBookings/atom'
const url = 'http://localhost:4000'

function InputBox (props) {
  let [startBookings, setStartBookings] = useRecoilState(startBookingsState)
  let [stopBookings, setStopBookings] = useRecoilState(stopBookingsState)
  let [allBookings, setAllBookings] = useRecoilState(allBookingsState)
  const [date, setDate] = useRecoilState(dateState)
  const [users, setUsers] = useRecoilState(usersState)
  let [inputBox, setInputBox] = useRecoilState(inputBoxState)
  const [inputs, setInputs] = useState(inputState)
  let startDates
  let userName
  let stopDates
  let startTimes
  let stopTimes
  if (users[0] !== undefined) userName = users[0].username
  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
    setDate(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    //console.log(e.target.headline.value)

    startDates = e.target.startDate.value.split('-')
    stopDates = e.target.stopDate.value.split('-')
    startDates[0] = parseInt(startDates[0])
    startDates[1] = parseInt(startDates[1])
    startDates[2] = parseInt(startDates[2])
    stopDates[0] = parseInt(stopDates[0])
    stopDates[1] = parseInt(stopDates[1])
    stopDates[2] = parseInt(stopDates[2])

    startTimes = e.target.startTime.value.split(':')
    startTimes[0] = parseInt(startTimes[0])
    startTimes[1] = parseInt(startTimes[1])

    stopTimes = e.target.stopTime.value.split(':')
    stopTimes[0] = parseInt(stopTimes[0])
    stopTimes[1] = parseInt(stopTimes[1])

    setDate({
      headline: e.target.headline.value,
      info: e.target.info.value,
      user: e.target.user.value,
      room: e.target.room.value,
      customer: e.target.customer.value,
      startDateStamp: e.target.startDate.value,
      stopDateStamp: e.target.stopDate.value,
      startYear: startDates[0],
      startMonth: startDates[1],
      startDate: startDates[2],
      stopYear: stopDates[0],
      stopMonth: stopDates[1],
      stopDate: stopDates[2]
      //startHour: cellId,
      //time: time,
      //day: date.day,
      //weekNumber: weekNumber,
    })
    props.addBooking()
  }
  //})
  return (
    <div id='inputBox' style={{ display: { inputBox } }}>
      <form onSubmit={handleSubmit}>
        <div id='container'>
          <div id='headInput'>
            <div id='h1' className='headline'>
              New Booking{' '}
            </div>
            <div id='close' className='headline'>
              <a
                href='#'
                id='closing'
                onClick={() => {
                  setInputBox('none')
                }}
              >
                Close
              </a>
            </div>
          </div>
        </div>
        <label htmlFor='headline'>Headline</label>
        <br />
        <input
          id='headline'
          name='headline'
          className='textInput'
          type='text'
          value={inputs.headline || date.headline}
          onChange={handleChange}
        />
        <br />
        <label htmlFor='startDate' className='date-label'>
          From
        </label>
        <input
          type='text'
          id='startDate'
          name='startDate'
          value={inputs.startDate || date.startDateStamp}
          onChange={handleChange}
        />
        <input
          type='text'
          id='startTime'
          name='startTime'
          value={inputs.startTime || date.startTime}
          onChange={handleChange}
        ></input>
        <br />
        <label htmlFor='stopDate' className='date-label'>
          To
        </label>
        <input
          type='text'
          id='stopDate'
          name='stopDate'
          value={inputs.stopDate || date.stopDateStamp}
          onChange={handleChange}
        />
        <input
          type='text'
          id='stopTime'
          name='stopTime'
          value={inputs.stopTime || date.stopTime}
          onChange={handleChange}
        ></input>
        <br />
        <label htmlFor='info'>Info</label>
        <br />
        <div className='input-wrap'>
          <textarea
            id='info'
            name='info'
            className='infoInput'
            rows='4'
            cols='50'
            onChange={handleChange}
            value={inputs.info || date.info}
          />
          <select id='room' name='room' onChange={handleChange}>
            <option value='Room'>Room</option>
            <option value='Room1'>Room1</option>
            <option value='Room2'>Room2</option>
            <option value='Room3'>Room3</option>
            <option value='Room4'>Room4</option>
          </select>
          <input
            id='user'
            name='user'
            className='textInput'
            type='text'
            defaultValue={userName}
            onChange={handleChange}
          />
          <select id='customer' name='customer' onChange={handleChange}>
            <option value='Chose Customer'>Chose Customer</option>
            <option value='New customer'>New customer</option>
            <option value='Saab'>Saab</option>
            <option value='Mercedes'>Mercedes</option>
            <option value='Audi'>Audi</option>
          </select>
        </div>
        <div>
          <button type='submit' className='after-box'>
            Add booking
          </button>
        </div>
      </form>
    </div>
  )
}

export default InputBox
