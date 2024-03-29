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
  const updateStatusUrl =
    process.env.adminUrl + "/support/update-ticket/update-status";

  axios
    .post(updateStatusUrl, {
      id: req.user.id,
      ticketId: req.body.ticketId,
      status: req.body.status,
      comment: req.body.comment,
    })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// admin product calls
router.get("/products", (req, res) => {
  const productsUrl = process.env.adminUrl + "/product/get-products";

  axios
    .post(productsUrl, { id: req.user.id })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// req.body = {name, unit, unit_price, tax_amount, image_link}
router.post("/product/add-product", (req, res) => {
  const addProductUrl = process.env.adminUrl + "/product/add-product";

  axios
    .post(addProductUrl, req.body)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// {id, unit_price, tax_amount}
router.post("/product/update-product", (req, res) => {
  const updateProductUrl = process.env.adminUrl + "/product/update-product";

  axios
    .post(updateProductUrl, req.body)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// admin reports
// don't need to send anything
router.get("/reports", (req, res) => {
  const reportsUrl = process.env.adminUrl + "/report/general";

  axios
    .post(reportsUrl, { id: req.user.id })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// req.body = {division_id: 123}
router.post("/reports/division", (req, res) => {
  const divisionReportUrl = process.env.adminUrl + "/report/division";

  axios
    .post(divisionReportUrl, req.body)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// req.body = {district_id: 123}
router.post("/report/district", (req, res) => {
  const districtReportUrl = process.env.adminUrl + "/report/district";

  axios
    .post(districtReportUrl, req.body)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// req.body = {upazila_id: 123}
router.post("/report/upazilla", (req, res) => {
  const upazilaReportUrl = process.env.adminUrl + "/report/upazilla";

  axios
    .post(upazilaReportUrl, req.body)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});

// req.body = {union_id: 123}
router.post("/report/union", (req, res) => {
  const unionReportUrl = process.env.adminUrl + "/report/union";

  axios
    .post(unionReportUrl, req.body)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: "Not found" });
    });
});


module.exports = router;
