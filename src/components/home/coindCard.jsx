import { Star, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { formatBigNumber, formatPrice } from "../../utils/helpers";
import { Link } from "react-router-dom";

const CoinCard = ({ coin }) => {
  // fiyat degisikligi negatif mi?
  const isPositive = coin.price_change_percentage_24h >= 0;

  const infoArray = [
    {
      label: "Price",
      value: (
        <p className="text-xl font-bold">{formatPrice(coin.current_price)}</p>
      ),
    },
    {
      label: "24h Change",
      value: (
        <span className="flex items-center space-x-1">
          {isPositive ? (
            <TrendingUp className="size-4 text-green-500" />
          ) : (
            <TrendingDown className="size-4 text-red-500" />
          )}
          {
            <span
              className={`font-semibold ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive
                ? `+${coin.price_change_percentage_24h.toFixed(2)}`
                : `${coin.price_change_percentage_24h.toFixed(2)}`}
            </span>
          }
        </span>
      ),
    },
    {
      label: "Market Cap.",
      value: (
        <p className="font-semibold">${formatBigNumber(coin.market_cap)}</p>
      ),
    },
    {
      label: "24h Volume",
      value: <p className="text-sm">${formatBigNumber(coin.total_volume)}</p>,
    },
  ];
 
  return (
    <Link
      to={`/coin/${coin.id}`}
      className="bg-white dark:bg-gray-800 rounded-lg shodow-lg hover:shadow-xl p-6 cursor-pointer hover:scale-105 transform  transition duration-300 "
    >
      {/* ust kisim */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {/* logo */}
          <div className="relative">
            <img
              src={coin.image}
              alt={coin.name}
              className="size-12 rounded-full"
            />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full size-6 flex items-center justify-center">
              {coin.market_cap_rank}
            </span>
          </div>
          <div className="ml-2">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              {coin.symbol}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px]">
              {coin.name}
            </p>
          </div>
        </div>
        {/* favori */}

        <button className="p-2 rounded-full transition">
          <Star className="size-5" />
        </button>
      </div>

      {/* coin bilgileri */}
      <div className="space-y-3">
        {infoArray.map((item, key) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {item.label}
            </span>
            {item.value}
          </div>
        ))}
      </div>

      {/* Alt kisim */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs dark:text-gray-400">
          <span>{coin.market_cap_rank}</span>
          <span>
            {new Date(coin.last_updated).toLocaleDateString("eng-us", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;
