
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

console.log("✅ Stripe Secret Key Loaded:", !!process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { email } = req.body;
  console.log("📨 Received email:", email);

  if (!email) {
    console.log("❌ Email is missing!");
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Newsletter Subscription',
          },
          unit_amount: 19900,
        },
        quantity: 1,
      }],
      mode: 'payment',
      customer_email: email,
      success_url: 'http://localhost:3000/thank-you',
      cancel_url: 'http://localhost:3000/payment',
    });

    console.log("✅ Stripe Session Created:", session.id);
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe Error:", err);
    res.status(500).json({ error: "Stripe session creation failed" });
  }
});

export default router;
