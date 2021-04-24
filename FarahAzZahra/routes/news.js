const express = require('express');
const router = express.Router();
const News = require('../model/News');

//CREATE
router.post('/',async (req,res)=>{
    const newsPost = new News({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        keyword: req.body.keyword
    });
    try{
        const news = await newsPost.save();
        res.json(news);
    }catch(err){
        res.json({message: err});
    }
});

//READ
router.get('/', async (req,res)=>{
    try{
        const news = await News.find()
        res.json(news)
    }catch(err){
        res.json({message: err})
    }
});

//READ by id
router.get('/:newsID', async (req,res)=>{
    try{
        const newsByID = await News.findById({_id: req.params.newsID});
        res.json({data: newsByID});
    }catch(err){
        res.json({message: err})
    }
})

//UPDATE by id
router.put('/:newsID', async (req,res)=>{
    try{
        const newsUpdate = await News.updateOne({_id: req.params.newsID}, {
            title: req.body.title,
            content: req.body.content
        })
        res.json({message: "Data Updated", data: newsUpdate})
    }catch(err){
        res.json({message: err})
    }
})

//DELETE
router.delete('/:newsID', async (req,res)=>{
    try{
        const newsDelete = await News.deleteOne({_id: req.params.newsID})
        res.json({message: "Data deleted", data: newsDelete})
    }catch(err){
        res.json({message: err})
    }
})

//DELETE
router.delete('/', async (req,res)=>{
    try{
        const newsDelete = await News.deleteMany()
        res.json({message: "Data deleted", data: newsDelete});
    }catch(err){
        res.json({message: err})
    }
})

module.exports = router;