const express = require('express');
const router = express.Router();
const Tiny = require('../model/tiny');

/* GET home page. */
router.get('/:URLCode', async(req, res) => {
  const result = await Tiny.findOne({
    URLCode: req.params.URLCode
  });
  if(result) {
    return res.redirect(result.longURL);
  }
  else {
    return res.status(404).send('URL not found');
  }
});

module.exports = router;
