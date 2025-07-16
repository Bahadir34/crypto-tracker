// fiyati formatla
export const formatPrice = (price) => {
  if (!price) return "N/A";

  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else if (price < 100) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toLocaleString()}`; // sayiyi virgullu yazsin diye toLocalString() kullandik.
  }
};

// buyuk sayi formatla
export const formatBigNumber = (number) => {
  if (!number) return "N/A";

  if (number >= 1e12) {
    return `${(number / 1e12).toFixed(2)}T`;
  } else if (number >= 1e9) {
    return `${(number / 1e9).toFixed(2)}B`;
  } else if (number >= 1e6) {
    return `${(number / 1e6).toFixed(2)}M`;
  } else {
    return `${number.toLocaleString(2)}`;
  }
};
