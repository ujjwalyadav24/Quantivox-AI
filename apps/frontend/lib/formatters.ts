const USD_TO_INR = 95.83;

export function formatCurrency(
  value?: number,
  currency: string = "USD"
) {
  if (value === undefined || value === null) {
    return {
      primary: "-",
      secondary: "",
    };
  }

  if (currency === "INR") {
    return {
      primary: `₹${value.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`,
      secondary: "",
    };
  }

  return {
    primary: `₹${(value * USD_TO_INR).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2,
      }
    )}`,
    secondary: `USD $${value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })}`,
  };
}

export function formatMarketCap(
  value?: number,
  currency: string = "USD"
) {
  if (!value) {
    return {
      primary: "-",
      secondary: "",
    };
  }

  if (currency === "INR") {
    if (value >= 1e12) {
      return {
        primary: `₹ ${(value / 1e12).toFixed(2)} Lakh Cr`,
        secondary: "",
      };
    }

    if (value >= 1e10) {
      return {
        primary: `₹ ${(value / 1e7).toFixed(2)} Cr`,
        secondary: "",
      };
    }

    return {
      primary: `₹ ${value.toLocaleString("en-IN")}`,
      secondary: "",
    };
  }

  const usd =
    value >= 1e12
      ? `${(value / 1e12).toFixed(2)} T`
      : value >= 1e9
      ? `${(value / 1e9).toFixed(2)} B`
      : value.toLocaleString("en-US");

  const inr = value * USD_TO_INR;

  const inrText =
    inr >= 1e14
      ? `${(inr / 1e12).toFixed(2)} Lakh Cr`
      : `${inr.toLocaleString("en-IN")}`;

  return {
    primary: `₹ ${inrText}`,
    secondary: `USD ${usd}`,
  };
}

export function formatNumber(value?: number) {
  if (value === undefined || value === null)
    return "-";

  return value.toLocaleString("en-IN");
}

export function formatPercentage(value?: number) {
  if (value === undefined || value === null)
    return "-";

  return `${value.toFixed(2)}%`;
}