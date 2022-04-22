const express = require('express')
const router = express.Router()
const DocData = require('../models/DocData')
const Docs = require('../models/Docs')
const handler = require('../middleware/serverError')



router.get('/user/:id', async(req, res)=>{
    try{
        const doc = await Docs.find({user :req.params.id})
        return req.sed({
            success: true,
            data: doc,
        })
    }catch(err){
        handler(err, res, err.message) 
    }
})


router.get('/doc/:id', async(req, res)=>{
    try{
        const doc = await DocData.findById(req.params.id)
        return req.send({
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
        const doc = await Docs.create(req.body)
        return res.send({
            success: true,
            data: doc,
        })
    }catch(e){
        handler(e, res, e.message)
    }
})

router.put('/:id', async(req, res)=>{
    try{
        const doc = await DocData.findByIdAndUpdate(req.params.id, req.body, {new:true})
        return req.send({
            success: true,
            data: doc,
        })
    }catch(err){
        handler(err, res, err.message) 
    }
})


router.delete('/:id', async(req, res)=>{
    try{
        await DocData.findByIdAndDelete(req.params.id)
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