import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import { parseWeight } from "../../utils/weight";
import { Input, Button, Modal, Space, Row, Col, Checkbox } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { updateProduct } from "../../actions/Products";

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

type ProductEditRouteProps = {
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductEditRoute = (props: ProductEditRouteProps) => {
  const { visible, setVisible } = props;
  const history = useHistory();
  const { slug } = useParams();
  const { products, dispatchProducts } = useProducts();

  const product = products.products[slug];

  // @ts-ignore
  const { value: weight, unit } = parseWeight(product?.weight);

  const formik = useFormik({
    initialValues: {
      ...product,
      weight,
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        ean: values.ean,
        weight: values.weight + unit,
        price: values.price,
      };

      updateProduct(dispatchProducts, payload);
      history.goBack();
    },
  });

  if (!product) {
    history.replace("/products");
    return null;
  }

  const handleCancel = () => {
    if (history.location.state) {
      // @ts-ignore
      history.replace(history.location.state.pathname);
    }
    if (setVisible) setVisible(false);
    history.goBack();
  };

  return (
    <Modal visible={visible || true} footer={null} onCancel={handleCancel}>
      <form onSubmit={formik.handleSubmit}>
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
          <Row justify="end">
            <Col>
              <Button onClick={() => handleCancel()}>Cancel</Button>,
            </Col>
            <Col>
              <Button
                icon={<SaveOutlined color="#ffffff" />}
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Col>
          </Row>
        </Space>
      </form>
    </Modal>
  );
};

export default ProductEditRoute;
