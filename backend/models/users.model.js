const uuid = require("uuid");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const db = require("../database.js");
let users;
let token = false;
let activeUser = {};
/*
const fetchBooksTable = "SELECT * FROM books";
const fetchBooks = "SELECT * FROM books";



const bookUserId = "UPDATE books";
*/

const fetchUsersTable = "SELECT * FROM users ORDER BY id DESC";
const insertUserRow =
  "INSERT INTO users (headline, start, stop, info, user, customer, room)  VALUES(?, ?, ?, ?, ?, ?, ?)";
const deleteUserRow = "DELETE FROM users WHERE id = ?";
const updateUsersRow = "UPDATE users";

function initTable(query) {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      resolve(rows);
    });
  });
}

function getUser(query) {
  return new Promise((resolve, reject) => {
    db.get(query, (err, rows) => {
      resolve(rows);
    });
  });
}

async function getAll() {
  const query = fetchUsersTable;
  const result = await initTable(query);
  return result;
}
/*
async function addOne(data) {
  const { headline, start, stop, info, user, customer, room } = data;
  //return data;
  
  if (!first_name || !last_name || !email || !password) return 400;
  const existingUser = await getUser(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  if (existingUser !== undefined) {
    if (email === existingUser.email) return 409;
  }
 
  const query = insertUserRow;
  db.run(query, [headline, start, stop, info, user, customer, room]);
  result = initTable(fetchUsersTable);
  return result;
}

async function deleteOne(id) {
  const query = `${fetchUsersTable} WHERE id = '${id}'`;
  let result = await initTable(query);
  if (result.length < 1) return 404;
  db.run(deleteUserRow, id, (err) => {});
  users = initTable(fetchUsersTable);
  return users;
}

async function patchOne(id, data) {
  const { headline, start, stop, info, user, customer, room } = data;
  async function updateUser(col, data) {
    const result = db.run(
      `${updateUsersRow}
      SET ${col} = ?
      WHERE id = ?`,
      [data, id]
    );
    return result;
  }

  if (headline !== undefined) {
    updateUser("headline", headline);
  }
  if (start !== undefined) {
    updateUser("start", start);
  }
  if (stop !== undefined) {
    updateUser("stop", stop);
  }
  if (info !== undefined) {
    updateUser("info", info);
  }
  if (user !== undefined) {
    updateUser("user", user);
  }
  if (customer !== undefined) {
    updateUser("customer", customer);
  }
  if (room !== undefined) {
    updateUser("room", room);
  }
  const result = await initTable(fetchUsersTable);
  return result;
}

async function borrowedBooks(id) {
  const query = `SELECT * FROM books WHERE user_id = '${id}'`;
  const result = await initTable(query);
  return result;
}

async function getOne() {
  if (!activeUser.id) return 403;
  const id = activeUser.id;
  const query = `${fetchTable} WHERE id = '${id}'`;
  let user = await getUser(query);
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
  const existingUser = await getUser(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  if (existingUser !== undefined) {
    if (email === existingUser.email) return 409;
  }
  const query = `${insertRow} (id, first_name, last_name, email, password)  VALUES(?, ?, ?, ?, ?)`;
  db.run(query, [uuid.v4(), first_name, last_name, email, md5(password)]);
  users = initTable(fetchTable);
  return users;
}

async function login(id, data) {
  const { email, password } = data;
  if (!email || !password) return 400;

  const existingUser = await getUser(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  if (existingUser === undefined) return 404;
  const hashedPassword = md5(password);
  const checkPassword = await getUser(
    `SELECT * FROM users WHERE password = '${hashedPassword}'`
  );
  if (checkPassword === undefined) return 404;

  //////// INLOGGAD
  console.log("Right password");
  token = jwt.sign(
    {
      id: existingUser.id,
      //username: existingUser.username,
      email: existingUser.email,
    },
    process.env.SECRET_KEY
  );
  activeUser = {
    id: existingUser.id,
    password: hashedPassword,
  };
  return token;
}

async function lendOne(bookId) {
  const id = activeUser.id;
  if (!token) return 403;
  if (!bookId) return 404;
  function updateUser(col, data) {
    db.run(
      `${bookUserId}
      SET ${col} = ?
      WHERE id = ?`,
      [id, bookId]
    );
  }
  updateUser("user_id", id);

  const user = getOne(id);
  return user;
}

async function returnOne(bookId) {
  const id = activeUser.id;
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
  /*
  addOne,
  deleteOne,
  patchOne,
  
  getOne,
  
  login,
  lendOne,
  returnOne,
  
  updateOne,
  
  */
};
