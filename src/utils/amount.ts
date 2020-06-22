const formatPrice = (price: string | number) => {
  return price
    .toString()
    .replace(",", "")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export { formatPrice };
