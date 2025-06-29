import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import load from './Routes/load.js';
import user from './Routes/user.js';
import order from './Routes/order.js';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dbUrl=process.env.MONGODB_AIP_URI

// Connect to MongoDB
mongoose.connect(dbUrl, {})
    .then(() => {
        console.log("connected To DB.")
    })
    .catch((err) => {
        console.log("Connection To DB Failed,Error : ", err)
    })


const app = express();

// Create Redis client
const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-19393.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 19393
    }
});


redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

await redisClient.connect();

// Configure session middleware
app.use(session({
  store: new RedisStore({
    client: redisClient,
    prefix: 'session:',
  }),
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}))

// Serve static files from the build directory
app.use(express.static('build'));
app.use(express.json());

// Define routes
app.use('/api/', load);
app.use('/api/user', user);
app.use('/api/order', order);

// Serve the React app for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), (err) => {
      if (err) {
          res.status(500).send(err);
      }
  });
});

// Handle unmatched routes
app.use((req, res) => {
  console.log("Request Object : ",req) 
  console.log('No Route Matched!');
  res.status(404).send('No Route Matched!');
});

// Start the server
app.listen(4500, () => {
  console.log('Server is running on port 4500.');
});
