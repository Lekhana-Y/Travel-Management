import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import tourRoutes from './routes/tours.js';
import reviewRoutes from './routes/reviews.js';
import bookingRoutes from './routes/bookings.js';
import galleryRoutes from './routes/galleryRoutes.js';
import newsletterRoutes from './routes/newsletter.js';
import stripeRoutes from './routes/stripe.js';
import weatherRoutes from './routes/weather.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/weather', weatherRoutes);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve frontend for any other routes (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
