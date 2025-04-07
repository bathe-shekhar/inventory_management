const { Router } = require('express');

const categoryRouter = Router();
const { createGetCategory, createPostCategory, getCategory, deleteCategory } = require('../controllers/categoryController');

console.log("inside categoryRoutes.js");

// Route to get the create category page
categoryRouter.get('/new', createGetCategory);
// Route to handle the form submission for creating a new category
categoryRouter.post('/new', createPostCategory);
categoryRouter.get('/delete/:id', deleteCategory); // Route to delete a category
// Route to get a specific category by ID
categoryRouter.get('/:id', getCategory);


module.exports = categoryRouter;
// This code sets up a router for handling category-related routes in an Express application. It imports the necessary modules and defines two routes: one for rendering the category creation page and another for handling the form submission to create a new category. Finally, it exports the router for use in other parts of the application.