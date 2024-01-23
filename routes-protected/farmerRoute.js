const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.user);
    res.send(`Welcome to farmer route, ${req.user.nid} , your acc type ${req.user.accountType}!`);
});

module.exports = router;
