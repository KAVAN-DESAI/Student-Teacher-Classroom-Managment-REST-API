const router = require('express').Router();
const verify = require('../verifyToken');
const feed = require('./classesFeed/getFeed');

router.get("/classes", verify, feed.classesFeed);
router.post("/files", verify, feed.filesFeed);
router.post("/files/search", verify, feed.filesFeedSearchByName);

module.exports = router;