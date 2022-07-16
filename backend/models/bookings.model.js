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
const insertBookingRow =
  "INSERT INTO bookings (headline, start, stop, info, user, customer, room)  VALUES(?, ?, ?, ?, ?, ?, ?)";
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
  const { headline, start, stop, info, user, customer, room } = data;
  //return data;
  /*
  if (!first_name || !last_name || !email || !password) return 400;
  const existingBooking = await getBooking(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  if (existingBooking !== undefined) {
    if (email === existingBooking.email) return 409;
  }
   */
  const query = insertBookingRow;
  db.run(query, [headline, start, stop, info, user, customer, room]);
  result = initTable(fetchBookingsTable);
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
  const { headline, start, stop, info, user, customer, room } = data;
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
  if (start !== undefined) {
    updateBooking("start", start);
  }
  if (stop !== undefined) {
    updateBooking("stop", stop);
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
