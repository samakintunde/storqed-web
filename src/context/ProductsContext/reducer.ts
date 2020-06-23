import { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "./action-types";
import { IProductsContext, ProductsReducerAction } from ".";

const productsReducer = (
  state: IProductsContext,
  action: ProductsReducerAction
) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: { ...state.products, [payload.id]: payload },
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: { ...state.products, [payload.id]: payload },
      };

    case DELETE_PRODUCT:
      const clonedState = { ...state };
      delete clonedState.products[payload.id];
      return clonedState;

    default:
      return state;
  }
};

export default productsReducer;
