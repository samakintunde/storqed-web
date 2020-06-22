import React from "react";
import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

const HomeRoute = () => {
  return (
    <div>
      <Row justify="center">
        <Col span={6} md={9}>
          <Link to="/products">
            <Button>View All Products</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default HomeRoute;
