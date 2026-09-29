const apiUrl = import.meta.env.VITE_API_URL;
const aiApiUrl = import.meta.env.VITE_AI_API_URL;

if (!apiUrl) {
  throw new Error(
    "VITE_API_URL is not defined. Please check your .env file."
  );
}

if (!aiApiUrl) {
  throw new Error(
    "VITE_AI_API_URL is not defined. Please check your .env file."
  );
}

export const env = {
  apiUrl,
  aiApiUrl,
} as const;