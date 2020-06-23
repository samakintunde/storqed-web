import React, { useCallback } from "react";
import { Layout, Space, Button, Row } from "antd";
import ProductsList from "../../components/products/ProductsList";
import { useProducts } from "../../context/ProductsContext";
import { IProduct } from "../../components/products/ProductsList/products-list";
import { Link } from "react-router-dom";
import { PlusCircleFilled } from "@ant-design/icons";
import { deleteProduct } from "../../actions/Products";
import { useTranslation } from "react-i18next";

const { Content } = Layout;

const Products = () => {
  const { products, dispatchProducts } = useProducts();
  const { t } = useTranslation();

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
            <h2>{t("products.title")}</h2>
            <Link to="/products/create">
              <Button type="primary" icon={<PlusCircleFilled />}>
                {t("actions.add_product")}
              </Button>
            </Link>
          </Row>
          <ProductsList
            headings={[
              {
                key: "name",
                dataIndex: "name",
                title: t("form_label.name"),
                props: {
                  colSpan: 1,
                },
              },
              {
                key: "type",
                dataIndex: "type",
                title: t("form_label.type"),
                responsive: ["lg"],
              },
              {
                key: "quantity",
                dataIndex: "quantity",
                title: t("form_label.quantity"),
                responsive: ["sm"],
              },
              {
                key: "price",
                dataIndex: "price",
                title: t("form_label.name"),
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
