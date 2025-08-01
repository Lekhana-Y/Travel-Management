import express from 'express';
import Newsletter from '../models/NewsLetter.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT and extract user email
const verifyUser = (req, res, next) => {
  const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.email) {
      return res.status(403).json({ success: false, message: "Invalid token payload" });
    }
    req.user = decoded; // contains email, id, etc.
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Token is invalid" });
  }
};

router.post('/', verifyUser, async (req, res) => {
  const email = req.user.email; // Use email from verified token only

  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already subscribed" });
    }

    const subscriber = new Newsletter({ email });
    await subscriber.save();

    res.status(200).json({ success: true, message: "Successfully subscribed!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

export default router;
