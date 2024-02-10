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


router.use("/loan", agentLoanRouter);
router.use("/buy", agentBuyRouter);
router.use("/sell", agentSellRouter);

module.exports = router;
