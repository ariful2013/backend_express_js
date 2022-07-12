const express = require('express');
const dotenv = require('./config/env_config');
const port = dotenv.PORT || 5000;
const connectDB = require('./config/db_config');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const { defaultErrorHandler } = require('./middleware/errorMiddleware');

// Mongodb Database Connection
connectDB();

// Express Initialization
const app = express();

// Body Parser Setting
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API for Routes
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

// Unhandled Routes Middleware
app.use((req, res, next) => {
  const error = new Error('404 Page not found !!!');
  error.status = 404;
  next(error);
});

// Error Handling Middleware
app.use(defaultErrorHandler);

// Server Startup
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
