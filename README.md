# Stock Search Dashboard

A React-based MVP application for searching and displaying stock market data. Built as an internship assessment project with clean architecture, caching, and production-quality code.

## Features

### Core Features
- **Stock Symbol Search** – Search for any stock symbol (e.g., AAPL, TCS, RELIANCE)
- **Real-time Data** – Fetches current stock data from Alpha Vantage
- **Display Information** – Shows Company Name, Current Price, Day High, Day Low, Last Updated Time
- **Loading State** – Visual feedback while fetching data
- **Error Handling** – Graceful error messages for API failures
- **Frontend Caching** – Uses localStorage; repeated searches for the same symbol use cached data (no API call)

### Bonus Features
- **Debounced Search** – 500ms delay to reduce API calls while typing
- **Auto Uppercase** – Input automatically converts to uppercase for symbol format

## Tech Stack

- **React 18** – UI library
- **Vite 5** – Build tool and dev server
- **Plain CSS** – No UI libraries (MUI, Bootstrap, etc.)
- **JavaScript** – No TypeScript
- **Alpha Vantage API** – Stock data source

## Setup Instructions

### 1. Clone or download the project

```bash
cd stock_dash
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add API key

1. Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Copy `.env.example` to `.env`:

   ```bash
   copy .env.example .env
   ```

   (On macOS/Linux: `cp .env.example .env`)

3. Open `.env` and replace the placeholder with your key:

   ```
   VITE_API_KEY=your_actual_alpha_vantage_key_here
   ```

**Note:** Each search uses 2 API requests (GLOBAL_QUOTE + OVERVIEW). Cached searches do not use the API.

### 4. Run the project

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

## Folder Structure

```
stock-dashboard/
│
├── index.html
├── package.json
├── .env.example
├── README.md
├── vite.config.js
│
└── src/
    ├── main.jsx
    ├── App.jsx
    │
    ├── components/
    │     ├── SearchBar.jsx
    │     ├── StockCard.jsx
    │     ├── Loader.jsx
    │     └── ErrorMessage.jsx
    │
    ├── services/
    │     └── stockService.js
    │
    ├── utils/
    │     └── cache.js
    │
    └── styles.css
```

## Usage

1. Enter a stock symbol in the search bar (e.g., AAPL, MSFT, TCS).
2. Wait for the 500ms debounce; the app will fetch data automatically.
3. View the stock details in the card below.
4. Search the same symbol again to see cached data load instantly.

## License

MIT
