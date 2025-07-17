import React, { useCallback, useEffect, useState } from "react";
import { coinApi } from "../../services/coinService";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import Error from "../../components/error";
import CoinHeader from "./coinHeader";
import CoinPrice from "./coinPrice";
import CoinStatsGrid from "./coinStatsGrid";
import CoinChart from "./coinChart";
import CoinDesc from "./coinDesc";

const Detail = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [coin, setCoin] = useState([]);
  const [priceHistory, setPriceHistory] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(7);

  const fetchPriceHistory = useCallback(
    async (days = 7) => {
      try {
        setHistoryLoading(true);
        const data = await coinApi.getPriceHistory(id, days);
        setPriceHistory(data);
      } catch (error) {
        setPriceHistory([]);
      } finally {
        setHistoryLoading(false);
      }
    },
    [id]
  );

  const fetchCoinDetail = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const res = await coinApi.getCoinDetail(id);
        setCoin(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [id]
  );

  useEffect(() => {
    fetchCoinDetail();
    fetchPriceHistory();
  }, []);

  useEffect(() => {
    if (coin) {
      fetchPriceHistory(selectedPeriod);
      fetchCoinDetail(true);
    }
  }, [selectedPeriod]);

  // verileri guncelleyecek func.
  const handleRefresh = () => {
    fetchCoinDetail(true);
    fetchPriceHistory();
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <Error
        message={error.message}
        refetch={() => {
          fetchCoinDetail();
          fetchPriceHistory();
        }}
      />
    );
  return (
    <div className="space-y-6">
      <CoinHeader
        coin={coin}
        handleRefresh={handleRefresh}
        refreshing={refreshing}
      />
      <CoinPrice coin={coin} />
      <CoinChart
        coin={coin}
        priceHistory={priceHistory}
        historyLoading={historyLoading}
        period={selectedPeriod}
        setPeriod={setSelectedPeriod}
      />
      <CoinStatsGrid coin={coin} />
      <CoinDesc coin={coin} />
    </div>
  );
};

export default Detail;
