const uuid = require("uuid");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const db = require("../database.js");
let users;
let token = false;
let activeBooking = {};

const fetchBookingsTable = "SELECT * FROM bookings ORDER BY id DESC";
const insertBookingRow =
  "INSERT INTO bookings (headline, startDate, stopDate, startTime, stopTime, info, user, customer, startHour, weekNumber, room)  VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
const deleteBookingRow = "DELETE FROM bookings WHERE id = ?";
const updateBookingsRow = "UPDATE bookings";

function initTable(query) {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      resolve(rows);
    });
  });
}

function getBooking(query) {
  return new Promise((resolve, reject) => {
    db.get(query, (err, rows) => {
      resolve(rows);
    });
  });
}

async function getAll() {
  const query = fetchBookingsTable;
  const result = await initTable(query);
  return result;
}

async function addOne(data) {
  const {
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
    room,
  } = data;
  //return data;

  const query = insertBookingRow;
  db.run(query, [
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
    room,
  ]);

  let dbStartDates;
  let dbStartYear;
  let dbStartMonth;
  let dbStartDate;
  let dbStartTimes;
  let dbStartTime;
  let dbStartHour;
  let dbStartMinute;

  let reqStartDates;
  let reqStartYear;
  let reqStartMonth;
  let reqStartDate;
  let reqStartTimes;
  let reqStartTime;
  let reqStartHour;
  let reqStartMinute;

  let dbStopDates;
  let dbStopYear;
  let dbStopMonth;
  let dbStopDate;
  let dbStopTimes;
  let dbStopTime;
  let dbStopHour;
  let dbStopMinute;

  let reqStopDates;
  let reqStopYear;
  let reqStopMonth;
  let reqStopDate;
  let reqStopTimes;
  let reqStopTime;
  let reqStopHour;
  let reqStopMinute;
  const monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  result = await initTable(fetchBookingsTable);
  result.map((sDate) => {
    //for (let i = 0; i < result.length; i++) {
    dbStartDates = sDate.startDate;
    dbStartDate = dbStartDates.split("-");
    dbStartYear = parseInt(dbStartDate[0]);
    dbStartMonth = parseInt(dbStartDate[1]);
    dbStartDate = parseInt(dbStartDate[2]);

    dbStartTime = new Date();
    dbStartTime.setYear(dbStartYear);
    dbStartTime.setMonth(dbStartMonth);
    dbStartTime.setDate(dbStartDate);

    dbStartTimes = sDate.startTime;
    dbStartTimes = dbStartTimes.split(":");
    dbStartTime.setHours(parseInt(dbStartTimes[0]));
    dbStartTime.setMinutes(parseInt(dbStartTimes[1]));

    dbStartHour = parseInt(dbStartTime.getHours());
    dbStartMinute = parseInt(dbStartTime.getMinutes());

    reqStartDates = startDate.split("-");
    reqStartYear = parseInt(reqStartDates[0]);
    reqStartMonth = parseInt(reqStartDates[1]);
    reqStartDate = parseInt(reqStartDates[2]);

    reqStartTime = startTime.split(":");
    reqStartHour = parseInt(reqStartTime[0]);
    reqStartMinute = parseInt(reqStartTime[1]);

    reqStartTime = new Date();
    reqStartTime.setYear(reqStartYear);
    reqStartTime.setMonth(reqStartMonth);
    reqStartTime.setDate(reqStartDate);
    reqStartTime.setHours(reqStartHour);
    reqStartTime.setMinutes(reqStartMinute);

    dbStopDates = sDate.stopDate;
    dbStopDate = dbStopDates.split("-");
    dbStopYear = parseInt(dbStopDate[0]);
    dbStopMonth = parseInt(dbStopDate[1]);
    dbStopDate = parseInt(dbStopDate[2]);

    dbStopTime = new Date();
    dbStopTime.setYear(dbStopYear);
    dbStopTime.setMonth(dbStopMonth);
    dbStopTime.setDate(dbStopDate);
    dbStopTimes = sDate.stopTime;
    dbStopTimes = dbStopTimes.split(":");
    dbStopTime.setHours(parseInt(dbStopTimes[0]));
    dbStopTime.setMinutes(parseInt(dbStopTimes[1]));

    dbStopHour = parseInt(dbStopTime.getHours());
    dbStopMinute = parseInt(dbStopTime.getMinutes());

    reqStopDates = stopDate.split("-");
    reqStopYear = parseInt(reqStopDates[0]);
    reqStopMonth = parseInt(reqStopDates[1]);
    reqStopDate = parseInt(reqStopDates[2]);

    reqStopTime = stopTime.split(":");
    reqStopHour = parseInt(reqStopTime[0]);
    reqStopMinute = parseInt(reqStopTime[1]);

    reqStopTime = new Date();
    reqStopTime.setYear(reqStopYear);
    reqStopTime.setMonth(reqStopMonth);
    reqStopTime.setDate(reqStopDate);
    reqStopTime.setHours(reqStopHour);
    reqStopTime.setMinutes(reqStopMinute);

    const dbStartDatesDays = new Date();
    dbStartDatesDays.setYear(reqStartYear);
    dbStartDatesDays.setMonth(reqStartMonth);
    dbStartDatesDays.setDate(reqStartDate);
    const dbStoptDatesDays = new Date();
    dbStoptDatesDays.setYear(reqStopYear);
    dbStoptDatesDays.setMonth(reqStopMonth);
    dbStoptDatesDays.setDate(reqStopDate);

    const difference = dbStoptDatesDays.getTime() - dbStartDatesDays.getTime();
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24));

    if (totalDays > 0) dbStopHour += totalDays * 24;
    //if(dbStartDate > dbStopDate)
    const reqStartMonthNr = monthArray[reqStartMonth - 1];
    const reqStopMonthNr = monthArray[reqStopMonth - 1];
    const dbStartMonthNr = monthArray[dbStartMonth - 1];
    const dbtartMonthNr = monthArray[dbStartMonth - 1];

    if (reqStartDate < reqStopDate)
      reqStopDate = reqStartMonthNr - reqStopDate + reqStartDate + reqStopDate;
    if (dbStartDate < dbStopDate)
      dbStopDate = dbStartMonthNr - dbStopDate + dbStartDate + dbStopDate;

    console.log(reqStopDate);

    if (reqStartYear === dbStartYear && reqStopYear === dbStopYear) {
      if (reqStartMonth >= dbStartMonth && reqStopMonth <= dbStopMonth) {
        if (reqStartDate >= dbStartDate && reqStopDate <= dbStopDate) {
          if (reqStartHour >= dbStartHour && reqStopHour <= dbStopHour) {
            return 404;
          }
        }
      }
    }
  });

  return result;
}

