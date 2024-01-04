const api =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/api/"
    : "https://face-detectly.vercel.app/api/";

export default api;
