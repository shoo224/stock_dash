// File: src/components/StockCard.jsx
// Displays stock information in a card layout

function StockCard({ stock }) {
  if (!stock) return null;

  const { symbol, companyName, currentPrice, dayHigh, dayLow, lastUpdated } = stock;

  return (
    <div className="stock-card">
      <header className="stock-card__header">
        <h2 className="stock-card__symbol">{symbol}</h2>
        <p className="stock-card__company">{companyName}</p>
      </header>

      <div className="stock-card__body">
        <div className="stock-card__row">
          <span className="stock-card__label">Current Price</span>
          <span className="stock-card__value stock-card__value--price">${currentPrice}</span>
        </div>
        <div className="stock-card__row">
          <span className="stock-card__label">Day High</span>
          <span className="stock-card__value">${dayHigh}</span>
        </div>
        <div className="stock-card__row">
          <span className="stock-card__label">Day Low</span>
          <span className="stock-card__value">${dayLow}</span>
        </div>
        <div className="stock-card__row">
          <span className="stock-card__label">Last Updated</span>
          <span className="stock-card__value">{lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}

export default StockCard;
