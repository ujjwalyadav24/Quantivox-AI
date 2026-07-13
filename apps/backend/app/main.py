from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.search import router as search_router
from app.api.history import router as history_router
from app.api.recommendation import router as recommendation_router
from app.api.technical import router as technical_router

app = FastAPI(
    title="Quantivox AI API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search_router, prefix="/api")
app.include_router(history_router, prefix="/api")
app.include_router(recommendation_router, prefix="/api")
app.include_router(technical_router, prefix="/api")


@app.get("/")
def home():
    return {
        "message": "Welcome to Quantivox AI Backend 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }