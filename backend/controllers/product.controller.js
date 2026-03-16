import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success:true, data: products});

    } catch (error) {
        console.log("error fetching product:", error.message);
        res.status(500).json({success: false, message: "pls provide all fields"});

        
    }
};

export const createProduct = async(req, res) => {
    const product = req.body;  //takes json data sent by the client


    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message: "Please provide all fields "});

    }
    
    const newProduct = new Product(product); //user will send this data

    try{
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct})
        } catch(error){
            console.error("Error in creating product:", error.message);
            res.status(500).json({ success: false, message: "Server error"});

        }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;  //This take id from the URL.
    
   try {
        await Product.findByIdAndDelete(id); //finds the product in MongoDB and deletes it.
        res.status(200).json({ success: true, message: "Product deleted"});

    } catch (error) {
        console.log("error in dlting product:",error.message);
        res.status(404).json({ success: false, message: "Product not found"});
        
    }
};

export const updateProduct = async(req, res) => {
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"invalid product id"});
    }

    try {
       const updateProduct = await Product.findByIdAndUpdate(id, product, {new:true});
       res.status(200).json({success: true, data: updateProduct});
    } catch (error) {
        res.status(500).json({success: false, message: "error"});

        
    }
};