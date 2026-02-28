// File: src/App.jsx
// Main app - manages search state, debouncing, caching, and API calls

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import StockCard from './components/StockCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { fetchStock } from './services/stockService';
import {
  getCachedStock,
  setCachedStock,
  getRecentSearches,
  updateRecentSearches,
} from './utils/cache';

const DEBOUNCE_MS = 500;

function App() {
  const [query, setQuery] = useState('');
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState(() => getRecentSearches());

  useEffect(() => {
    const symbol = query.trim().toUpperCase();
    if (!symbol) {
      setStock(null);
      setError(null);
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      // Clear previous error when starting new search
      setError(null);

      // Check cache first - skip API if we have valid cached data
      const cached = getCachedStock(symbol);
      if (cached) {
        setStock(cached);
        setRecentSearches(updateRecentSearches(symbol));
        setLoading(false);
        return;
      }

      setLoading(true);
      setStock(null);

      fetchStock(symbol)
        .then((data) => {
          setCachedStock(symbol, data);
          setStock(data);
          setRecentSearches(updateRecentSearches(symbol));
        })
        .catch((err) => {
          setError(err.message || 'Failed to fetch stock data');
          setStock(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Stock Search Dashboard</h1>
        <SearchBar value={query} onChange={setQuery} />
      </header>

      <main className="app__main">
        {recentSearches.length > 0 && (
          <section className="recent-searches" aria-label="Recent searches">
            <h2 className="recent-searches__title">Recent searches</h2>
            <div className="recent-searches__list">
              {recentSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="recent-searches__item"
                  onClick={() => setQuery(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        )}

        {loading && <Loader />}
        {error && !loading && <ErrorMessage message={error} />}
        {stock && !loading && <StockCard stock={stock} />}

        {!query.trim() && !loading && !error && (
          <p className="app__hint">Enter a stock symbol to get started (e.g. AAPL, TCS, RELIANCE)</p>
        )}
      </main>
    </div>
  );
}

export default App;
