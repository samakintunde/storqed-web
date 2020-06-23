import LocalStorageHelper from "./db";
import { IProduct } from "../components/products/ProductsList/products-list";

interface IPriceHistory {
  [key: string]: number[];
}

class PriceHistoryDb {
  private static instance: PriceHistoryDb;
  private db!: LocalStorageHelper;
  private dbKey: string = "PRICE_HISTORY";

  constructor() {
    if (!PriceHistoryDb.instance) {
      this.db = new LocalStorageHelper();
      this.db.init(this.dbKey, {});
      PriceHistoryDb.instance = this;
    }
    return PriceHistoryDb.instance;
  }

  addPriceHistory(product: IProduct) {
    const priceHistories: IPriceHistory = this.db.get(this.dbKey);

    // Get the price history for the product
    let productPriceHistory = priceHistories[product.id];

    // Add a new array if it's the first of it's type
    if (!productPriceHistory) {
      priceHistories[product.id] = [product.price];
      this.db.set(this.dbKey, priceHistories);
      return;
    }

    // Check if a price history is up to 5
    if (productPriceHistory.length >= 5) {
      // Remove the last one(oldest)
      productPriceHistory.length = 4;
    }

    // Check for change in last saved price
    if (productPriceHistory[0] === product.price) return;

    // Add to index position
    productPriceHistory.unshift(product.price);
    this.db.set(this.dbKey, priceHistories);
  }

  updatePriceHistory(product: IProduct) {
    this.addPriceHistory(product);
  }

  deletePriceHistory(product: IProduct) {
    const priceHistories = this.getPriceHistories();
    const clonedPriceHistories = { ...priceHistories };
    delete clonedPriceHistories[product.id];
    this.db.set(this.dbKey, clonedPriceHistories);
  }

  getPriceHistory(id: string) {
    const priceHistories: IPriceHistory = this.db.get(this.dbKey);
    return priceHistories[id];
  }

  getPriceHistories() {
    const priceHistories: IPriceHistory = this.db.get(this.dbKey);
    return priceHistories;
  }
}

export const priceHistoryDb = new PriceHistoryDb();

export default PriceHistoryDb;
