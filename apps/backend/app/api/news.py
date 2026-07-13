from fastapi import APIRouter

from app.services.news import get_stock_news

router = APIRouter()


@router.get("/news")
def news(symbol: str):
    return get_stock_news(symbol)