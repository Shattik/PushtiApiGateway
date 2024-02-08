const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  console.log(req.user);
  res.send(
    `Welcome to farmer route, ${req.user.id} , your acc type ${req.user.accountType}!`
  );
});

// dashboard
router.get("/dashboard", (req, res) => {
  const dashboardUrl = process.env.vendorUrl + "/dashboard";
  console.log(dashboardUrl);
  console.log(req.user.id);
  axios
    .post(dashboardUrl, { id: req.user.id })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});


// inventorry viewing
router.get("/inventory", (req, res) => {
  const inventoryUrl = process.env.vendorUrl + "/inventory";
  console.log(inventoryUrl);
  console.log(req.user.id);
  axios
    .post(inventoryUrl, { id: req.user.id })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

module.exports = router;
