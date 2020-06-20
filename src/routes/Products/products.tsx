import React from "react";
import { Layout } from "antd";
import ProductsList from "../../components/products/ProductsList";
import products from "../../data/products";

const { Content } = Layout;

const Products = () => {
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
              key: "price",
              dataIndex: "price",
              title: "Price",
            },
          ]}
          products={products}
        />
      </Content>
    </Layout>
  );
};

export default Products;
