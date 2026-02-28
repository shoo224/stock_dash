// File: src/utils/cache.js
// Frontend caching using localStorage - avoids API calls for recently searched symbols

const CACHE_PREFIX = 'stock_dashboard_';
const RECENT_KEY = 'stock_dashboard_recent';

/**
 * Get cached stock data for a symbol if it exists
 * @param {string} symbol - Stock symbol (e.g., AAPL)
 * @returns {object|null} - Cached stock data or null
 */
export function getCachedStock(symbol) {
  if (!symbol || typeof symbol !== 'string') return null;

  const key = CACHE_PREFIX + symbol.toUpperCase();
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const parsed = JSON.parse(cached);
    return parsed.data;
  } catch (e) {
    localStorage.removeItem(key);
    return null;
  }
}

/**
 * Store stock data in localStorage for the given symbol
 * @param {string} symbol - Stock symbol
 * @param {object} data - Stock data to cache
 */
export function setCachedStock(symbol, data) {
  if (!symbol || typeof symbol !== 'string' || !data) return;

  const key = CACHE_PREFIX + symbol.toUpperCase();
  const cacheEntry = {
    data,
    cachedAt: Date.now(),
  };

  try {
    localStorage.setItem(key, JSON.stringify(cacheEntry));
  } catch (e) {
    // localStorage may be full - silently fail
  }
}

/**
 * Get up to the last 5 searched stock symbols from localStorage
 * @returns {string[]} - Array of symbols, most recent first
 */
export function getRecentSearches() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item) => typeof item === 'string')
      .map((item) => item.toUpperCase())
      .slice(0, 5);
  } catch (e) {
    return [];
  }
}

/**
 * Add a symbol to the recent searches list and persist it
 * @param {string} symbol - Stock symbol
 * @returns {string[]} - Updated list of recent searches
 */
export function updateRecentSearches(symbol) {
  if (!symbol || typeof symbol !== 'string') return getRecentSearches();

  const upper = symbol.toUpperCase();
  const current = getRecentSearches();
  const without = current.filter((item) => item !== upper);
  const next = [upper, ...without].slice(0, 5);

  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch (e) {
    // Ignore storage errors for recent list
  }

  return next;
}
