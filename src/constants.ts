export const INFINITE_QUERY_LIMIT = 5;

export const APP_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL;
