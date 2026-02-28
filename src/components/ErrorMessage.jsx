// File: src/components/ErrorMessage.jsx
// Displays styled error message

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="error-message" role="alert">
      <span className="error-message__icon" aria-hidden="true">⚠</span>
      <p className="error-message__text">{message}</p>
    </div>
  );
}

export default ErrorMessage;
