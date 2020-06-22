import { IProduct } from "../../components/products/ProductsList/products-list";
import { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "./action-types";
import { initialState } from ".";

type ProductsReducerAction = {
  type: string;
  payload: IProduct;
};

const productsReducer = (
  state: IProduct[] = initialState,
  action: ProductsReducerAction
) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_PRODUCT:
      const newProducts = [...state, payload];
      return newProducts;

    case UPDATE_PRODUCT:
      let updatedProducts = state.map((product) => {
        if (product.id === payload.id) {
          product = payload;
        }
        return product;
      });
      return updatedProducts;

    case DELETE_PRODUCT:
      let filteredProducts = state.filter(
        (product) => product.id !== payload.id
      );
      return filteredProducts;

    default:
      return state;
  }
};

export default productsReducer;
