// File: src/components/Loader.jsx
// Simple loading indicator

function Loader() {
  return (
    <div className="loader" aria-live="polite" aria-busy="true">
      <div className="loader__spinner" />
      <p className="loader__text">Loading...</p>
    </div>
  );
}

export default Loader;
