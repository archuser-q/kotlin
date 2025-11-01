import 'dotenv/config';

export default {
  expo: {
    extra: {
      OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    },
  },
};
