const Product = require("../models/Product");

const createProduct = async(req, res) => {
    const { name, description, price} = req.body;


try{
    const product = new Product({
     productname,
     description,
     price,
     user: req.user._id,
    });

    await product.save();
    res.status(201).json(product);
}

};