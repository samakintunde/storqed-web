import React, { useState } from "react";

import { Button, Space, Tabs } from "antd";
import { useParams, useHistory, Route, Link } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useProducts } from "../../context/ProductsContext";

import { IProduct } from "../../components/products/ProductsList/products-list";
import { formatPrice } from "../../utils/amount";
import ProductEditRoute from "../ProductEdit";
import { deleteProduct } from "../../actions/Products";

const { TabPane } = Tabs;

const ProductRoute: React.FC = () => {
  const [editVisible, setEditVisible] = useState(false);
  const history = useHistory();
  const { slug } = useParams();
  const { products, dispatchProducts } = useProducts();
  const product = products.products[slug];

  const handleDelete = () => {
    deleteProduct(dispatchProducts, product);
    history.goBack();
  };

  if (!product) return null;

  return (
    <div>
      <Tabs>
        <TabPane tab="Product Details" key={1}>
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
                <Link
                  to={{
                    pathname: `/products/${slug}/edit`,
                    state: {
                      background: history.location,
                    },
                  }}
                  onClick={() => setEditVisible(true)}
                >
                  <Button icon={<EditTwoTone />} htmlType="button">
                    Edit
                  </Button>
                </Link>
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
        </TabPane>
        <TabPane tab="Price History" key={2}>
          <h2>Price History</h2>
        </TabPane>
        <TabPane tab="Quantity History" key={3}>
          <h2>Quantity History</h2>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProductRoute;
