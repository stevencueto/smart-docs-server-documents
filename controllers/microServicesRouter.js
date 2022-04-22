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
        const user = await Docs.find({user : {$in: [id]}})
        const find  = allDocuemnts(user)
        await Docs.deleteMany({user: req.body.user})
        await DocData.deleteMany({document: {$in: find}})
        return res.send({
            success: true,
            data: ['Deleted All Items From DBS', find],
        })
    }catch(err){
        console.log('axios')
        res.send({success: false, message: err.message}) 
    }
})

function allDocuemnts (data){
    const documents = data.map((one)=> one._id)
    console.log(documents)
    return documents
}


module.exports = router;