import express from "express";
const router = express.Router();

app.get("/", getProducts);
app.post("/", createProduct);
app.delete("/:id", deleteProduct);
app.put("/:id",  updateProduct);

export default router;