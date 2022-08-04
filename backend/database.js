const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const uuid = require("uuid");
const md5 = require("md5");
const dbFile = "./.data/bookings.db";
const exists = fs.existsSync(dbFile);

const db = new sqlite3.Database(dbFile, (error) => {
  if (error) {
    //console.error(error.message);
    throw error;
  }

  const bookingStmt = `CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    headline VARCHAR (255),
    startDate DATE,
    stopDate DATE,
    startTime TIME,
    stopTime TIME,
    info TEXT,
    user VARCHAR (255),
    customer VARCHAR (255),
    startHour INTEGRER,
    weekNumber INTEGRER,
    room VARCHAR (255))
  `;

  // if (!exists) {
  db.run(bookingStmt, (error) => {
    if (error) {
      //console.error(error.message);
      //throw error;
    } else {
      const insertBooking = `INSERT INTO bookings (
        headline, 
        startDate,
        stopDate,
        startTime,
        stopTime,
        info,
        user,
        customer,
        startHour,
        weekNumber,
        room
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      db.run(insertBooking, [
        "Booking Headline",
        "2022-01-02",
        "2022-01-02",
        "16:00:00",
        "17:00:00",
        "Information",
        "User",
        "Customer Corp",
        0,
        0,
        "Room",
      ]);
    }
  });

  const userStmt = `CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR (255),
      password VARCHAR (255))
    `;

  // if (!exists) {
  db.run(userStmt, (error) => {
    if (error) {
      //console.error(error.message);
      //throw error;
    } else {
      const insertUser = `INSERT INTO users (
            username, 
            password
          ) VALUES (?, ?)`;
      db.run(insertUser, [
        "Petter",
        "666"
      ]);
    }
  });
  // }
});

module.exports = db;
