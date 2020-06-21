import React from "react";
import productsReducer from "./reducer";
import productsData from "../../data/products";

export const initialState = [...productsData];

const ProductsContext = React.createContext(initialState);

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
    // @ts-ignore
    <ProductsContext.Provider value={{ products, dispatchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
