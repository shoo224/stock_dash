// File: src/services/stockService.js
// Fetches stock data from Alpha Vantage API

/**
 * Fetch stock quote and company overview, then normalize the response
 * @param {string} symbol - Stock symbol (e.g., AAPL, TCS)
 * @returns {Promise<object>} - Normalized stock data
 */
export async function fetchStock(symbol) {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    throw new Error('API key not configured. Add VITE_API_KEY to your .env file.');
  }

  const upperSymbol = symbol.trim().toUpperCase();
  const baseUrl = 'https://www.alphavantage.co/query';

  // Fetch quote and overview in parallel to minimize wait time
  const [quoteRes, overviewRes] = await Promise.all([
    fetch(
      `${baseUrl}?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(
        upperSymbol
      )}&apikey=${encodeURIComponent(apiKey)}`
    ),
    fetch(
      `${baseUrl}?function=OVERVIEW&symbol=${encodeURIComponent(
        upperSymbol
      )}&apikey=${encodeURIComponent(apiKey)}`
    ),
  ]);

  if (!quoteRes.ok) {
    throw new Error(`API request failed: ${quoteRes.status}`);
  }

  if (!overviewRes.ok) {
    throw new Error(`API request failed: ${overviewRes.status}`);
  }

  const quoteData = await quoteRes.json();
  const overviewData = await overviewRes.json();

  const globalQuote = quoteData['Global Quote'];
  if (!globalQuote || Object.keys(globalQuote).length === 0) {
    const message =
      quoteData['Error Message'] ||
      quoteData['Note'] ||
      `No data found for symbol: ${upperSymbol}`;
    throw new Error(message);
  }

  const companyName =
    overviewData.Name || overviewData.Symbol || globalQuote['01. symbol'] || upperSymbol;
  const currentPrice = globalQuote['05. price'] || 'N/A';
  const dayHigh = globalQuote['03. high'] || 'N/A';
  const dayLow = globalQuote['04. low'] || 'N/A';
  const latestDay =
    globalQuote['07. latest trading day'] || new Date().toISOString().split('T')[0];

  return {
    symbol: upperSymbol,
    companyName,
    currentPrice,
    dayHigh,
    dayLow,
    lastUpdated: latestDay,
  };
}
