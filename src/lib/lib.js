export const api =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/api/"
    : "https://face-detectly.vercel.app/api/";

export const userRequest = async (url, payload) => {
  const reqOption = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const res = await fetch(url, reqOption);
    const user = await res.json();
    return user;
  } catch (error) {
    return error;
  }
};

export default api;
