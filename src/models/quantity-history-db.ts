import LocalStorageHelper from "./db";
import { IProduct } from "../components/products/ProductsList/products-list";

interface IQuantityHistory {
  [key: string]: number[];
}

class QuantityHistoryDb {
  private static instance: QuantityHistoryDb;
  private db!: LocalStorageHelper;
  private dbKey: string = "QUANTITY_HISTORY";

  constructor() {
    if (!QuantityHistoryDb.instance) {
      this.db = new LocalStorageHelper();
      this.db.init(this.dbKey, {});
      QuantityHistoryDb.instance = this;
    }
    return QuantityHistoryDb.instance;
  }

  addQuantityHistory(product: IProduct) {
    const quantityHistories: IQuantityHistory = this.db.get(this.dbKey);

    // Get the quantity history for the product
    let productQuantityHistory = quantityHistories[product.id];

    // Add a new array if it's the first of it's type
    if (!productQuantityHistory) {
      quantityHistories[product.id] = [product.quantity];
      this.db.set(this.dbKey, quantityHistories);
      return;
    }

    // Check if a quantity history is up to 5
    if (productQuantityHistory.length >= 5) {
      // Remove the last one(oldest)
      productQuantityHistory.length = 4;
    }

    // Check for change in last saved quantity
    if (productQuantityHistory[0] === product.quantity) return;

    // Add to index position
    productQuantityHistory.unshift(product.quantity);
    this.db.set(this.dbKey, quantityHistories);
  }

  updateQuantityHistory(product: IProduct) {
    this.addQuantityHistory(product);
  }

  deleteQuantityHistory(product: IProduct) {
    const quantityHistories = this.getQuantityHistories();
    const clonedQuantityHistories = { ...quantityHistories };
    delete clonedQuantityHistories[product.id];
    this.db.set(this.dbKey, clonedQuantityHistories);
  }

  getPriceHistory(id: string) {
    const quantityHistories: IQuantityHistory = this.db.get(this.dbKey);
    return quantityHistories[id];
  }

  getQuantityHistories() {
    const quantityHistories: IQuantityHistory = this.db.get(this.dbKey);
    return quantityHistories;
  }
}

export const quantityHistoryDb = new QuantityHistoryDb();

export default QuantityHistoryDb;
