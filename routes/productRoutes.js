const { Router } = require('express');
const productRouter = Router();
const { createGetProduct, createPostProduct, getProduct, deleteProduct, getProductsFromCategory } = require('../controllers/productController');
const db = require("../db/queries"); // Assuming you have a models directory with your database models

// productRouter.get('/', getProducts); // Route to get all products

productRouter.get('/new', createGetProduct); // Route to get the create product page
productRouter.post('/new', createPostProduct); // Route to handle the form submission for creating a new product
productRouter.get('/delete/:id', deleteProduct); // Route to delete a product
productRouter.get('/:id', getProduct); // Route to get a specific product by ID
productRouter.get('/', getProductsFromCategory); // Route to get products from a specific category

module.exports = productRouter;