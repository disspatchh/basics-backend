const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

module.exports.usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();

      res.json(users);
    } catch (e) {
      res.status(401).json({ error: "Ошибка " + e.toString() });
    }
  },

  getUserByID: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      res.json(user);
    } catch (e) {
      res.status(401).json({ error: "Ошибка " + e.toString() });
    }
  },

  addUser: async (req, res) => {
    try {
      const { name, email, password, date, gender, image } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      console.log(1);
      console.log(req.file);
      const defaultImage =
        "images/user/default/0604222022-114408_526-blank-avatar.jpg";

      // const user = await User.create({
      //   name,
      //   email,
      //   password: hash,
      //   date,
      //   gender,
      // });


      // res.json(user);
    } catch (e) {
      res.status(401).json({ error: "Ошибка " + e.toString() });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (!candidate) {
        res.status(401).json({ error: "Неверный логин или пароль!" });
      }

      const valid = await bcrypt.compare(password, candidate.password);
      if (!valid) {
        res.status(401).json({ error: "Неверный логин или пароль!" });
      }

      const payload = {
        id: candidate._id,
      };

      const token = await jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "28d",
      });

      res.json({
        token,
        id: candidate._id,
      });
    } catch (e) {
      res.status(401).json({ error: "Ошибка " + e.toString() });
    }
  },
};
