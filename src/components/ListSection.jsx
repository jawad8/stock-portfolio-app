import {
  formatCurrency,
  formatPercent,
  getProfitColorClass,
} from "../utils/helpers";

export default function ListSection({
  stocks,
  statsData,
  selectedStock,
  onSelectStock,
}) {
  return (
    <div className="card">
      <h2>Stocks List</h2>
      <p className="sub-text">Select a stock to update chart and details</p>

      <div className="stock-list">
        {stocks.map((stock) => {
          const item = statsData?.[stock] || {};

          return (
            <div
              key={stock}
              className={selectedStock === stock ? "stock-item active-stock" : "stock-item"}
              onClick={() => onSelectStock(stock)}
            >
              <div className="stock-row">
                <strong>{stock}</strong>
                <span className={getProfitColorClass(item.profit)}>
                  {formatPercent(item.profit)}
                </span>
              </div>

              <div className="stock-row small-text">
                <span>Book Value</span>
                <span>{formatCurrency(item.bookValue)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}