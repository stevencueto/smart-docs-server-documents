const express = require('express')
const router = express.Router()
const DocData = require('../models/DocData')
const Docs = require('../models/Docs')
const handler = require('../middleware/serverError')



router.get('/user', async(req, res)=>{
    try{
        const doc = await Docs.find({user :req.user._id})
        return res.send({
            success: true,
            data: doc,
        })
    }catch(err){
        handler(err, res, err.message) 
    }
})


router.get('/doc/:id', async(req, res)=>{
    try{
        const doc = await Docs.findById(req.params.id)
        return res.send({
            success: true,
            data: doc,
        })
    }catch(err){
        handler(err, res, err.message) 
    }
})

router.post('/', async(req, res)=>{
    try{
        const data = await DocData.create({data: {}})
        req.body.data = data._id
        req.body.user = req.user._id
        console.log(req.body)
        const doc = await Docs.create(req.body)
        console.log(doc)
        await DocData.findByIdAndUpdate(data.id, {document: doc._id})
        return res.send({
            success: true,
            data: doc,
        })
    }catch(e){
        handler(e, res, e.message)
    }
})

router.put('/:id', async(req, res)=>{
    id = req.params.id
    try{
        const doc = await Docs.findByIdAndUpdate(id, req.body)
        return res.send({
            success: true,
            data: doc,
        })
    }catch(err){
        handler(err, res, err.message) 
    }
})


router.delete('/:id', async(req, res)=>{
    try{
        await Docs.findByIdAndDelete(req.params.id)
        await DocData.findByIdAndDelete(req.body.data)
        return res.send({
            success: true,
            data: 'Deleted From DBS',
        })
    }catch(err){
        handler(err, res, err.message) 
    }
})

module.exports = router;