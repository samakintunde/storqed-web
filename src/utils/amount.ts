const formatPrice = (price: string) => {
  return price
    .toString()
    .replace(",", "")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export { formatPrice };
