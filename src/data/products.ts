import { IProduct } from "../components/products/ProductsList/products-list";

const products: IProduct[] = Array.from(Array(10), (item, index) => {
  const id = ++index;

  return {
    id: id + "",
    name: `Product ${id}`,
    ean: `${Math.floor(Math.random() * id * 1_000_000_000)}`,
    type: "Product Type",
    weight: `${id}00g`,
    color: "red",
    active: true,
    quantity: id,
    price: id * 1000,
  };
});

export default products;
