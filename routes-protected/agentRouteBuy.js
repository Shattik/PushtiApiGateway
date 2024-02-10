const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/history/farmer", async (req, res) => {
  const farmerBuyHistoryUrl = process.env.agentUrl + "/buy/history/farmer";
  const req_data = { id: req.user.id };
  console.log(farmerBuyHistoryUrl);

  axios
    .post(farmerBuyHistoryUrl, req_data)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Not found" });
    });
});

router.get("/history/sme", async (req, res) => {
  const smeBuyHistoryUrl = process.env.agentUrl + "/buy/history/sme";
  const req_data = { id: req.user.id };
  console.log(smeBuyHistoryUrl);

  axios
    .post(smeBuyHistoryUrl, req_data)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Not found" });
    });
});

// will get the list of farmers under agent
router.get("/request/farmer", async (req, res) => {
  const farmerBuyRequestUrl = process.env.agentUrl + "/buy/request/farmer";

  req.body.id = req.user.id;
  axios
    .post(farmerBuyRequestUrl, req.body)
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
  const smeBuyRequestUrl = process.env.agentUrl + "/buy/request/sme";

  req.body.id = req.user.id;
  axios
    .post(smeBuyRequestUrl, req.body)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// will get the cool infos of farmer, send { farmer_nid: "123" }
router.post("/request/info/farmer", async (req, res) => {
  const farmerInfoRequestUrl =
    process.env.agentUrl + "/buy/request/info/farmer";

  const farmer_nid = req.body.farmer_nid;

  axios
    .post(farmerInfoRequestUrl, { farmer_nid })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// will get the cool infos of smes, send { farmer_nid: "123" }
router.post("/request/info/sme", async (req, res) => {
  const smeInfoRequestUrl = process.env.agentUrl + "/buy/request/info/sme";

  const sme_nid = req.body.sme_nid;

  axios
    .post(smeInfoRequestUrl, { sme_nid })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// bhai shattik onek genjam korse, ore jiga ki kora lagbe
router.post("/request/submit/farmer", async (req, res) => {
  const farmerBuySubmitReq =
    process.env.agentUrl + "/buy/request/submit/farmer";

  req.body.buyReq.agentId = req.user.id;

  axios
    .post(farmerBuySubmitReq, req.body)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

router.post("/request/submit/sme", async (req, res) => {
  const smeBuySubmitReq = process.env.agentUrl + "/buy/request/submit/sme";

  req.body.buyReq.agentId = req.user.id;

  axios
    .post(smeBuySubmitReq, req.body)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

module.exports = router;
