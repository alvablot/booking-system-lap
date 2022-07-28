const uuid = require("uuid");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const db = require("../database.js");
let users;
let token = false;
let activeBooking = {};
/*
const fetchBooksTable = "SELECT * FROM books";
const fetchBooks = "SELECT * FROM books";



const bookBookingId = "UPDATE books";
*/

const fetchBookingsTable = "SELECT * FROM bookings ORDER BY id DESC";
const insertBookingRow = "INSERT INTO bookings (headline, startDate, stopDate, startTime, stopTime, info, user, customer, startHour, weekNumber, room)  VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
  const { headline, startDate, stopDate, startTime, stopTime, info, user, customer, startHour, weekNumber, room } = data;
  //return data;



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

  let TimeConflict = false;

  result = await initTable(fetchBookingsTable);
  result.map((sDate) => {
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


  });
  if (
    reqStartTime.getYear() === dbStartTime.getYear() && 
    reqStopTime.getMonth() <= dbStopTime.getMonth() &&
    reqStartTime.getMonth() >= dbStartTime.getMonth() && 
    reqStopTime.getDate() <= dbStopTime.getDate() &&
    reqStartTime.getDate() >= dbStartTime.getDate() &&
    reqStopTime.getHours() <= dbStopTime.getHours() &&
    reqStartTime.getHours() >= dbStartTime.getHours()
    ) {
    TimeConflict = true;
    }
  if(TimeConflict) return 409

  const query = insertBookingRow;
  db.run(query, [headline, startDate, stopDate, startTime, stopTime, info, user, customer, startHour, weekNumber, room]);
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
  const { headline, startDate, stopDate, startTime, stopTime, info, user, customer, startHour, weekNumber, room } = data;
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
/*
async function borrowedBooks(id) {
  const query = `SELECT * FROM books WHERE user_id = '${id}'`;
  const result = await initTable(query);
  return result;
}

async function getOne() {
  if (!activeBooking.id) return 403;
  const id = activeBooking.id;
  const query = `${fetchTable} WHERE id = '${id}'`;
  let user = await getBooking(query);
  let books = await borrowedBooks(id);
  books = Object.assign(books);
  const result = {
    user,
    books,
  };
  return result;
}

async function addOne(data) {
  const { first_name, last_name, email, password } = data;
  if (!first_name || !last_name || !email || !password) return 400;
  const existingBooking = await getBooking(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  if (existingBooking !== undefined) {
    if (email === existingBooking.email) return 409;
  }
  const query = `${insertRow} (id, first_name, last_name, email, password)  VALUES(?, ?, ?, ?, ?)`;
  db.run(query, [uuid.v4(), first_name, last_name, email, md5(password)]);
  users = initTable(fetchTable);
  return users;
}

async function login(id, data) {
  const { email, password } = data;
  if (!email || !password) return 400;

  const existingBooking = await getBooking(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  if (existingBooking === undefined) return 404;
  const hashedPassword = md5(password);
  const checkPassword = await getBooking(
    `SELECT * FROM users WHERE password = '${hashedPassword}'`
  );
  if (checkPassword === undefined) return 404;

  //////// INLOGGAD
  console.log("Right password");
  token = jwt.sign(
    {
      id: existingBooking.id,
      //username: existingBooking.username,
      email: existingBooking.email,
    },
    process.env.SECRET_KEY
  );
  activeBooking = {
    id: existingBooking.id,
    password: hashedPassword,
  };
  return token;
}

async function lendOne(bookId) {
  const id = activeBooking.id;
  if (!token) return 403;
  if (!bookId) return 404;
  function updateBooking(col, data) {
    db.run(
      `${bookBookingId}
      SET ${col} = ?
      WHERE id = ?`,
      [id, bookId]
    );
  }
  updateBooking("user_id", id);

  const user = getOne(id);
  return user;
}

async function returnOne(bookId) {
  const id = activeBooking.id;
  if (!token) return 403;
  if (!bookId) return 404;
  db.run(
    `
  UPDATE books SET user_id = ?
    WHERE id = ?`,
    ["NULL", bookId]
  );
  const user = getOne(id);
  return user;
}



async function updateOne(id, data) {
  const query = `SELECT * FROM users SET first_name WHERE id = 3`;
  db.run(query, ["Olle"]);
}


*/
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
