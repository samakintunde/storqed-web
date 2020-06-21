import { IProduct } from "../components/products/ProductsList/products-list";

class LocalStorageHelper {
  add(key: string, value: any) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  get(key: string) {
    const data = localStorage.getItem(key);
    if (!data) return null;

    const item = JSON.parse(data);
    return item;
  }

  set(key: string, value: any) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  reset() {
    localStorage.clear();
  }
}

class ProductsDb {
  private static instance: ProductsDb;
  private db!: LocalStorageHelper;
  private productsDbKey: string = "products";

  constructor() {
    if (!ProductsDb.instance) {
      this.db = new LocalStorageHelper();
      ProductsDb.instance = this;
    }
    return ProductsDb.instance;
  }

  addProduct(product: IProduct) {
    const products = this.getProducts();
    products.push(product);
    this.db.add(this.productsDbKey, products);
  }

  update(products: IProduct[]) {
    const data = JSON.stringify(products);
    this.db.add(this.productsDbKey, data);
  }

  getProducts(): IProduct[] {
    const products = this.db.get(this.productsDbKey);
    return products;
  }

  deleteProduct(product: IProduct) {
    const products = this.getProducts();

    const filteredProducts = products.filter(
      (_product) => _product.id !== product.id
    );

    this.db.set(this.productsDbKey, filteredProducts);
  }
}

export const productsDb = new ProductsDb();

export default ProductsDb;
