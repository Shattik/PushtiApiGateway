const express = require("express");
const router = express.Router();
const agentLoanRouter = require("./agentRouteLoan");
const agentBuyRouter = require("./agentRouteBuy");
const agentSellRouter = require("./agentRouteSell");
const axios = require("axios");

router.get("/", (req, res) => {
  console.log(req.user);
  res.send(
    `Welcome to agent route, ${req.user.id} , your acc type ${req.user.accountType}!`
  );
});

// dashboard
router.get("/dashboard", (req, res) => {
  const dashboardUrl = process.env.agentUrl + "/dashboard";
  console.log(dashboardUrl);
  axios
    .post(dashboardUrl, { id: req.user.id })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Not found" });
    });
});

router.get("/inventory", (req, res) => {
  const inventoryUrl = process.env.agentUrl + "/inventory";
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

// request body {id: req.user.id, account_type: req.user.accountType}
router.get("/leaderboard", (req, res) => {
  const leaderboardUrl = process.env.agentUrl + "/leaderboard";
  console.log(leaderboardUrl);
  console.log(req.user.id);
  axios
    .post(leaderboardUrl, {
      id: req.user.id,
      account_type: req.user.accountType,
    })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// support ticket
router.get("/inbox", (req, res) => {
  const inboxUrl = process.env.agentUrl + "/support/inbox";
  const req_data = { id: req.user.id };

  axios
    .post(inboxUrl, req_data)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Not found" });
    });
});

// request body {subject: , details:}
router.post("/send-ticket", (req, res) => {
  const sendTicketUrl = process.env.agentUrl + "/support/send-ticket";
  
  req.body.userId = req.user.id;

  axios
    .post(sendTicketUrl, req.body)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

router.use("/loan", agentLoanRouter);
router.use("/buy", agentBuyRouter);
router.use("/sell", agentSellRouter);

module.exports = router;
