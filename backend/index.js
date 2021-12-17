require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');


// DB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log('DB connected.');
    } catch (error) {
        console.log(error);
    }
}

connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', productRoutes);

// Connection
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log('App is running...');
})