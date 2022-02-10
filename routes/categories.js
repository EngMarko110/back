const {Category, SubCategory} = require('../models/category');
const express = require('express');
const parseUrlencoded = express.urlencoded({ extended: true });
const addCategoryMiddleware = require('../utils/middlewares/addCategoryMiddleware');
const addSubCategoryMiddleware = require('../utils/middlewares/addSubCategoryMiddleware');
const router = express.Router();
router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(categoryList);
})

router.get('/:id', async(req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(category);
})



router.post('/', [parseUrlencoded, addCategoryMiddleware], async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})


router.put('/:id',async (req, res)=> {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        { new: true, omitUndefined: true }
    )

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})

router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category) {
            return res.status(200).json({success: true, message: 'the category is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "category not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})
router.get('/:id/subCategories', async (req,res) => {
    const subCategories = await SubCategory.find({ parentCategory: req.params.id });
    if (!subCategories) return res.status(500).json({ message: "The category with the given ID has no sub categories." })
    res.status(200).send(subCategories);
});
router.get("/subCategories/:id", async (req, res) => {
    const subCategories = await SubCategory.findById(req.params.id);
    if (!subCategories) return res.status(500).json({ message: "Sub category is not found" });
    return res.status(200).send(subCategories);
});
router.post("/subCategories/new", [parseUrlencoded, addSubCategoryMiddleware], async (req,res) => {
    let subCategory = new SubCategory({ parentCategory: req.body.parentCategory, name: req.body.name });
    subCategory = await subCategory.save();
    if (!subCategory) return res.status(400).send("the subCategory cannot be created!")
    res.send(subCategory);
});
router.put("/subCategories/edit/:id", async (req, res) => {
    const subCategory = await SubCategory.findByIdAndUpdate(
        req.params.id,
        { parentCategory: req.body.parentCategory, name: req.body.name },
        { new: true }
    );
    if (!subCategory) return res.status(400).send("the subCategory cannot be updated!")
    res.send(subCategory);
});
router.delete("/subCategories/:id", (req, res) => {
    SubCategory.findByIdAndRemove(req.params.id).then(subCategory => {
        if (subCategory) return res.status(200).json({ success: true, message: "the subCategory is deleted!" });
        else return res.status(404).json({ success: false, message: "subCategory not found!" });
    }).catch((err) => res.status(500).json({ success: false, error: err }));
});

module.exports =router;