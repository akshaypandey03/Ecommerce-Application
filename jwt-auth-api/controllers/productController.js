const Product = require("../models/Product");


const createProduct = async(req, res) => {
    const { productname, description, price} = req.body;


try{
    const product = new Product({
     productname,
     description,
     price,
     user: req.user._id,
    });

    await product.save();
    res.status(201).json(product);
} catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating product"});
}
};

// get all product for the logged-in user
const getProducts = async (req, res) => {
 try{
    const product = await Product.find({ user: req.user._id});
    res.status(200).json(product);
 } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error fetching products"})
 }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    try{
           const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        if (product.user.toString()!== req.user._id.toString()){
            return res.status(403).json({ message: "You are not authorized to access this product"});
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product "})
    }
};

//Update a product

const updateProduct = async (req, res) => {
    const {name, description, price } = req.body;

    try{
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found"});
        }

        if (product.user.toString() !== req.user._id.toString()){
           return res.status(403).json({ message: "You are not authorized to update this product"});
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;

        await product.save();
        res.status(200).json(product);
    } catch (error){
        console.error(error);
        res.status(500).json({ message: "Error updating product"});
    }
};

// Delete a product

const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        if (!product){
            return res.status(404).json({ message: "Product not found"});
        }

        if (product.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message: "You are not authorized to delete this Product"});
        }

        await product.remove();
        res.status(200).json({message: "Product deleted"});    
    } catch (error){
        console.error(error);
        res.status(500).json({ message: "Error deleting product"});
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};