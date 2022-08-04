const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const uuid = require('uuid')
const md5 = require('md5')
const dbFile = './.data/bookings.db'
const exists = fs.existsSync(dbFile)

const db = new sqlite3.Database(dbFile, error => {
  if (error) {
    //console.error(error.message);
    throw error
  }

  const bookingStmt = `CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    headline VARCHAR (255),
    info TEXT,
    user VARCHAR (255),
    room VARCHAR (255),
    customer VARCHAR (255),
    startDateStamp DATETIME,
    stopDateStamp DATETIME,
    startYear INTEGER,
    startMonth INTEGER,
    startDate INTEGER,
    stopYear INTEGER,
    stopMonth INTEGER,
    stopDate INTEGER,
    day INTEGER,
    startHour INTEGER,
    stopHour INTEGER,
    startTime TIME,
    stopTime TIME,
    cellHour INTEGER,
    weekNumber INTEGRER )`

  // if (!exists) {
  db.run(bookingStmt, error => {
    if (error) {
      //console.error(error.message)
      //throw error
    } else {
      const insertBooking = `INSERT INTO bookings (
        headline,
        info,
        user,
        room,
        customer,
        startDateStamp,
        stopDateStamp,
        startYear,
        startMonth,
        startDate,
        stopYear,
        stopMonth,
        stopDate,
        day,
        startHour,
        stopHour,
        startTime,
        stopTime,
        cellHour,
        weekNumber
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      db.run(insertBooking, [
        'Booking Headline',
        'Info',
        'Use',
        'Room1',
        'Customer',
        '2022-08-01',
        '2022-08-01',
        2022,
        8,
        1,
        2022,
        8,
        2,
        0,
        10,
        11,
        '10:00',
        '11:00',
        0,
        30
      ])
    }
  })

  const userStmt = `CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR (255),
      password VARCHAR (255))
    `

  // if (!exists) {
  db.run(userStmt, error => {
    if (error) {
      //console.error(error.message);
      //throw error;
    } else {
      const insertUser = `INSERT INTO users (
            username, 
            password
          ) VALUES (?, ?)`
      db.run(insertUser, ['Petter', '666'])
    }
  })
  // }
})

module.exports = db
