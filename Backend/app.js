const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

connectToDb();

// const allowedOrigins = [ "http://localhost:5173"];
const allowedOrigins = ["https://journeynow.vercel.app"];
app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", allowedOrigins); // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
    // Handle preflight requests (Important for CORS)
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
  
    next();
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send('Hi, Asmit. Backend is Up........');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);




module.exports = app;

