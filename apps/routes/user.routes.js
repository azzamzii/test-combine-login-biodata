module.exports = (app) => {
  const biodata = require("../controllers/user.controller");
  const r = require("express").Router();

  app.get("/", (req, res) => {
    res.send("Server Running");
  });

  r.get("/", biodata.findAll);
  r.get("/:id", biodata.show);
  r.put("/:id", biodata.update);
  r.delete("/:id", biodata.delete);

  app.use("/biodata", r);
};
