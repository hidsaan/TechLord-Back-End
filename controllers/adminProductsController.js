const Product = require("../models/productModel")
const cloudinary= require("../utils/cloudinary")

const addProductController = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        if(title && description && price !==""){

            const image = req.file.path;

            const upload = await cloudinary.uploader.upload(image, {
                folder: "TechLord Admin Products",
            });

            const imageUrl = upload.secure_url;

            if(upload){
                const product= new Product({imageUrl, title, description, price})
                const saveProduct= await product.save();

                if (saveProduct){
                    res.json({ message: "Product Added!" })
                }
                else {
                    res.json({ message: "Failed To Save Product" })
                }
            }
            else{
                res.json({ message: "Please Choose the Correct Image" })
            }
        }
        else {
            res.json({ message: "Fill All Fields" });
        }
    }
    catch (err) {
        console.log(err)
    }
}

const getAllProducts = async (req, res) => {
    try {

        const products= await Product.find()

        if (products){
            res.json({ message: "All Products Are Here", products })
        }
        else{
            res.json({ message: "Error Finding Products" })
        }
    }
    catch (err) {
        console.log(err)

    }
}

const getProduct = async (req, res) => {
   const {productId}= req. query;
    try {

        const product= await Product.findById(productId)

        if (product){
            res.json({ message: "Product Found", product })
        }
        else{
            res.json({ message: "Error Fetching Data" })
        }
    }
    catch (err) {
        console.log(err)

    }
}

module.exports = { addProductController, getAllProducts, getProduct }