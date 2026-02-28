// File: src/components/SearchBar.jsx
// Controlled search input with auto-uppercase

function SearchBar({ value, onChange, placeholder = 'Search stock symbol (e.g. AAPL, TCS)' }) {
  const handleChange = (e) => {
    const input = e.target.value;
    onChange(input.toUpperCase());
  };

  return (
    <input
      type="text"
      className="search-bar"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      aria-label="Search stock symbol"
      autoFocus
    />
  );
}

export default SearchBar;
