const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import CORS

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Enable CORS
app.use(cors({
    origin: '*', // Allow all origins, or specify frontend URL e.g. 'http://localhost:3000'
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes)



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));