async function deleteOne(id) {
  const query = `${fetchBookingsTable} WHERE id = '${id}'`;
  //let result = await initTable(query);
  //console.log(result);
  //if (result.length < 1) return 404;
  db.run(deleteBookingRow, id, (err) => {});
  users = initTable(fetchBookingsTable);
  return users;
}

async function patchOne(id, data) {
  const {
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
    room,
  } = data;
  async function updateBooking(col, data) {
    const result = db.run(
      `${updateBookingsRow}
      SET ${col} = ?
      WHERE id = ?`,
      [data, id]
    );
    return result;
  }

  if (headline !== undefined) {
    updateBooking("headline", headline);
  }
  if (startDate !== undefined) {
    updateBooking("startDate", startDate);
  }
  if (stopDate !== undefined) {
    updateBooking("stopDate", stopDate);
  }
  if (startTime !== undefined) {
    updateBooking("startTime", startTime);
  }
  if (stopTime !== undefined) {
    updateBooking("stopTime", stopTime);
  }
  if (info !== undefined) {
    updateBooking("info", info);
  }
  if (user !== undefined) {
    updateBooking("user", user);
  }
  if (customer !== undefined) {
    updateBooking("customer", customer);
  }
  if (startHour !== undefined) {
    updateBooking("startHour", startHour);
  }
  if (weekNumber !== undefined) {
    updateBooking("weekNumber", weekNumber);
  }
  if (room !== undefined) {
    updateBooking("room", room);
  }
  const result = await initTable(fetchBookingsTable);
  return result;
}

module.exports = {
  //users,
  getAll,
  addOne,
  deleteOne,
  patchOne,
  /*
  getOne,
  
  login,
  lendOne,
  returnOne,
  
  updateOne,
  
  */
};
