import React from "react";
import productsReducer from "./reducer";
import { IProduct } from "../../components/products/ProductsList/products-list";
import { productsDb } from "../../models/products-db";
import { priceHistoryDb } from "../../models/price-history-db";

export interface IProductsContext {
  products: {
    [key: string]: IProduct;
  };
  types: string[];
  priceHistory: {};
  quantityHistory: {};
}

export type ProductsReducerAction = {
  type: string;
  payload: IProduct;
};

export interface IProductsContextProps {
  products: IProductsContext;
  dispatchProducts: React.Dispatch<ProductsReducerAction>;
}

export const initialState: IProductsContext = {
  products: productsDb.getProducts(),
  types: [],
  priceHistory: priceHistoryDb.getPriceHistories(),
  quantityHistory: {},
};

const ProductsContext = React.createContext({} as IProductsContextProps);

export const useProducts = () => React.useContext(ProductsContext);

type ProductsProviderProps = {
  children: React.ReactChildren;
};

const ProductsProvider = (props: ProductsProviderProps) => {
  const { children } = props;

  const [products, dispatchProducts] = React.useReducer(
    productsReducer,
    initialState
  );

  return (
    <ProductsContext.Provider value={{ products, dispatchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
