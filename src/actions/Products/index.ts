import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../../context/ProductsContext/action-types";
import { IProduct } from "../../components/products/ProductsList/products-list";
import { ProductsReducerAction } from "../../context/ProductsContext";
import { productsDb } from "../../models/products-db";
import { priceHistoryDb } from "../../models/price-history-db";

export const addProduct = (
  dispatch: React.Dispatch<ProductsReducerAction>,
  payload: IProduct
) => {
  dispatch({
    type: ADD_PRODUCT,
    payload: payload,
  });
  productsDb.addProduct(payload);
  priceHistoryDb.addPriceHistory(payload);
};
export const updateProduct = (
  dispatch: React.Dispatch<ProductsReducerAction>,
  payload: IProduct
) => {
  dispatch({
    type: UPDATE_PRODUCT,
    payload: payload,
  });
  productsDb.updateProduct(payload.id, payload);
  priceHistoryDb.updatePriceHistory(payload);
};
export const deleteProduct = (
  dispatch: React.Dispatch<ProductsReducerAction>,
  payload: IProduct
) => {
  dispatch({
    type: DELETE_PRODUCT,
    payload: payload,
  });
  productsDb.deleteProduct(payload);
  priceHistoryDb.deletePriceHistory(payload);
};
