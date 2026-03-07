import {
  formatCurrency,
  formatPercent,
  getProfitColorClass,
} from "../utils/helpers";

export default function DetailSection({ stock, stats, profile }) {
  return (
    <div className="card">
      <h2>{stock} Details</h2>
      <p className="sub-text">Selected stock summary and statistics</p>

      <div className="details-grid">
        <div className="detail-box">
          <p className="label">Name</p>
          <p>{profile?.companyName || stock}</p>
        </div>

        <div className="detail-box">
          <p className="label">Book Value</p>
          <p>{formatCurrency(stats?.bookValue)}</p>
        </div>

        <div className="detail-box">
          <p className="label">Profit</p>
          <p className={getProfitColorClass(stats?.profit)}>
            {formatPercent(stats?.profit)}
          </p>
        </div>
      </div>

      <div className="summary-box">
        <p className="label">Summary</p>
        <p>{profile?.summary || "No summary available."}</p>
      </div>
    </div>
  );
}