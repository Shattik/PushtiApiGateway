const express = require('express');
const router = express.Router();
const axios = require("axios");


const regisrationUrl = process.env.authenticationUrl + "/register";

router.get('/', (req, res) => {
    const farmerRegisrationUrl = regisrationUrl + "/farmer";
    res.send( { redirectUrl: farmerRegisrationUrl } );
});

router.get('/farmer', (req, res) => {
    const farmerRegisrationUrl = regisrationUrl + "/farmer";
    
    // console.log(farmerRegisrationUrl);
    axios
        .get(farmerRegisrationUrl)
        .then((response) => {
            res.status(200).send(response.data);
        })
        .catch((error) => {
            res.status(404).send({ message: "Not found" });
        });
});

router.get('/sme', (req, res) => {
    const smeRegisrationUrl = regisrationUrl + "/sme";
    
    axios
        .get(smeRegisrationUrl)
        .then((response) => {
            res.status(200).send(response.data);
        })
        .catch((error) => {
            res.status(404).send({ message: "Not found" });
        });
});

router.get('/vendor', (req, res) => {
    const vendorRegisrationUrl = regisrationUrl + "/vendor";
    
    axios
        .get(vendorRegisrationUrl)
        .then((response) => {
            res.status(200).send(response.data);
        })
        .catch((error) => {
            res.status(404).send({ message: "Not found" });
        });
});


router.post('/district', (req, res) => {
    const districtRegisrationUrl = regisrationUrl + "/district";
    
    axios
        .post(districtRegisrationUrl, req.body)
        .then((response) => {
            res.status(200).send(response.data);
        })
        .catch((error) => {
            res.status(404).send({ message: "Not found" });
        });
});

router.post('/upazilla', (req, res) => {
    const upazillaRegisrationUrl = regisrationUrl + "/upazilla";
    
    axios
        .post(upazillaRegisrationUrl, req.body)
        .then((response) => {
            res.status(200).send(response.data);
        })
        .catch((error) => {
            res.status(404).send({ message: "Not found" });
        });
});


router.post('/union', (req, res) => {
    const unionRegisrationUrl = regisrationUrl + "/union";
    
    axios
        .post(unionRegisrationUrl, req.body)
        .then((response) => {
            res.status(200).send(response.data);
        })
        .catch((error) => {
            res.status(404).send({ message: "Not found" });
        });
});

router.post('/submit', (req, res) => {
    const submitRegisrationUrl = regisrationUrl + "/submit";
    
    axios
        .post(submitRegisrationUrl, req.body)
        .then((response) => {
            res.status(200).send(response.data);
        })
        .catch((error) => {
            res.status(404).send({ message: "Not found" });
        });
});

module.exports = router;
