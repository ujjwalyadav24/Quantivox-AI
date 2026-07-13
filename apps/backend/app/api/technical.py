from fastapi import APIRouter

from app.services.technical import (
    get_technical_indicators,
)

router = APIRouter()


@router.get("/technical")
def technical(symbol: str):
    return get_technical_indicators(symbol)