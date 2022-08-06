import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { allBookingsState } from '../recoil/allBookings/atom'
import { startBookingsState } from '../recoil/startBookings/atom'
import { stopBookingsState } from '../recoil/stopBookings/atom'
import { allTimeState } from '../recoil/allTime/atom'
import { weekState } from '../recoil/week/atom'
import { monthState } from '../recoil/month/atom'
import { yearState } from '../recoil/year/atom'
import { dateState } from '../recoil/date/atom'
import { inputBoxState } from '../recoil/inputBox/atom'
import { inputState } from '../recoil/input/atom'
import { bookingDaysState } from '../recoil/bookingDays/atom'
import yearArray from '../yearArray.json'

function NewTable () {
  const hours = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ]
  const dayNameArray = [
    'Monday',
    'Thusday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]
  let countHours = -24
  let tdTime
  const [allTime, setAllTime] = useRecoilState(allTimeState)
  const [allBookings, setAllBookings] = useRecoilState(allBookingsState)
  let [startBookings, setStartBookings] = useRecoilState(startBookingsState)
  let [stopBookings, setStopBookings] = useRecoilState(stopBookingsState)
  const [inputs, setInputs] = useRecoilState(inputState)
  const [week, setWeek] = useRecoilState(weekState)
  const [month, setMonth] = useRecoilState(monthState)
  const [year, setYear] = useRecoilState(yearState)
  let [date, setDate] = useRecoilState(dateState)
  let [thisMonday, setThisMonday] = useState(date)
  let [daysBeetwenBookings, setDaysBeetwenBookings] = useRecoilState(
    bookingDaysState
  )
  let [booked, setBooked] = useState(false)
  //////////////////
  let now = new Date()
  let yearList
  let date_1
  let date_2
  let difference
  let TotalDays
  function initDate (date) {
    yearList = [...yearArray]
    date_1 = new Date('2022-01-01')
    date_2 = date
    difference = date_1.getTime() - date_2.getTime()
    TotalDays = Math.ceil(difference / (1000 * 3600 * 24))
    return -TotalDays
  }
  initDate(now)

  const [thisWeek, setThisWeek] = useState(0)
  let [inputBox, setInputBox] = useRecoilState(inputBoxState)
  let [days, setDays] = useState([])
  let dayOfTheWeek = new Date().getDay() - 1
  let monday = -dayOfTheWeek
  let newBookingArray = []
  let startBokingHour
  let stopBokingHour
  let countHour
  let hoursBooked
  let countWeek = 0

  for (let i = 0; i < 7; i++) {
    days[i] = yearList[-TotalDays + thisWeek + i].date
  }
  let [weekNumber, setWeekNumber] = useState(yearList[-TotalDays].week)
  ////////////////////////////////////////////////////////////////////
  function handleTimeClick (
    year,
    month,
    obj,
    dateArg,
    time,
    cellId,
    weekNumber
  ) {
    let strMonth = month
    let strDate = dateArg
    if (strMonth.toString().length < 2) strMonth = '0' + strMonth
    if (strDate.toString().length < 2) strDate = '0' + strDate
    const startDateStamp = `${year}-${strMonth}-${strDate}`

    let startTimes = time.split(':')
    startTimes[0] = parseInt(startTimes[0])
    if (startTimes[0] < 10) startTimes[0] = '0' + parseInt(startTimes[0])


    let stopTimes = []
    stopTimes[0] = parseInt(startTimes[0])
    if (stopTimes[0] < 10) stopTimes[0] = "0" + parseInt(stopTimes[0] + 1)
    stopTimes[1] = startTimes[1]



    const startTimeStamp = `${startTimes[0]}:${startTimes[1]}`
    const stopTimeStamp = `${stopTimes[0]}:${stopTimes[1]}`

    setDate({
      startDateStamp: startDateStamp,
      stopDateStamp: startDateStamp,
      startYear: year,
      startMonth: month,
      startDate: date,
      startTime: startTimeStamp,
      stopTime: stopTimeStamp,
      startHour: cellId,
      time: time,
      day: date.day,
      weekNumber: weekNumber
    })
    setInputBox('block')
    //console.log(date)
  }
  //console.log(date);
  /////////////////////////////////////////////////////////////////////
  /*
  useEffect(() => {
    setDate(date);
  }, [date]);
*/
  return (
    <div id='timetable-wrap'>
      <div className='time-table-head'>
        <button
          id='button-prev'
          onClick={() => {
            countWeek--,
              setWeekNumber(weekNumber - 1),
              setThisWeek(thisWeek - 7)
          }}
        >
          Previous
        </button>
        <div id='date-prev'>
          {yearList[-TotalDays + thisWeek + countWeek + 1].month}{' '}
          {yearList[-TotalDays].year}{' '}
          {yearList[-TotalDays + thisWeek + countWeek].week} Week: {}
        </div>
        <button
          id='button-next'
          onClick={() => {
            countWeek++,
              setWeekNumber(weekNumber + 1),
              setThisWeek(thisWeek + 7)
          }}
        >
          Next
        </button>
      </div>
      <main id='table'>
        <div className='col'>
          <div className='headCell'>Time</div>
          {allTime.map((time, i) => {
            return (
              <div className='divCell' key={`cell_${i}_${time}`}>
                {time}
              </div>
            )
          })}
        </div>

        {days.map((day, numberOfDays) => {
          countHours += 24

          return (
            <div className='col' key={`col_${numberOfDays}_`}>
              <div className='headCell'>
                {dayNameArray[numberOfDays]}{' '}
                {
                  yearList[-TotalDays + thisWeek - dayOfTheWeek + numberOfDays]
                    .date
                }
              </div>

              {hours.map((hour, a) => {
                let bookmark = ''
                let cellId = a + countHours
                let time = allTime[a]
                let dayCorrection = 0
                let adjust = false
                let tdDate = new Date(
                  `${yearList[-TotalDays].year}-${
                    yearList[-TotalDays + thisWeek].monthInt
                  }-${
                    yearList[
                      -TotalDays + thisWeek - dayOfTheWeek + numberOfDays
                    ].date
                  } ${time}`
                )
                let numberOfHours
                let daysBetween = 0
                let checkWeek
                if (startBookings.length > 0) {
                  startBookings.map((booking, i) => {
                    try {
                      checkWeek = weekNumber === allBookings[i].weekNumber
                    } catch (error) {
                      if (error) return
                    }
                    if (
                      stopBookings[i].getDate() ===
                        startBookings[i].getDate() &&
                      checkWeek
                    ) {
                      numberOfHours =
                        stopBookings[i].getHours() - startBookings[i].getHours()
                      for (let b = 0; b < numberOfHours; b++)
                        if (allBookings[i].startHour + b === cellId) {
                          bookmark = 'booked'
                        }
                    }

                    daysBetween =
                      (startBookings[i].getDate() -
                        stopBookings[i].getDate() +
                        1) *
                      -24
                    if (
                      stopBookings[i].getDate() > startBookings[i].getDate() &&
                      checkWeek
                    ) {
                      numberOfHours =
                        24 -
                        startBookings[i].getHours() +
                        daysBetween +
                        stopBookings[i].getHours()
                      for (let b = 0; b < numberOfHours; b++)
                        if (allBookings[i].startHour + b === cellId) {
                          bookmark = 'booked'
                        }
                    }
                  })
                }
                tdDate =
                  yearList[-TotalDays + thisWeek - dayOfTheWeek + numberOfDays]
                    .date
                return (
                  <div
                    key={`cell_${a}_${countHours}`}
                    id={cellId}
                    className={'divCell'}
                    onClick={e => {
                      e.target.style.backgroundColor = '#ff008c'
                      handleTimeClick(
                        yearList[-TotalDays].year,
                        yearList[-TotalDays + thisWeek].monthInt,
                        e.target,
                        tdDate,
                        time,
                        cellId,
                        weekNumber
                      )
                    }}
                  >
                    {bookmark}
                  </div>
                )
              })}
            </div>
          )
        })}
      </main>
    </div>
  )
}

export default NewTable
