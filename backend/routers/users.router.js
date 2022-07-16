const express = require("express");
const usersController = require("../controllers/users.controller");

const usersRouter = express.Router();

usersRouter.get("/users", usersController.getUsers);
/*usersRouter.post("/booking", usersController.postUser);
usersRouter.delete("/booking/:id", usersController.deleteUser);
usersRouter.patch("/booking/:id", usersController.patchUser);

usersRouter.get("/me", usersController.getUser);
usersRouter.post("/auth/register", usersController.postUser);


usersRouter.post("/auth/login", usersController.loginUser);
usersRouter.post("/users/lend", usersController.lendUser);
usersRouter.post("/users/return", usersController.returnUser);
//usersRouter.patch("/auth/login", usersController.loginBorrower);
*/
module.exports = usersRouter;
