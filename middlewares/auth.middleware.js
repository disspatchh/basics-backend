const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Нет доступа" });
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    res.status(401).json({ error: "Неверный тип токена" });
  }

  try {
    req.user = await jwt.verify(token, process.env.SECRET_KEY);
    // console.log(req.user);
    next();
  } catch (e) {
    res.status(401).json({ error: "Ошибка " + e.toString() });
  }
};
