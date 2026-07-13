import os
import requests

from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("FINNHUB_API_KEY")


def get_stock_news(symbol: str):
    try:
        url = (
            f"https://finnhub.io/api/v1/company-news"
            f"?symbol={symbol.upper()}"
            f"&from=2026-01-01"
            f"&to=2026-12-31"
            f"&token={API_KEY}"
        )

        response = requests.get(url)

        news = response.json()

        results = []

        for item in news[:10]:
            results.append(
                {
                    "headline": item.get("headline"),
                    "summary": item.get("summary"),
                    "image": item.get("image"),
                    "url": item.get("url"),
                    "source": item.get("source"),
                    "datetime": item.get("datetime"),
                }
            )

        return results

    except Exception as e:
        return {
            "error": str(e)
        }