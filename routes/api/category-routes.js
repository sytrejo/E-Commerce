const router = require('express').Router();
const { Category, Product }= require('../../models');

router.get('/', (req, res) => {
    Category.findAll({
        include:[
            {
                model: Product,
                attributes: ['id','product_name', 'price', 'stock']
            }
        ]
    })
    .then(dbCategoryData => {
        if (!dbCategoryData){
            res.status(400).json({ message: 'No categories'});    
        }
        res.send(dbCategoryData);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {

    Category.findOne(
        {
            where:{
                id: req.params.id
            },
            include:[
                {
                    model: Product,
                    attributes: [ 'id', 'product_name', 'price', 'stock']
                }
            ]
        }
    )
    .then (dbCategoryData => {
        if (!dbCategoryData) {
            res.status(404).json({message: 'No user id'});
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
    Category.create({
        category_name: req.body.category_name
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
    Category.update(
        req.body, {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbCategoryData => {
        if(!dbCategoryData){
            res.status(404).json({message:'No category gound at this id'});
            return;
        }

        res.json(dbCategoryData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
    Category.destroy({
        truncate: true, cascade: false,
        where: {
            id: req.params.id
        }
    })
    .then(dbCategoryData => {
        if(!dbCategoryData){
            res.status(404).json({message: 'No category at this id'});
            return;
        }
        res.json(dbCategoryData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;