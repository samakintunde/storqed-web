import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import { parseWeight } from "../../utils/weight";
import { UPDATE_PRODUCT } from "../../context/ProductsContext/action-types";
import { Input, Button, Modal, InputNumber, Space, Row, Col } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const validationSchema = Yup.object({
  id: Yup.number().required("Required"),
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

type ProductEditRouteProps = {
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductEditRoute = (props: ProductEditRouteProps) => {
  const { visible, setVisible } = props;
  const history = useHistory();
  const { id } = useParams();
  // @ts-ignore
  const { products, dispatchProducts } = useProducts();

  const product = products[parseInt(id)];

  const formik = useFormik({
    initialValues: {
      ...product,
      weight: parseWeight(product?.weight)?.value,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatchProducts({
        type: UPDATE_PRODUCT,
        payload: values,
      });
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
  };

  return (
    <Modal visible={true} footer={null} onCancel={handleCancel}>
      <form onSubmit={formik.handleSubmit}>
        <Space style={{ width: "100%" }} size="small" direction="vertical">
          <label>
            <small>Name</small>
            <Input
              name="name"
              value={formik.values.name}
              defaultValue={product.name}
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
              width={100}
              value={formik.values.ean}
              defaultValue={product.ean}
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
              defaultValue={product.type}
            />
            {formik.errors.type && formik.touched.type && (
              <small className="color-danger">{formik.errors.type}</small>
            )}
          </label>
          <label>
            <small>Weight</small>
            <Input
              name="weight"
              value={formik.values.weight}
              defaultValue={product.weight}
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
              defaultValue={product.color}
            />
            {formik.errors.color && formik.touched.color && (
              <small className="color-danger">{formik.errors.color}</small>
            )}
          </label>
          <label>
            <small>Quantity</small>
            <Input
              name="quantity"
              type="number"
              value={formik.values.quantity}
              defaultValue={product.quantity}
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
              defaultValue={product.price}
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
