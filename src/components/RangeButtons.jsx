const ranges = ["1month", "3month", "1year", "5year"];

export default function RangeButtons({ selectedRange, onRangeChange }) {
  return (
    <div className="range-buttons">
      {ranges.map((range) => (
        <button
          key={range}
          className={selectedRange === range ? "range-btn active" : "range-btn"}
          onClick={() => onRangeChange(range)}
        >
          {range}
        </button>
      ))}
    </div>
  );
}