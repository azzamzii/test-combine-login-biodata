const router = require("express").Router();
const { hewan } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = hewan.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await hewan.User.findOne({ email: req.body.email });
    if (user) return res.status(409).send({ message: "User with given email already exist" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new hewan.User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created succesfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
