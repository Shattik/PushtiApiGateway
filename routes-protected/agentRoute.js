const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.user);
    res.send(`Welcome to agent route, ${req.user.id} , your acc type ${req.user.accountType}!`);
});

module.exports = router;