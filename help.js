var express = require('express');
var router = express.Router();
router.get('/about-me', function(req, res) {
 res.send('About me page');
});
router.get('/how-to-use', function (req, res) {
 res.send('How to use');
});
module.exports = router;
ז