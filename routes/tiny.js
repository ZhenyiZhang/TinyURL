const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');

/*import environment variables */
require('dotenv').config({path: '../process.env'});

/*import mongoose schema*/
const Tiny = require('../model/tiny');

/* post long url, create short url and store in DB */
router.post('', async (req, res) => {
        const longURL = req.body.longURL;

        if(!req.body.longURL) {
            return res.status(400).send('No long URL was found');
        }
        if(!validUrl.is_uri(longURL)) {
            return res.status(400).send('Long URL passed is not valid');
        }

        /*if url has been stored in DB return the object*/
        const url = await Tiny.findOne({longURL: longURL});
        if(url) return res.status(200).json(url);

        /*generate unused urlCode*/
        let URLCode;
        while(true) {
            URLCode = shortId.generate();
            const findTiny = await Tiny.findOne({URLCode: URLCode});
            if(!findTiny) break;
        }

        const newTiny = await new Tiny({
            URLCode: URLCode,
            longURL: longURL,
            shortURL: process.env.SERVER_URL + '/' + URLCode,
            date: Date.now()
        });

        /*Store in database*/
        newTiny.save()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
);

module.exports = router;
