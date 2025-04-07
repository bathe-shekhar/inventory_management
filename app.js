const express = require('express');
const dotenv = require('dotenv');

const homeRouter = require('./routes/homeRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7576;

// Middleware
app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
// Routes
app.use('/', homeRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);


// app.get('/', (req, res) => {
//   res.send('Welcome to the Inventory Management System!');
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});