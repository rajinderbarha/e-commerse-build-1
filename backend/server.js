


const express = require('express');
const cors = require('cors')
const stripe = require('stripe')('sk_test_51OOddBGF5YtidX1RQTt0mP7UvbH2pmcahaSFBcNyllvPBtXW69w5Gd5Hn3RqDruv8ynduKA1Qjjwk4WG4sv0b5F700TJuib5cJ');
const dotenv = require('dotenv');
dotenv.config()
const app = express();
const PORT = 5000;

// console.log(process.env.STRIPE_SECRET_KEY)
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to create a Payment Intent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    // Create a PaymentIntent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    res.status(500).json({ error: 'Unable to create PaymentIntent.' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Stripe example backend.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
