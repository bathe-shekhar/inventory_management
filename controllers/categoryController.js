const db = require("../db/queries"); // Assuming you have a models directory with your database models
const { body, validationResult } = require("express-validator");

const alphaErr = "must contain only characters.";
const lengthErr = "must be between 1 to 20 characters";

const validateCategory = [
    body("category_name")
        .isLength({ min: 1, max: 20 }).withMessage(`Category name ${lengthErr}`)
        .isAlpha().withMessage(`Category name ${alphaErr}`)
];

async function createGetCategory(req, res) {
    const categories = await db.getAllCategories();
    categories.unshift({ category_id: 0, category_name: 'All Products' });

    // console.log("inside createGetCategory");
    res.render("createCategory", { title: "Create Category", categories: categories });
}
const createPostCategory = [
    validateCategory,
    async (req, res) => {

        const errors = validationResult(req);
        const categories = await db.getAllCategories();
        categories.unshift({ category_id: 0, category_name: 'All Products' });

        if (!errors.isEmpty()) {
            return res.status(400).render("createCategory", {
                title: "Create Category",
                errors: errors.array(),
                categories: categories,
            });
        }

        const { category_name } = req.body;
        // Assuming you have a function to save the category to the database
        await db.insertCategory(category_name);
        res.redirect("/");
    }
];

async function getCategory(req, res) {

    const categoryId = req.params.id;
    const categories = await db.getAllCategories();
    const categoryProductsCount = await db.getCategoryProductsCount(categoryId);

    categories.unshift({ category_id: 0, category_name: 'All Products' });
    const category = await db.getCategoryById(categoryId);
    if (!category) {
        return res.status(404).send("Category not found");
    }
    res.render("viewCategory", { title: "Category Details", category: category, categoryProductsCount: categoryProductsCount, categories: categories });
}

async function deleteCategory(req, res) {
    const categoryId = req.params.id;

    const categories = await db.getAllCategories();
    categories.unshift({ category_id: 0, category_name: 'All Products' });

    const categoryProductsCount = await db.getCategoryProductsCount(categoryId); // Assuming you have a function to get the count of products in the category
    console.log("categoryProductsCount: ", categoryProductsCount);
    // Check if the category has products associated with it

    if (categoryProductsCount > 0) {
        res.render("errorMessage", { title: "Error", categories: categories, message: "Cannot delete category with products associated with it" });
        // return res.status(400).send("Cannot delete category with products associated with it");
    }

    await db.deleteCategory(categoryId); // Assuming you have a function to delete the category from the database
    res.redirect("/"); // Redirect to the categories page after deletion
}

module.exports = {
    createGetCategory,
    createPostCategory,
    getCategory,
    deleteCategory
};  