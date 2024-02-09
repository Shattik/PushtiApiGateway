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

// vendors pov
router.get("/buy/history", (req, res) => {
  // system's pov
  const buyUrl = process.env.vendorUrl + "/sell/history";
  console.log(buyUrl);
  console.log(req.user.id);
  axios
    .post(buyUrl, { id: req.user.id })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(501).send({ message: "Internal Server Error" });
    });
});

// send { tid: 1234 }
router.post("/buy-response/accept", (req, res) => {
  const buyUrl = process.env.vendorUrl + "/sell-response/accept";

  axios
    .post(buyUrl, { id: req.body.tid })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(501).send({ message: "Intenal Server Error" });
    });
});

router.post("/buy-response/reject", (req, res) => {
  const buyUrl = process.env.vendorUrl + "/sell-response/reject";

  axios
    .post(buyUrl, { id: req.body.tid })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(501).send({ message: "Internal Server Error" });
    });
});

module.exports = router;
