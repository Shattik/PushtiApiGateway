const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  console.log(req.user);
  res.send(
    `Welcome to admin route, ${req.user.id} , your acc type ${req.user.accountType}!`
  );
});

// dashboard
router.get("/dashboard", (req, res) => {
  const dashboardUrl = process.env.adminUrl + "/dashboard";

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

// tickets
// no need to send anything
router.get("/support/inbox", (req, res) => {
  const inboxUrl = process.env.adminUrl + "/support/inbox";

  axios
    .post(inboxUrl, { id: req.user.id })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// send {ticketId: 1234 }
router.post("/support/update-ticket/make-read", (req, res) => {
  const makeReadUrl = process.env.adminUrl + "/support/update-ticket/make-read";

  axios
    .post(makeReadUrl, { id: req.user.id, ticketId: req.body.ticketId })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// send {ticketId: 1234, status: "closed", comment: "lorem ipsum" }
router.post("/support/update-ticket/close-ticket", (req, res) => {
  const updateStatusUrl = process.env.adminUrl + "/support/update-ticket/update-status";

  axios
    .post(updateStatusUrl, { id: req.user.id, ticketId: req.body.ticketId, status: req.body.status, comment: req.body.comment })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// checking the loan history of a user


module.exports = router;
