const express = require('express')
const router = express.Router()
const DocData = require('../models/DocData')
const Docs = require('../models/Docs')
const mongoose = require('mongoose')
const transId = (id) =>{
    mongoose.Types.ObjectId(id)
}
router.delete('/', async(req, res)=>{
    const id = transId(req.user._id)
    try{
        const user = await Docs.find({user :id})
        const find  = allDocuemnts(user)
        await DocData.deleteMany({document: {$in: find}})
        await Docs.deleteMany({user: req.body.user})
        return res.send({
            success: true,
            data: ['Deleted All Items From DBS', user, find],
        })
    }catch(err){
        console.log('axios')
        res.send({success: false, message: "axios"}) 
    }
})

const allDocuemnts = (user) =>{
    const documents = user.map((one)=> transId(one._id))
    return documents
}


module.exports = router;