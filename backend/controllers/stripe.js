const dotenv = require('dotenv');
dotenv.config();
let p = process.env;

const stripe = require('stripe')(`${p.STRIPE_SECRET_KEY}`);

const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0;
  items.forEach((item) => {
    total += item.price * item.quantity * 100;
  });
  return total;
};

exports.createPaymentIntent = async (req, res) => {
  if (!req.body.items || req.body.items.length === 0) {
    return res.status(400).send({ message: 'No items in cart' });
  }
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'eur',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
