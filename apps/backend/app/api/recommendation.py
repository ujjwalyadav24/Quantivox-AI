from fastapi import APIRouter
from app.services.yahoo import get_stock_info
from app.services.ai.recommendation import generate_recommendation

router = APIRouter()


@router.get("/recommendation")
def recommendation(symbol: str):
    stock = get_stock_info(symbol)

    if "error" in stock:
        return stock

    ai = generate_recommendation(stock)

    return {
        **stock,
        "ai": ai,
    }