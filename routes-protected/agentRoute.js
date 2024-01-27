const express = require("express");
const router = express.Router();
const agentLoanRouter = require("./agentRouteLoan");
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


router.use("/loan", agentLoanRouter);


module.exports = router;
