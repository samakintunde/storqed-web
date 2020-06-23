import React from "react";
import { Button, Row, Space } from "antd";
import { Link } from "react-router-dom";
import { PlusCircleFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const HomeRoute = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Row justify="center">
        <Space align="center" size="large" direction="vertical">
          <Link to="/products/create">
            <Button type="primary" icon={<PlusCircleFilled />}>
              {t("actions.add_product")}
            </Button>
          </Link>
          <Link to="/products">
            <Button>{t("actions.view_products")}</Button>
          </Link>
        </Space>
      </Row>
    </div>
  );
};

export default HomeRoute;
