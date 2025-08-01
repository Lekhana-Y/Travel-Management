// backend/routes/weather.js
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const router = express.Router();

router.get('/:city', async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`;
    const response = await fetch(url);
    const data = await response.json();

    // Handle API error (e.g., invalid city or key)
    if (data.error) {
      return res.status(400).json({
        success: false,
        message: data.error.message,
      });
    }

    const forecast = data.forecast.forecastday.map(day => ({
      date: day.date,
      condition: day.day.condition.text,
      icon: `https:${day.day.condition.icon}`,  // ✅ FIXED: Add 'https:'
      temp: day.day.avgtemp_c,
    }));

    return res.status(200).json({
      success: true,
      data: {
        city: data.location.name,
        forecast,
      },
    });
  } catch (err) {
    console.error('Error fetching weather:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
