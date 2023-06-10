const db = require("../models");
const { User } = db.bio;

exports.findAll = (req, res) => {
  User.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// exports.show = (req, res) => {
//   const id = req.params.id;

//   User.findById(id)
//     .then((data) => res.status(200).send(data))
//     .catch((err) => res.status(500).send({ message: err.message }));
// };
exports.show = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      let imageUrl;
      if (!data || !data.image) {
        // Provide a default photo URL
        imageUrl = `${req.protocol}://${req.get("host")}/default-photo.jpg`;
      } else {
        // Construct the image URL
        imageUrl = `${req.protocol}://${req.get("host")}/${data.image}`;
        data.image = imageUrl
      }

      res.status(200).send(data);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

//const imageUrl = `${req.protocol}://${req.get("host")}/${data.image}`;
exports.update = (req, res) => {
  const id = req.params.id;
  if (req.file) {
    req.body.image = req.file.path;
  }

  req.body.tanggal_lahir = new Date(req.body.tanggal_lahir);

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ status: "error", message: "Cannot update data" });
      }
      return res.status(200).send({ status: "success", message: "Data successfully updated" });
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
