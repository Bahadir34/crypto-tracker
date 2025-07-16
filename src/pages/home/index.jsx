import React, { useCallback, useEffect, useState } from "react";
import { coinApi } from "../../services/coinService";
import Error from "../../components/error";
import SearchBar from "../../components/home/searchBar";
import { RefreshCw, TrendingUp } from "lucide-react";
import InfoCard from "../../components/home/infoCard";
import Loader from "../../components/loader";
import CoinCard from "../../components/home/coindCard";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState();
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchCoins = useCallback((isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    coinApi
      .getTopCoins()
      .then((data) => {
        setCoins(data);
        setLastUpdated(new Date());
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      fetchCoins(true);
    }, 10000);

    // performans icin onemli bir noktadir, komponent ekrandan kayboldugu zaman intervali durdur
    return () => {
      clearInterval(id);
    };
  }, []);

  if (error) return <Error message={error} refetch={fetchCoins} />;

  return (
    <div className="space-y-6">
      {/* Baslik */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl dont-bold text-gray-900 dark:text-white">
            Crypto Currency Market
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            The most popular crypto currencies
          </p>
        </div>

        {/* arama ve yenileme */}
        <div className="flex items-center space-x-4">
          <SearchBar />
          <button
            onClick={() => {
              fetchCoins(true);
            }}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <RefreshCw
              className={`size-5   ${refreshing ? "animate-spin " : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Istatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard
          label="Total Coins Count"
          value={coins?.length}
          icon={<TrendingUp className="size-8 text-blue-500" />}
        />
        <InfoCard
          label="Last Updated At"
          value={lastUpdated ? lastUpdated.toLocaleTimeString("tr") : "Loading"}
          icon={<RefreshCw className="size-8 text-green-500" />}
        />
        <InfoCard
          label="Status"
          value={
            <div className="flex items-center space-x-2">
              <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          }
        />
      </div>

      {/* Listeleme */}

      {loading && coins?.length < 1 ? (
        <Loader />
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {coins?.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}

      {/* Yenileme Durumu */}
      {refreshing && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <RefreshCw className="size-4 animate-spin" />
            <span>Updating</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
