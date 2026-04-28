export function formatPrice(price: number | string, currency: string = "USD") {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  
  return new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency: currency,
  }).format(numPrice);
}
