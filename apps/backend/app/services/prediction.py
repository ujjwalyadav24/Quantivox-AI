import yfinance as yf
import pandas as pd

from sklearn.ensemble import RandomForestRegressor

from ta.trend import EMAIndicator, SMAIndicator, MACD
from ta.momentum import RSIIndicator


def predict_stock(symbol: str):
    stock = yf.Ticker(symbol.upper())

    # Get historical data
    df = stock.history(period="5y")

    if df.empty:
        return {
            "error": "No historical data found."
        }

    # -------------------------
    # Get LIVE current price
    # -------------------------

    try:
        info = stock.fast_info
        current = float(info["lastPrice"])
    except Exception:
        current = float(df["Close"].iloc[-1])

    # -------------------------
    # Feature Engineering
    # -------------------------

    df["RSI"] = RSIIndicator(
        close=df["Close"],
        window=14
    ).rsi()

    df["EMA20"] = EMAIndicator(
        close=df["Close"],
        window=20
    ).ema_indicator()

    df["EMA50"] = EMAIndicator(
        close=df["Close"],
        window=50
    ).ema_indicator()

    df["SMA50"] = SMAIndicator(
        close=df["Close"],
        window=50
    ).sma_indicator()

    df["SMA200"] = SMAIndicator(
        close=df["Close"],
        window=200
    ).sma_indicator()

    macd = MACD(close=df["Close"])

    df["MACD"] = macd.macd()

    df["Signal"] = macd.macd_signal()

    df["Return"] = df["Close"].pct_change()

    # Tomorrow's close

    df["Target"] = df["Close"].shift(-1)

    df.dropna(inplace=True)

    features = [
        "Close",
        "Volume",
        "RSI",
        "EMA20",
        "EMA50",
        "SMA50",
        "SMA200",
        "MACD",
        "Signal",
        "Return",
    ]

    X = df[features]
    y = df["Target"]

    # -------------------------
    # Train Model
    # -------------------------

    model = RandomForestRegressor(
        n_estimators=300,
        random_state=42
    )

    model.fit(X, y)

    latest = X.iloc[-1:]

    prediction = float(model.predict(latest)[0])

    expected_move = (
        (prediction - current)
        / current
        * 100
    )

    confidence = max(
        60,
        min(
            95,
            90 - abs(expected_move)
        )
    )

    trend = (
        "Bullish"
        if prediction > current
        else "Bearish"
    )

    return {
        "currentPrice": round(current, 2),
        "predictedPrice": round(prediction, 2),
        "expectedMove": round(expected_move, 2),
        "confidence": round(confidence, 2),
        "trend": trend,
    }