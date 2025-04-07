const db = require("../db/queries"); // Assuming you have a models directory with your database models


async function createGetProduct(req, res) {
    console.log("inside createGetProduct");

    const categories = await db.getAllCategories(); // Fetch all categories for the dropdown

    res.render("createProduct", { title: "Create Product", categories: categories });
}


async function createPostProduct(req, res) {
    const { product_name, category_id } = req.body;
    // Assuming you have a function to save the product to the database
    await db.insertProduct(product_name, category_id);
    res.redirect("/");
}

async function getProduct(req, res) {

    console.log("inside createGetProduct");
    console.log("req.params: ", req.params);
    const productId = req.params.id;
    const product = await db.getProductById(productId);

    const categories = await db.getAllCategories(); // Fetch all categories for the dropdown
    categories.unshift({ category_id: 0, category_name: 'All Products' });

    if (!product) {
        return res.status(404).send("Product not found");
    }
    const category = await db.getCategoryName(product.product_category); // Fetch the category for the product
    console.log("category: ", category);

    res.render("viewSingleProduct", { title: "Product Details", product: product, category: category, categories: categories });
}

async function getProductsFromCategory(req, res) {

    let params = new URLSearchParams(req.url.split("?")[1]);
    console.log("params: ", params);

    const catId = params.get("category"); // Get the category ID from the request parameters


    console.log(catId);

    if (catId == 0 || catId == null) {
        const products = await db.getAllProducts(); // Fetch all products if category ID is 0
        const categories = await db.getAllCategories(); // Fetch all categories for the dropdown
        categories.unshift({ category_id: 0, category_name: 'All Products' });
        res.render("index", { title: "Inventory Management System", products: products, categories: categories });
    }
    else {
        const products = await db.getProductsFromCategory(catId); // Fetch products from the specified category
        const categories = await db.getAllCategories(); // Fetch all categories for the dropdown
        categories.unshift({ category_id: 0, category_name: 'All Products' });
        res.render("index", { title: "Inventory Management System", products: products, categories: categories });
    }

}


async function deleteProduct(req, res) {
    const productId = req.params.id;
    await db.deleteProduct(productId); // Assuming you have a function to delete the product from the database
    res.redirect("/"); // Redirect to the products page after deletion
}

module.exports = {
    createGetProduct,
    createPostProduct,
    getProductsFromCategory,
    deleteProduct,
    getProduct,
};