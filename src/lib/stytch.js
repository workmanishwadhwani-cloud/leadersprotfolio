import { StytchUIClient } from '@stytch/vanilla-js';

const publicToken = import.meta.env.VITE_STYTCH_PUBLIC_TOKEN;

if (!publicToken) {
  throw new Error('VITE_STYTCH_PUBLIC_TOKEN is not defined in the environment variables.');
}

export const stytch = new StytchUIClient(publicToken);
