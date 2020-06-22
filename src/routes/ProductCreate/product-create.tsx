import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SaveOutlined } from "@ant-design/icons";

type ProductCreateRouteProps = { onCreate: Function; onCancel: Function };

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  ean: Yup.string()
    .min(12, "EAN must at least be 12 digits")
    .max(16, "EAN must not be more than 16 digits")
    .required("EAN is required"),
  type: Yup.string().required("Product type is required"),
  weight: Yup.number().min(1),
  color: Yup.string(),
  active: Yup.bool().required(),
});

const ProductCreateRoute: React.FC<ProductCreateRouteProps> = (props) => {
  const { onCreate, onCancel } = props;
  const formik = useFormik({
    initialValues: {
      name: "",
      ean: "",
      type: "",
      weight: "",
      color: "",
      active: false,
      quantity: 0,
      price: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("stuff");
    },
  });

  return (
    <Modal
      visible={true}
      title="Create a new product"
      footer={[
        <Button>Cancel</Button>,
        <Button
          icon={<SaveOutlined color="#ffffff" />}
          type="primary"
          htmlType="submit"
          onClick={(event) => formik.handleSubmit()}
        >
          Save
        </Button>,
      ]}
    >
      <form onSubmit={formik.handleSubmit}></form>
    </Modal>
  );
};

export default ProductCreateRoute;
