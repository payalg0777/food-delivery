import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
}));
