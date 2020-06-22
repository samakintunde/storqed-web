import React from "react";
import { Button, Input, Space, Row, Col, Checkbox } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useProducts } from "../../context/ProductsContext";
import { v4 as uuid } from "uuid";
import { addProduct } from "../../actions/Products";
import { useHistory } from "react-router-dom";

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
  price: Yup.number().required("Price is required"),
});

const ProductCreateRoute: React.FC = () => {
  const { dispatchProducts } = useProducts();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      ean: "",
      type: "",
      weight: "",
      color: "",
      active: false,
      quantity: 0,
      price: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      const id = uuid();
      const payload = {
        ...values,
        id,
        ean: values.ean + "",
        weight: values.weight + "g",
      };
      addProduct(dispatchProducts, payload);
      console.log(id);
      history.replace(`/products/${id}`);
    },
  });

  return (
    <Row>
      <Col span={12}>
        <form onSubmit={formik.handleSubmit}>
          <h4>Add Product</h4>
          <Space style={{ width: "100%" }} size="small" direction="vertical">
            <label>
              <small>Name</small>
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name && (
                <small className="color-danger">{formik.errors.name}</small>
              )}
            </label>
            <label>
              <small>EAN</small>
              <Input
                name="ean"
                type="number"
                value={formik.values.ean}
                onChange={formik.handleChange}
              />
              {formik.errors.ean && formik.touched.ean && (
                <small className="color-danger">{formik.errors.ean}</small>
              )}
            </label>
            <label>
              <small>Type</small>
              <Input
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
              />
              {formik.errors.type && formik.touched.type && (
                <small className="color-danger">{formik.errors.type}</small>
              )}
            </label>
            <label>
              <small>Weight</small>
              <Input
                name="weight"
                type="number"
                value={formik.values.weight}
                onChange={formik.handleChange}
              />
              {formik.errors.weight && formik.touched.weight && (
                <small className="color-danger">{formik.errors.weight}</small>
              )}
            </label>
            <label>
              <small>Color</small>
              <Input
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
              />
              {formik.errors.color && formik.touched.color && (
                <small className="color-danger">{formik.errors.color}</small>
              )}
            </label>
            <label>
              <Space>
                <small>Active</small>
                <Checkbox
                  name="active"
                  checked={formik.values.active}
                  onChange={(event) =>
                    formik.setFieldValue("active", event.target.checked)
                  }
                />
              </Space>
              {formik.errors.active && formik.touched.active && (
                <small className="color-danger">{formik.errors.active}</small>
              )}
            </label>
            <label>
              <small>Quantity</small>
              <Input
                name="quantity"
                type="number"
                value={formik.values.quantity}
                onChange={formik.handleChange}
              />
              {formik.errors.quantity && formik.touched.quantity && (
                <small className="color-danger">{formik.errors.quantity}</small>
              )}
            </label>
            <label>
              <small>Price</small>
              <Input
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              {formik.errors.price && formik.touched.price && (
                <small className="color-danger">{formik.errors.price}</small>
              )}
            </label>
            <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Space>
        </form>
      </Col>
    </Row>
  );
};

export default ProductCreateRoute;
