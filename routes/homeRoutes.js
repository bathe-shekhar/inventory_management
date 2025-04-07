const { Router } = require('express');
const homeRouter = Router();
const { getHomePage } = require('../controllers/homeController');

// Route to get the home page
homeRouter.get('/', getHomePage);

module.exports = homeRouter;
// This code sets up a router for the home page of an Express application. It imports the necessary modules and defines a route that responds to GET requests at the root URL ('/') by calling the `getHomePage` function from the `homeController`. Finally, it exports the router for use in other parts of the application.