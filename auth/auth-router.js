const router = require("express").Router();
const db = require("./auth-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await db.findBy({ username }).first();
    if (user) {
      return res.status(409).json({
        message: "Username not available",
      });
    }
    const newUser = await db.add({
      username,
      password: await bcrypt.hash(password, 13),
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await db.findBy({ username }).first();

    if (!user) {
      return res.status(401).json({
        message: "Invalid username/password",
      });
    }
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const payload = {
      userId: user.id,
      username: user.username,
    };
    res.cookie("token", jwt.sign(payload, process.env.JWT_SECRET));
    res.json({
      message: `Welcome ${username}`,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
