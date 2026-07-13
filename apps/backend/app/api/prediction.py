from fastapi import APIRouter

from app.services.prediction import predict_stock

router = APIRouter()


@router.get("/prediction")
def prediction(symbol: str):
    return predict_stock(symbol)