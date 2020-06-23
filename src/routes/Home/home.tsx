import React from "react";
import { Button, Col, Row, Space } from "antd";
import { Link } from "react-router-dom";
import { PlusCircleFilled } from "@ant-design/icons";

const HomeRoute = () => {
  return (
    <div>
      <Row justify="center">
        <Space size="small" direction="vertical">
          <Link to="/products/create">
            <Button type="primary" icon={<PlusCircleFilled />}>
              Add a Product
            </Button>
          </Link>
          <Link to="/products">
            <Button>View All Products</Button>
          </Link>
        </Space>
      </Row>
    </div>
  );
};

export default HomeRoute;
