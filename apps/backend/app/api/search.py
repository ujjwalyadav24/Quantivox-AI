from fastapi import APIRouter
from app.services.yahoo import get_stock_info

router = APIRouter()


@router.get("/search")
def search_stock(symbol: str):
    return get_stock_info(symbol)