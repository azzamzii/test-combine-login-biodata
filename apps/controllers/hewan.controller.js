const db = require("../models");
const { User } = db.hewan;

exports.create = (req, res) => {
  req.body.tanggal_lahir = new Date(req.body.tanggal_lahir);
  if (req.file) {
    req.body.image = req.file.path;
  }
  User.create(req.body)
    .then(() => res.status(200).send({ status: "success", message: "Data berhasil disimpan" }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  User.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.show = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;

  req.body.tanggal_lahir = new Date(req.body.tanggal_lahir);

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ status: "error", message: "Cannot update data" });
      }
      res.status(200).send({ status: "success", message: "Data succcesfully update" });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ status: "error", message: "Cannot delete data" });
      }
      res.status(200).send({ status: "success", message: "Data succcesfully delete" });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
