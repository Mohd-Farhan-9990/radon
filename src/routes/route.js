const express = require('express');
const externalModule = require('../logger/logger.js')
const help = require('../util/helper.js')
const format = require('../validator/formatter.js')
const router = express.Router();

router.get('/test-me', function (req, res) {
    // console.log('The constant in logger route has a value '+externalModule.endpoint)
    externalModule.wel()
    help.pda()
    help.pmont()
    help.batch()
    format.tr()
    format.lower()
    format.upper()
    res.send('My first ever api!')
});



module.exports = router;
// adding this comment for no reason