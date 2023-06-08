const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(data);
};

module.exports = (mongoose) => {
  const userSchema = mongoose.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      nama_hewan: String,
      jenis_hewan: String,
      jenis_kelamin: String,
      tanggal_lahir: Date,
      bio: String,
      image: String,
    },
    {
      timestamps: true,
    }
  );
  userSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;

    return object;
  });

  userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" });
    return token;
  };

  const User = mongoose.model("userbio", userSchema);

  return {
    User,
    validate,
  };
};
