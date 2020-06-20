import React from "react";
import productsReducer from "./reducer";
import productsData from "../../data/products";

const ProductsContext = React.createContext(productsData);

export const useProducts = () => React.useContext(ProductsContext);

type ProductsProviderProps = {
  children: React.ReactChildren;
};

const ProductsProvider: React.FC<ProductsProviderProps> = (props) => {
  const { children } = props;

  const [products, dispatchProducts] = React.useReducer(
    productsReducer,
    productsData
  );

  return (
    <ProductsContext.Provider value={{ products, dispatchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
