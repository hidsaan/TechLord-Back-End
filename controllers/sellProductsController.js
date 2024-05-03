const Soldproduct = require("../models/soldProductModel");
const cloudinary = require("../utils/cloudinary");

const sellProductController = async (req, res) => {
  try {
    const { image, name, description, price, usedfor, condition } = req.body;

    if (
      name !== "" &&
      description !== "" &&
      price !== "" &&
      usedfor !== "" &&
      condition !== ""
    ) {
      // const image = req.file.path;
      if (image) {
        const upload = await cloudinary.uploader.upload(image, {
          folder: "TechLord Sold Products",
        });
        const imageUrl = upload.secure_url;

        if (upload) {
          const newproduct = new Soldproduct({
            imageUrl,
            name,
            description,
            price,
            usedfor,
            condition,
          });
          await newproduct.save();
          res.json({message : "Product Saved!"})
  
          
        } else {
          res.json({ message: "Cloudinary error" });
        }
      } else {
        res.json({ message: "Fill All Fields" });
      }


      } else {
        res.json({ message: "Select image!" });
      }

   
  } catch (err) {
    console.log(err);
  }
};

const resellProducts = async (req, res) => {
  try {
    const resellproducts = await Soldproduct.find();

    if (resellproducts) {
      res.json({ message: "All Products Are Here", resellproducts });
    } else {
      res.json({ message: "Error Fetching Products" });
    }
  } catch (err) {
    console.log(err);
  }
};

const resellProduct = async (req, res) => {
  const { productId } = req.query;
  try {
    const product = await Soldproduct.findById(productId);

    if (product) {
      res.json({ message: "Product Found", product });
    } else {
      res.json({ message: "Error Fetching Data" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sellProductController, resellProducts, resellProduct };
