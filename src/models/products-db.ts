import { IProduct } from "../components/products/ProductsList/products-list";
import LocalStorageHelper from "./db";

class ProductsDb {
  private static instance: ProductsDb;
  private db!: LocalStorageHelper;
  private dbKey: string = "PRODUCTS";

  constructor() {
    if (!ProductsDb.instance) {
      this.db = new LocalStorageHelper();
      this.db.init(this.dbKey, {});
      ProductsDb.instance = this;
    }
    return ProductsDb.instance;
  }

  addProduct(product: IProduct) {
    const products: { [key: string]: IProduct } = this.getProducts();
    products[product.id] = product;
    this.db.set(this.dbKey, products);
  }

  updateProduct(id: string, product: IProduct) {
    const products: { [key: string]: IProduct } = this.getProducts();
    products[product.id] = product;
    this.db.set(this.dbKey, products);
  }

  getProducts() {
    let products: { [key: string]: IProduct } = this.db.get(this.dbKey);
    if (typeof products === "string") {
      products = JSON.parse(products);
    }
    return products;
  }

  deleteProduct(product: IProduct) {
    const products = this.getProducts();

    delete products[product.id];

    this.db.set(this.dbKey, products);
  }
}

export const productsDb = new ProductsDb();

export default ProductsDb;
