const router = require('express').Router();

router.get('/',async (req,res)=>{
    res.json({message: 'This is Kavan Desai Rest API Assignment', url: {register: '/api/user/register'}});
})

module.exports = router;