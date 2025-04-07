const pool = require('./pool.js');

const dotenv = require('dotenv');
dotenv.config();

async function getAllCategories() {
    try {
        const result = await pool.query('SELECT * FROM categories ORDER BY category_name ASC');
        return result.rows;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

async function getCategoryById(categoryId) {
    try {
        const result = await pool.query('SELECT * FROM categories WHERE category_id = $1', [categoryId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        throw error;
    }
}

async function getCategoryByName(categoryName) {
    try {
        const result = await pool.query('SELECT * FROM categories WHERE category_name = $1', [categoryName]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching category by name:', error);
        throw error;
    }
};

async function getCategoryName(categoryId) {
    try {
        const result = await pool.query('SELECT category_name FROM categories WHERE category_id = $1', [categoryId]);
        return result.rows[0].category_name;
    } catch (error) {
        console.error('Error fetching category name:', error);
        throw error;
    }
}
// async function getCategoryId(categoryName) {
//     try {
//         const result = await pool.query('SELECT category_id FROM categories WHERE category_name = $1', [categoryName]);
//         return result.rows[0].category_id;
//     } catch (error) {
//         console.error('Error fetching category ID:', error);
//         throw error;
//     }
// }

async function insertCategory(categoryName) {
    try {
        const result = await pool.query('INSERT INTO categories (category_name) VALUES ($1) RETURNING *', [categoryName]);
        return result.rows[0];
    } catch (error) {
        console.error('Error inserting category:', error);
        throw error;
    }
}

async function getCategoryProductsCount(categoryId) {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM products WHERE product_category = $1', [categoryId]);
        console.log(result.rows[0].count, 10);

        return parseInt(result.rows[0].count, 10);
    } catch (error) {
        console.error('Error fetching category products count:', error);
        throw error;
    }
}


async function deleteCategory(categoryId) {
    try {
        await pool.query('DELETE FROM categories WHERE category_id = $1', [categoryId]);
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}



// ********************* Product queries ********************* //

async function getAllProducts() {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY product_name ASC');
        return result.rows;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

async function getProductById(productId) {
    try {
        const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [productId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
}

async function getProductsFromCategory(categoryId) {
    try {
        const result = await pool.query('SELECT * FROM products WHERE product_category = $1', [categoryId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching products from category:', error);
        throw error;
    }
}

async function insertProduct(productName, categoryId) {
    try {
        // const categoryId = await pool.query('SELECT category_id FROM categories WHERE category_name = $1', [categoryName]);
        const result = await pool.query('INSERT INTO products (product_name, product_category) VALUES ($1, $2) RETURNING *', [productName, categoryId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error inserting product:', error);
        throw error;
    }
}

async function deleteProduct(productId) {
    try {
        await pool.query('DELETE FROM products WHERE product_id = $1', [productId]);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    getCategoryName,
    insertCategory,
    deleteCategory,
    getCategoryProductsCount,
    getAllProducts,
    getProductById,
    getProductsFromCategory,
    insertProduct,
    deleteProduct,

};