import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import RangeButtons from "./RangeButtons";
import { formatCurrency, formatDate, getMinMax } from "../utils/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function ChartSection({
  stock,
  selectedRange,
  onRangeChange,
  chartData,
}) {
  const labels = chartData?.timeStamp?.map((timestamp) => formatDate(timestamp)) || [];
  const values = chartData?.value || [];
  const { min, max } = getMinMax(values);

  const data = {
    labels,
    datasets: [
      {
        label: stock,
        data: values,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 5,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#e5e7eb",
        },
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            return tooltipItems?.[0]?.label || "";
          },
          label: function (context) {
            return `${stock}: ${formatCurrency(context.raw)}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#94a3b8",
          maxTicksLimit: 8,
        },
        grid: {
          color: "rgba(148, 163, 184, 0.08)",
        },
      },
      y: {
        ticks: {
          color: "#94a3b8",
          callback: function (value) {
            return `$${value}`;
          },
        },
        grid: {
          color: "rgba(148, 163, 184, 0.08)",
        },
      },
    },
  };

  return (
    <div className="card chart-card">
      <div className="chart-header">
        <div>
          <h2>{stock} Chart</h2>
          <p className="sub-text">Interactive stock performance chart</p>
        </div>

        <RangeButtons
          selectedRange={selectedRange}
          onRangeChange={onRangeChange}
        />
      </div>

      <div className="peak-low-row">
        <div className="mini-stat">
          <span>Low</span>
          <strong>{formatCurrency(min)}</strong>
        </div>

        <div className="mini-stat">
          <span>High</span>
          <strong>{formatCurrency(max)}</strong>
        </div>
      </div>

      <div className="chart-box">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}