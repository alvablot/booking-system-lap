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
    startYear INTEGER,
    startMonth INTEGER,
    startDate INTEGER,
    startHour INTEGER,
    startMinute INTEGER,
    stopYear INTEGER,
    stopMonth INTEGER,
    stopDate INTEGER,
    stopHour INTEGER,
    stopMinute INTEGER,
    info TEXT,
    user VARCHAR (255),
    customer VARCHAR (255),
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
        startYear,
        startMonth,
        startDate,
        startHour,
        startMinute,
        stopYear,
        stopMonth,
        stopDate,
        stopHour,
        stopMinute,
        info,
        user,
        customer,
        room
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      db.run(insertBooking, [
        "Booking Headline",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "Information",
        "User",
        "Customer Corp",
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
