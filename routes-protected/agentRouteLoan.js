const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const loanUrl = process.env.agentUrl + "/loan";
  const req_data = { id: req.user.id };

  axios
    .post(loanUrl, req_data)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Not found" });
    });
});

router.post("/response/farmer/next", async (req, res) => {
  const loanUrl = process.env.agentUrl + "/response/farmer/next";
  const req_data = {
    loan_id: req.body.loan_id,
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

router.post("/response/sme/next", async (req, res) => {
  const loanUrl = process.env.agentUrl + "/response/sme/next";
  const req_data = {
    loan_id: req.body.loan_id,
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

// do same for farmer/reject and sme/reject
router.post("/response/farmer/reject", async (req, res) => {
  const loanUrl = process.env.agentUrl + "/response/farmer/reject";
  const req_data = {
    loan_id: req.body.loan_id,
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

router.post("/response/sme/reject", async (req, res) => {
  const loanUrl = process.env.agentUrl + "/response/sme/reject";
  const req_data = {
    loan_id: req.body.loan_id,
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

router.post("/response/farmer/accept", async (req, res) => {
  const loanUrl = process.env.agentUrl + "/response/farmer/accept";
  const req_data = {
    loan_id: req.body.loan_id,
    amount: req.body.amount,
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

router.post("/response/sme/accept", async (req, res) => {
  const loanUrl = process.env.agentUrl + "/response/sme/accept";
  const req_data = {
    loan_id: req.body.loan_id,
    amount: req.body.amount,
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

module.exports = router;
