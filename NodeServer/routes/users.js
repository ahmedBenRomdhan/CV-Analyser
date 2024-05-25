var express = require('express');
const { authenticate } = require('../middlewares/auth');
var router = express.Router();

/* GET users listing. */
router.get('/', authenticate, (req, res)=> {
  res.send('hello Worls');
});

module.exports = router;
