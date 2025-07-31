import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    accept: "application/json",

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
  async getCoinDetail(id) {
    try {
      const res = await apiClient.get(`/coins/${id}`);

      return res.data;
    } catch (error) {
      throw new Error(`Coin verisi alinamadi : ${error.message}`);
    }
  },

  async getPriceHistory(id, days = 7) {
    try {
      const res = await apiClient.get(`/coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: days,
          interval: days <= 1 ? undefined : "daily",
        },
      });

      return res.data.prices.map(([timestamp, price]) => ({
        timestamp,
        price,
        date: new Date(timestamp).toISOString(),
      }));
    } catch (error) {
      throw new Error(`Coin verisi alinamadi : ${error.message}`);
    }
  },
};
