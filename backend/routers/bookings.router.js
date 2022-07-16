const express = require("express");
const bookingsController = require("../controllers/bookings.controller");

const bookingsRouter = express.Router();

bookingsRouter.get("/bookings", bookingsController.getBookings);
bookingsRouter.post("/booking", bookingsController.postBooking);
bookingsRouter.delete("/booking/:id", bookingsController.deleteBooking);
bookingsRouter.patch("/booking/:id", bookingsController.patchBooking);
/*
bookingsRouter.get("/me", bookingsController.getBooking);
bookingsRouter.post("/auth/register", bookingsController.postBooking);


bookingsRouter.post("/auth/login", bookingsController.loginBooking);
bookingsRouter.post("/bookings/lend", bookingsController.lendBooking);
bookingsRouter.post("/bookings/return", bookingsController.returnBooking);
//bookingsRouter.patch("/auth/login", bookingsController.loginBorrower);
*/
module.exports = bookingsRouter;
