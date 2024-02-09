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
  const dashboardUrl = process.env.farmerUrl + "/dashboard";
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

// loan
router.get("/loan", (req, res) => {
  const loanUrl = process.env.farmerUrl + "/loan";
  const req_data = { id: req.user.id, page: 0 };

  axios
    .post(loanUrl, req_data)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Not found" });
    });
});

router.post("/loan", (req, res) => {
  const loanUrl = process.env.farmerUrl + "/loan";
  const req_data = { id: req.user.id, page: req.body.page };

  axios
    .post(loanUrl, req_data)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Not found" });
    });
});

router.post("/loan/request", async (req, res) => {
  const loanUrl = process.env.farmerUrl + "/loan/request";
  const req_data = {
    id: req.user.id,
    min: req.body.min,
    max: req.body.max,
    description: req.body.description,
  };

  axios
    .post(loanUrl, req_data)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// farmer's pov
router.get("/sell/history", (req, res) => {
  // systems pov
  const buyHistoryUrl = process.env.farmerUrl + "/buy/history";
  const req_data = { id: req.user.id };

  axios
    .post(buyHistoryUrl, req_data)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Not found" });
    });
});

// send { tid: 1234 }
router.post("/sell-response/accept", (req, res) => {
  const buyAcceptUrl = process.env.farmerUrl + "/buy/buy-response/accept";
  const req_data = { id: req.body.tid };

  axios
    .post(buyAcceptUrl, req_data)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Internal Server Error" });
    });
});

router.post("/sell-response/reject", (req, res) => {
  const buyRejectUrl = process.env.farmerUrl + "/buy/buy-response/reject";
  const req_data = { id: req.body.tid };

  axios
    .post(buyRejectUrl, req_data)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Internal Server Error" });
    });
});

module.exports = router;
