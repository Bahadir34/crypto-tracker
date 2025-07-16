import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
  },
});

export const coinApi = {
  async getTopCoins() {
    try {
      const res = await apiClient.get("/coins/markets", {
        params: {
          vs_currency: "usd",
        },
      });
      return res.data;
    } catch (error) {
      throw new Error(`Coin verisi cekilemedi : ${error.message}`);
    }
  },
};
