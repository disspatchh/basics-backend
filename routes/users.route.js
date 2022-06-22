const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const fileMiddleWare = require("../middlewares/file");

const router = Router();

router.get("/people", usersController.getAllUsers);
router.get("/people/:id", usersController.getUserByID);
router.post("/people/signup", fileMiddleWare.single("image"), usersController.addUser);
router.post("/people/signin", usersController.login);

module.exports = router;