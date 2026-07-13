import yfinance as yf


def get_stock_info(symbol: str):
    try:
        stock = yf.Ticker(symbol.upper())
        info = stock.info

        return {
            # Basic Info
            "symbol": symbol.upper(),
            "company": info.get("longName"),
            "currency": info.get("currency"),
            "country": info.get("country"),
            "sector": info.get("sector"),
            "industry": info.get("industry"),
            "website": info.get("website"),

            # Price
            "price": info.get("currentPrice"),
            "open": info.get("open"),
            "previousClose": info.get("previousClose"),

            # Day Performance
            "dayHigh": info.get("dayHigh"),
            "dayLow": info.get("dayLow"),

            # 52 Week
            "fiftyTwoWeekHigh": info.get("fiftyTwoWeekHigh"),
            "fiftyTwoWeekLow": info.get("fiftyTwoWeekLow"),

            # Volume
            "volume": info.get("volume"),
            "averageVolume": info.get("averageVolume"),

            # Company Stats
            "marketCap": info.get("marketCap"),
            "beta": info.get("beta"),
            "trailingPE": info.get("trailingPE"),
            "forwardPE": info.get("forwardPE"),
            "trailingEps": info.get("trailingEps"),
            "dividendYield": info.get("dividendYield"),

            # Employees
            "employees": info.get("fullTimeEmployees"),

            # Exchange
            "exchange": info.get("exchange"),

            # Timezone
            "timezone": info.get("exchangeTimezoneName"),
        }

    except Exception as e:
        return {
            "error": str(e)
        }