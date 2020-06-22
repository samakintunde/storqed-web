import React, { useEffect, useState } from "react";
import { IProduct } from "../../components/products/ProductsList/products-list";

import { Button, Space } from "antd";
import {
  useParams,
  useLocation,
  useHistory,
  Link,
  Route,
} from "react-router-dom";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useProducts } from "../../context/ProductsContext";

import { DELETE_PRODUCT } from "../../context/ProductsContext/action-types";
import { productsDb } from "../../models/db";
import { formatPrice } from "../../utils/amount";
import ProductEditRoute from "../ProductEdit";

type ProductRouteProps = {
  product?: IProduct;
  isEditing?: boolean;
};

const ProductRoute: React.FC<ProductRouteProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  // @ts-ignore
  const { products, dispatchProducts } = useProducts();
  const product = products[parseInt(id)];
  console.log("object");

  const handleDelete = () => {
    dispatchProducts({
      type: DELETE_PRODUCT,
      payload: product,
    });
    history.goBack();
  };

  useEffect(() => {
    console.log("render");
    productsDb.update(products);
  }, [products]);

  return (
    <div>
      <Space direction="vertical" size={16}>
        <div>
          <p>Name</p>
          <p>{product.name}</p>
        </div>
        <div>
          <p>EAN</p>
          {product.ean}
        </div>
        <div>
          <p>Product Type</p>
          {product.type}
        </div>
        <div>
          <p>Weight</p>
          {product.weight}
        </div>
        <div>
          <p>Color</p>
          {product.color}
        </div>
        <div>
          <p>Quantity</p>
          {product.quantity}
        </div>
        <div>
          <p>Price</p>
          <>${formatPrice(product.price)}</>
        </div>
        <div>
          <p>Active</p>
          <p>{product.active.toString()}</p>
        </div>
        <Space size="middle">
          <Space>
            <Button
              icon={<EditTwoTone />}
              htmlType="button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              icon={<DeleteTwoTone twoToneColor="#D47B6E" />}
              htmlType="button"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Space>
        </Space>
      </Space>
      {isEditing && (
        <Route to={`/products/${product.id}/edit`}>
          <ProductEditRoute visible={isEditing} setVisible={setIsEditing} />
        </Route>
      )}
    </div>
  );
};

export default ProductRoute;
