import { useEffect, useMemo, useState } from "react";
import { STOCKS } from "./data/stocks";
import {
  getStocksData,
  getStocksStatsData,
  getProfileData,
} from "./services/api";
import { getRangeMap } from "./utils/helpers";
import ChartSection from "./components/ChartSection";
import ListSection from "./components/ListSection";
import DetailSection from "./components/DetailSection";
import "./index.css";

export default function App() {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [selectedRange, setSelectedRange] = useState("1month");
  const [stocksData, setStocksData] = useState({});
  const [stocksStats, setStocksStats] = useState({});
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAllData() {
      try {
        setLoading(true);
        setError("");

        const [chartRes, statsRes, profileRes] = await Promise.all([
          getStocksData(),
          getStocksStatsData(),
          getProfileData(),
        ]);

        const parsedChartData =
          chartRes?.stocksData?.[0] ||
          chartRes?.stocksData ||
          chartRes ||
          {};

        const parsedStatsData =
          statsRes?.stocksStatsData?.[0] ||
          statsRes?.stocksStatsData ||
          statsRes ||
          {};

        const parsedProfileData =
          profileRes?.stocksProfileData?.[0] ||
          profileRes?.stocksProfileData ||
          profileRes ||
          {};

        setStocksData(parsedChartData);
        setStocksStats(parsedStatsData);
        setProfileData(parsedProfileData);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  const currentChartData = useMemo(() => {
    if (!stocksData || !selectedStock) return null;

    const rangeKey = getRangeMap(selectedRange);

    const stockEntry = stocksData?.[selectedStock];
    if (!stockEntry) return null;

    return stockEntry?.[rangeKey] || null;
  }, [stocksData, selectedStock, selectedRange]);

  if (loading) {
    return (
      <div className="status-screen">
        <div className="status-card">
          <h2>Loading stock data...</h2>
          <p>The API may take a little time to wake up.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-screen">
        <div className="status-card error-card">
          <h2>Failed to load data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="page-header">
        <p className="eyebrow">Market intelligence dashboard</p>
        <h1>MarketLens</h1>
        <p>Explore price history, company context, and performance at a glance.</p>
      </header>

      <main className="main-layout">
        <section className="left-panel">
          <ChartSection
            stock={selectedStock}
            selectedRange={selectedRange}
            onRangeChange={setSelectedRange}
            chartData={currentChartData}
          />

          <DetailSection
            stock={selectedStock}
            stats={stocksStats?.[selectedStock]}
            profile={profileData?.[selectedStock]}
          />
        </section>

        <aside className="right-panel">
          <ListSection
            stocks={STOCKS}
            statsData={stocksStats}
            selectedStock={selectedStock}
            onSelectStock={setSelectedStock}
          />
        </aside>
      </main>
    </div>
  );
}
