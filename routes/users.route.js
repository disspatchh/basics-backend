const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const fileMiddleWare = require("../middlewares/file");

const router = Router();

router.get("/people", usersController.getAllUsers);
router.get("/people/:id", usersController.getUserByID);
router.post("/people/signup",  usersController.addUser);
router.post("/people/signin", usersController.login);
router.patch("/people/image/:id", fileMiddleWare.single("image"), usersController.addAvatar);
router.patch("/people/name", authMiddleware, usersController.changeName);
router.patch("/people/password", authMiddleware, usersController.changePassword);

module.exports = router;