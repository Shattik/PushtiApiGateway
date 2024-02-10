const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/history/vendor", async (req, res) => {
  const vendorSellHistoryUrl = process.env.agentUrl + "/sell/history/vendor";
  const req_data = { id: req.user.id };
  console.log(vendorSellHistoryUrl);

  axios
    .post(vendorSellHistoryUrl, req_data)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Not found" });
    });
});

// sme history
router.get("/history/sme", async (req, res) => {
  const smeSellHistoryUrl = process.env.agentUrl + "/sell/history/sme";
  const req_data = { id: req.user.id };
  console.log(smeSellHistoryUrl);

  axios
    .post(smeSellHistoryUrl, req_data)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Not found" });
    });
});

// will get the list of vendors under agent
router.get("/request/vendor", async (req, res) => {
  const vendorSellRequestUrl = process.env.agentUrl + "/sell/request/vendor";

  req.body.id = req.user.id;
  axios
    .post(vendorSellRequestUrl, req.body)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// get the list of smes
router.get("/request/sme", async (req, res) => {
  const smeSellRequestUrl = process.env.agentUrl + "/sell/request/sme";

  req.body.id = req.user.id;
  axios
    .post(smeSellRequestUrl, req.body)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// shattik re jiga oy ki dise req body te
router.post("/request/submit/vendor", async (req, res) => {
  const vendorSellRequestSubmitUrl =
    process.env.agentUrl + "/sell/request/submit/vendor";

  axios
    .post(vendorSellRequestSubmitUrl, req.body)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

router.post("/request/submit/sme", async (req, res) => {
  const smeSellRequestSubmitUrl =
    process.env.agentUrl + "/sell/request/submit/sme";

  axios
    .post(smeSellRequestSubmitUrl, req.body)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

module.exports = router;
