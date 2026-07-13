import yfinance as yf
import pandas as pd

from ta.trend import EMAIndicator, SMAIndicator, MACD
from ta.momentum import RSIIndicator


def get_technical_indicators(symbol: str):
    stock = yf.Ticker(symbol.upper())

    df = stock.history(period="1y")

    if df.empty:
        return {
            "error": "No historical data found."
        }

    close = df["Close"]

    rsi = RSIIndicator(close=close, window=14)

    ema20 = EMAIndicator(close=close, window=20)

    ema50 = EMAIndicator(close=close, window=50)

    sma50 = SMAIndicator(close=close, window=50)

    sma200 = SMAIndicator(close=close, window=200)

    macd = MACD(close=close)

    return {
        "rsi": round(rsi.rsi().iloc[-1], 2),

        "ema20": round(ema20.ema_indicator().iloc[-1], 2),

        "ema50": round(ema50.ema_indicator().iloc[-1], 2),

        "sma50": round(sma50.sma_indicator().iloc[-1], 2),

        "sma200": round(sma200.sma_indicator().iloc[-1], 2),

        "macd": round(macd.macd().iloc[-1], 2),

        "signal": round(macd.macd_signal().iloc[-1], 2),

        "histogram": round(macd.macd_diff().iloc[-1], 2),
    }