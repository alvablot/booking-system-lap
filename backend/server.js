require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = 4000;
const cors = require("cors");
//const log = require("./middlewares/log");
//const auth = require("./middlewares/auth");
app.use(cors());
app.use(express.json());

const bookingsRouter = require("./routers/bookings.router");
const usersRouter = require("./routers/users.router");

//app.use(log);
app.use(bookingsRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
