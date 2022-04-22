const express = require('express')
const router = express.Router()
const DocData = require('../models/DocData')
const Docs = require('../models/Docs')
const handler = require('../middleware/serverError')
const jwt = require('jsonwebtoken')

router.delete('/', async(req, res)=>{
    try{
        const user = await Docs.find({user :req.user._id})
        const foudn  = allDocuemnts(user)
        await DocData.deleteMany({document: {$in: foudn}})
        await Docs.deleteMany({user: req.body.user})
        return res.send({
            success: true,
            data: ['Deleted All Items From DBS', user, foudn],
        })
    }catch(err){
        handler(err, res, err.message) 
    }
})

const allDocuemnts = (user) =>{
    const documents = user.map((one)=> one._id)
    return documents
}


module.exports = router;