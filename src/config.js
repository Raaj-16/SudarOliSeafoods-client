// Backend URL is read from an env var so it's easy to point at localhost while
// developing and at your deployed backend in production, without code changes.
// Vite only exposes env vars prefixed with VITE_ to the browser bundle.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
