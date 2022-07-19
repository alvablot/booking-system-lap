const express = require("express");
const app = express();
const port = 4000;

const model = require("../models/bookings.model");

async function getBookings(req, res) {
  const result = await model.getAll();
  res.json(result);
}

async function postBooking(req, res) {
  let data = req.body;
  
  
  let result = await model.addOne(data);

  res.json(result);
  
  
}

async function deleteBooking(req, res) {
  const id = req.params.id;
  result = await model.deleteOne(id);
  if (result === 404) return res.status(404).send("Inget match på bokning");
  res.json(result);
}

async function patchBooking(req, res) {
  const id = req.params.id;
  const data = req.body;
  const result = await model.patchOne(id, data);
  if (result === 404)
    return res.status(404).json({ error: "Bokning finns ej" });
  res.json(result);
}

/*
async function getBooking(req, res) {
  result = await model.getOne();
  if (result === 403) return res.status(403).send("Du är inte inloggad");
  res.json(result);
}

async function loginBooking(req, res) {
  const url = req.url;
  const id = req.params.id;
  let data = req.body;
  result = await model.login(id, data, url);
  if (result === 400)
    return res.status(400).send("Du måste skicka med email och lösenord");
  if (result === 404) return res.status(404).send("Fel användarnamn/lösenord");
  res.json(result);
}

async function lendBooking(req, res) {
  const bookId = req.body.book_id;
  let result = await model.lendOne(bookId);
  if (result === 403) return res.status(403).send("Du måste vara inloggad");
  if (result === 404) return res.status(404).send("Inget match på bok-id");
  res.json(result);
}

async function returnBooking(req, res) {
  const bookId = req.body.book_id;

  let result = await model.returnOne(bookId);
  if (result === 403) return res.status(403).send("Du måste vara inloggad");
  if (result === 404) return res.status(404).send("Inget match på bok-id");
  res.json(result);
}






*/
module.exports = {
 // getBooking,
 
  getBookings,
  postBooking,
  deleteBooking,
  patchBooking,
   /*
  loginBooking,
  lendBooking,
  returnBooking,
  
  
  
  */
};
