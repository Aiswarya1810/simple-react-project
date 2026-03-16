import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js" ; //connects app to mongodb
import Product from "./models/product.model.js"; 
import productRoutes from "./routes/product.route.js"

dotenv.config(); //loads variables from .env file
const app = express(); //creates app

app.use(express.json()); //middleware - allows us to accept json data in the req.body

app.use("/api/products",productRoutes)



app.listen(8000, () => {
    connectDB();
    console.log("server started at http://localhost:8000");
});
