from app.services.technical import get_technical_indicators


def generate_recommendation(stock: dict):
    technical = get_technical_indicators(stock["symbol"])

    score = 50
    reasons = []

    # -------------------------
    # Price vs Previous Close
    # -------------------------
    if stock.get("price") and stock.get("previousClose"):
        if stock["price"] > stock["previousClose"]:
            score += 10
            reasons.append("Price is trading above previous close.")
        else:
            score -= 10
            reasons.append("Price is below previous close.")

    # -------------------------
    # RSI
    # -------------------------
    rsi = technical.get("rsi")

    if rsi is not None:
        if rsi < 30:
            score += 15
            reasons.append("RSI indicates oversold conditions.")
        elif rsi > 70:
            score -= 15
            reasons.append("RSI indicates overbought conditions.")
        else:
            reasons.append("RSI is in a neutral range.")

    # -------------------------
    # MACD
    # -------------------------
    if technical["macd"] > technical["signal"]:
        score += 15
        reasons.append("MACD bullish crossover.")
    else:
        score -= 15
        reasons.append("MACD bearish crossover.")

    # -------------------------
    # EMA Trend
    # -------------------------
    if technical["ema20"] > technical["ema50"]:
        score += 15
        reasons.append("Short-term trend is bullish.")
    else:
        score -= 15
        reasons.append("Short-term trend is bearish.")

    # -------------------------
    # Price vs EMA20
    # -------------------------
    if stock["price"] > technical["ema20"]:
        score += 10
        reasons.append("Price is above EMA20.")
    else:
        score -= 10
        reasons.append("Price is below EMA20.")

    # -------------------------
    # PE Ratio
    # -------------------------
    pe = stock.get("trailingPE")

    if pe:
        if pe < 25:
            score += 10
            reasons.append("Healthy PE Ratio.")
        elif pe > 40:
            score -= 10
            reasons.append("PE Ratio is relatively high.")

    # -------------------------
    # Beta
    # -------------------------
    beta = stock.get("beta")

    if beta:
        if beta < 1:
            score += 5
            reasons.append("Lower volatility.")
        else:
            score -= 5
            reasons.append("Higher volatility.")

    # -------------------------
    # Dividend
    # -------------------------
    dividend = stock.get("dividendYield")

    if dividend:
        score += 5
        reasons.append("Company pays dividends.")

    # -------------------------
    # Clamp Score
    # -------------------------
    score = max(0, min(score, 100))

    # -------------------------
    # Final Recommendation
    # -------------------------
    if score >= 80:
        recommendation = "STRONG BUY"
        risk = "LOW"

    elif score >= 65:
        recommendation = "BUY"
        risk = "LOW"

    elif score >= 45:
        recommendation = "HOLD"
        risk = "MEDIUM"

    elif score >= 25:
        recommendation = "SELL"
        risk = "HIGH"

    else:
        recommendation = "STRONG SELL"
        risk = "VERY HIGH"

    return {
        "recommendation": recommendation,
        "confidence": score,
        "risk": risk,
        "reasons": reasons,
        "technical": technical,
    }