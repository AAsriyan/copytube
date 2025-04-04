export const INFINITE_QUERY_LIMIT = 5;

export const APP_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : `https://${process.env.VERCEL_URL}`;
