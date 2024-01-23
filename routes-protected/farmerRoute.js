const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  console.log(req.user);
  res.send(
    `Welcome to farmer route, ${req.user.id} , your acc type ${req.user.accountType}!`
  );
});

router.get("/dashboard", (req, res) => {
  const dashboardUrl = process.env.farmerUrl + "/dashboard";
  axios
    .post(dashboardUrl, { id: req.user.id })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Not found" });
    });
});

module.exports = router;
