const db = require('../db/queries');

async function getHomePage(req, res) {

    const categories = await db.getAllCategories();
    categories.unshift({ category_id: 0, category_name: 'All Products' });
    console.log(categories);

    const products = await db.getAllProducts();
    try {
        res.render('index', {
            title: 'Inventory Management System',
            categories: categories,
            products: products
        });
    } catch (error) {
        console.error('Error rendering home page:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getHomePage,
};