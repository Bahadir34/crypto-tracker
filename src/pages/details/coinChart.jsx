import { Calendar, LoaderCircle } from "lucide-react";
import React from "react";
import PriceChart from "./priceChart";

const CoinChart = ({
  coin,
  priceHistory,
  historyLoading,
  period,
  setPeriod,
}) => {
  const periodOptions = [
    { days: 1, label: "1D" },
    { days: 7, label: "7D" },
    { days: 30, label: "30D" },
    { days: 90, label: "90D" },
    { days: 365, label: "1y" },
  ];

  return (
    <div className="detail-container">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="size-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg fonr-semibold text-gray-900 dark:text-gray-400 line-clamp-1">
            Price History
          </h2>
        </div>
        <div className="flex space-x-2">
          {periodOptions.map(({ days, label }, key) => (
            <button
              onClick={() => setPeriod(days)}
              key={key}
              className={`px-3 py-1 text-sm rounded-md transition ${
                period === days
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {historyLoading ? (
        <div className="h-80 flex items-center justiy-between">
          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <LoaderCircle className="text-blue-600 animate-spin  size-10" />
            <p className="  text-gray-600 dark:text-gray-400">
              Graphic is loading...
            </p>
          </div>
        </div>
      ) : (
        <PriceChart
          priceData={priceHistory}
          symbol={coin.symbol}
          days={period}
        />
      )}
    </div>
  );
};

export default CoinChart;
