const router = require('express').Router();
const verify = require('../verifyToken');

router.get('/',verify,async (req,res)=>{
    res.json({posts: {title: 'my first post', description: 'random data', user: req.user}});
})

module.exports = router;