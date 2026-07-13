from fastapi import APIRouter
import yfinance as yf

router = APIRouter()


@router.get("/history")
def get_history(symbol: str, period: str = "1mo"):
    stock = yf.Ticker(symbol)

    history = stock.history(period=period)

    data = []

    for date, row in history.iterrows():
        data.append({
            "date": str(date.date()),
            "close": round(float(row["Close"]), 2)
        })

    return data