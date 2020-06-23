import React, { useCallback } from "react";
import { Layout, Space, Button, Row } from "antd";
import ProductsList from "../../components/products/ProductsList";
import { useProducts } from "../../context/ProductsContext";
import { IProduct } from "../../components/products/ProductsList/products-list";
import { Link } from "react-router-dom";
import { PlusCircleFilled } from "@ant-design/icons";
import { deleteProduct } from "../../actions/Products";

const { Content } = Layout;

const Products = () => {
  const { products, dispatchProducts } = useProducts();

  const handleDelete = useCallback(
    (product: IProduct) => {
      deleteProduct(dispatchProducts, product);
    },
    [dispatchProducts]
  );

  return (
    <Layout>
      <Content style={{ padding: "50px 50px 0" }}>
        <Space style={{ width: "100%" }} direction="vertical" size="large">
          <Row justify="space-between">
            <h2>All Products</h2>
            <Link to="/products/create">
              <Button type="primary" icon={<PlusCircleFilled />}>
                Add a Product
              </Button>
            </Link>
          </Row>
          <ProductsList
            headings={[
              {
                key: "name",
                dataIndex: "name",
                title: "Name",
                props: {
                  colSpan: 1,
                },
              },
              {
                key: "type",
                dataIndex: "type",
                title: "Product Type",
                responsive: ["lg"],
              },
              {
                key: "quantity",
                dataIndex: "quantity",
                title: "Quantity",
                responsive: ["sm"],
              },
              {
                key: "price",
                dataIndex: "price",
                title: "Price",
                responsive: ["md"],
              },
            ]}
            products={Object.values(products.products)}
            handleProductDelete={handleDelete}
          />
        </Space>
      </Content>
    </Layout>
  );
};

export default Products;
