import React, { useEffect, useCallback } from "react";
import { Layout } from "antd";
import ProductsList from "../../components/products/ProductsList";
import { useProducts } from "../../context/ProductsContext";
import { IProduct } from "../../components/products/ProductsList/products-list";
import { DELETE_PRODUCT } from "../../context/ProductsContext/action-types";
import { productsDb } from "../../models/db";

const { Content } = Layout;

const Products = () => {
  // @ts-ignore
  const { products, dispatchProducts } = useProducts();

  const handleDelete = useCallback(
    (product: IProduct) => {
      dispatchProducts({
        type: DELETE_PRODUCT,
        payload: product,
      });
    },
    [dispatchProducts]
  );

  useEffect(() => {
    productsDb.update(products);
  }, [products]);

  return (
    <Layout>
      <Content style={{ padding: "50px 50px 0" }}>
        <ProductsList
          headings={[
            {
              key: "id",
              dataIndex: "id",
              title: "ID",
            },
            {
              key: "name",
              dataIndex: "name",
              title: "Name",
            },
            {
              key: "weight",
              dataIndex: "quantity",
              title: "Quantity",
            },
            {
              key: "type",
              dataIndex: "type",
              title: "Type",
            },
            {
              key: "price",
              dataIndex: "price",
              title: "Price",
            },
          ]}
          products={products}
          handleProductDelete={handleDelete}
        />
      </Content>
    </Layout>
  );
};

export default Products;
