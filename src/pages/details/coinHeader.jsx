import { ArrowLeft, RefreshCcw, Star } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CoinHeader = ({ coin, handleRefresh, refreshing }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
          <ArrowLeft
            onClick={() => {
              navigate("/");
            }}
            className="size-5 text-gray-600 dark:text-gray-400"
          />
        </button>
        <div className="flex items-center space-x-3">
          <img
            src={coin.image.large}
            alt={coin.name}
            className="size-12 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {coin.name} ({coin.symbol})
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              #{coin.market_cap_rank}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => handleRefresh()}
          disabled={refreshing}
          className="transition rounded-lg dark:hover:bg-gray-700 hover:bg-gray-100 p-2"
        >
          <RefreshCcw
            className={`size-5 text-gray-600 dark:text-gray-400  ${
              refreshing ? "animate-spin" : ""
            }`}
          />
        </button>
        <button className="p-2 rounded-lg transition dark:hover:bg-gray-700 hover:bg-gray-100  ">
          <Star className=" text-gray-600 dark:text-gray-400 size-5" />
        </button>
      </div>
    </div>
  );
};

export default CoinHeader;
