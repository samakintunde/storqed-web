import { IProduct } from "../../components/products/ProductsList/products-list";
import { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "./action-types";
import productsData from "../../data/products";

type TProductsReducerState = IProduct[];

type TProductsReducerAction = {
  type: string;
  payload: IProduct;
};

type TProductsReducer = {
  state: TProductsReducerState;
  action: TProductsReducerAction;
};

const productsReducer = ({
  state = productsData,
  action,
}: TProductsReducer): IProduct[] => {
  const { payload, type } = action;

  switch (type) {
    case ADD_PRODUCT:
      return [...state, payload];

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
