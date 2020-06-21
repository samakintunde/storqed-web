import React, { useState, useEffect } from "react";
import { IProduct } from "../../components/products/ProductsList/products-list";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button, Space, Checkbox, InputNumber } from "antd";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone, SaveTwoTone } from "@ant-design/icons";
import { useProducts } from "../../context/ProductsContext";

import styles from "./product.module.scss";
import { parseWeight } from "../../utils/weight";
import {
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../../context/ProductsContext/action-types";
import { productsDb } from "../../models/db";

type ProductProps = {
  product?: IProduct;
  isEditing?: boolean;
};

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

const Product: React.FC<ProductProps> = (props) => {
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  // @ts-ignore
  const { products, dispatchProducts } = useProducts();
  const productId = parseInt(id) - 1;
  const product = products[productId];

  // STATE
  const [isEditing, setIsEditing] = useState(
    // @ts-ignore
    location.state?.isEditing || false
  );

  const formik = useFormik({
    initialValues: {
      ...product,
      weight: parseWeight(product?.weight)?.value,
    },
    validationSchema,
    onSubmit: (values) => {
      setIsEditing(false);
      console.log(values);
      dispatchProducts({
        type: UPDATE_PRODUCT,
        payload: values,
      });
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleDelete = () => {
    dispatchProducts({
      type: DELETE_PRODUCT,
      payload: product,
    });
    history.goBack();
  };

  useEffect(() => {
    productsDb.update(products);
  }, [products]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Space direction="vertical" size={24}>
          <div>
            <label>
              <p>name</p>
              {!isEditing ? (
                product.name
              ) : (
                <>
                  <Input
                    name="name"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <small className="color-danger">{formik.errors.name}</small>
                  )}
                </>
              )}
            </label>
          </div>
          <div>
            <label>
              <p>EAN</p>
              {!isEditing ? (
                product.ean
              ) : (
                <>
                  <Input
                    name="ean"
                    value={formik.values.ean}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.ean && formik.touched.ean && (
                    <small className="color-danger">{formik.errors.ean}</small>
                  )}
                </>
              )}
            </label>
          </div>
          <div>
            <label>
              <p>Product Type</p>
              {!isEditing ? (
                product.name
              ) : (
                <>
                  <Input
                    name="type"
                    value={formik.values.type}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.type && formik.touched.type && (
                    <small className="color-danger">{formik.errors.type}</small>
                  )}
                </>
              )}
            </label>
          </div>
          <div>
            <label>
              <p>Weight</p>
              {!isEditing ? (
                product.weight
              ) : (
                <>
                  <InputNumber
                    name="weight"
                    value={formik.values.weight}
                    formatter={(value) => `${value} g`}
                    onBlur={formik.handleBlur}
                    onChange={(value) => formik.setFieldValue("weight", value)}
                  />
                  {formik.errors.weight && formik.touched.weight && (
                    <small className="color-danger">
                      {formik.errors.weight}
                    </small>
                  )}
                </>
              )}
            </label>
          </div>
          <div>
            <label>
              <p>Color</p>
              {!isEditing ? (
                product.color
              ) : (
                <>
                  <Input
                    name="color"
                    value={formik.values.color}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.color && formik.touched.color && (
                    <small className="color-danger">
                      {formik.errors.color}
                    </small>
                  )}
                </>
              )}
            </label>
          </div>
          <div>
            <label>
              <p>Quantity</p>
              {!isEditing ? (
                product.quantity
              ) : (
                <>
                  <InputNumber
                    name="quantity"
                    value={formik.values.quantity}
                    onBlur={formik.handleBlur}
                    onChange={(value) =>
                      formik.setFieldValue("quantity", value)
                    }
                  />

                  {formik.errors.quantity && formik.touched.quantity && (
                    <small className="color-danger">
                      {formik.errors.quantity}
                    </small>
                  )}
                </>
              )}
            </label>
          </div>
          <div>
            <label>
              <p>Price</p>
              {!isEditing ? (
                product.price
              ) : (
                <>
                  <InputNumber
                    name="price"
                    min={0}
                    formatter={(value) =>
                      `$ ${formik.values.price}`.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )
                    }
                    value={formik.values.price}
                    onBlur={formik.handleBlur}
                    onChange={(value) => formik.setFieldValue("price", value)}
                  />
                  {formik.errors.price && formik.touched.price && (
                    <small className="color-danger">
                      {formik.errors.price}
                    </small>
                  )}
                </>
              )}
            </label>
          </div>
          <div>
            <label>
              <p>Active</p>
              {!isEditing ? (
                <p>{product.active.toString()}</p>
              ) : (
                <>
                  <Checkbox
                    name="active"
                    checked={formik.values.active}
                    onChange={(e) =>
                      formik.setFieldValue("active", e.target.checked)
                    }
                  />
                  {formik.errors.active && formik.touched.active && (
                    <small className="color-danger">
                      {formik.errors.active}
                    </small>
                  )}
                </>
              )}
            </label>
          </div>
          <Space size="middle">
            {isEditing ? (
              <Button icon={<SaveTwoTone />} htmlType="submit">
                Save
              </Button>
            ) : (
              <Space>
                <Button
                  icon={<EditTwoTone />}
                  htmlType="button"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  icon={<DeleteTwoTone />}
                  htmlType="button"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Space>
            )}
          </Space>
        </Space>
      </form>
    </div>
  );
};

export default Product;
