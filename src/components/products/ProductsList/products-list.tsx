import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from "@ant-design/icons";
import { useHistory, useLocation, Link, Route } from "react-router-dom";
import ProductEditRoute from "../../../routes/ProductEdit";

const { Column } = Table;

export interface IProduct {
  id: number;
  name: string;
  ean: string;
  type: string;
  weight?: string;
  color: string;
  active: boolean;
  quantity: number;
  price: number;
}

type ProductListHeadingProps = {
  title: string;
  dataIndex: string;
  key: string;
};

type ProductsListProps = {
  headings: ProductListHeadingProps[];
  products: IProduct[];
  handleProductDelete: Function;
};

const ProductsList: React.FC<ProductsListProps> = (props) => {
  const { headings, products, handleProductDelete } = props;

  const location = useLocation();

  const handleDelete = (record: IProduct) => {
    handleProductDelete(record);
  };

  return (
    <div>
      <Table dataSource={products}>
        {headings.map((heading) => (
          <Column
            title={heading.title}
            dataIndex={heading.dataIndex}
            key={heading.key}
          />
        ))}
        <Column
          key="action"
          render={(record) => (
            <Space size="middle">
              <Link to={`/products/${record.id}`}>
                <Button icon={<EyeTwoTone />}>View</Button>
              </Link>
              <Link
                to={{
                  pathname: `/products/${record.id}/edit`,
                  state: {
                    background: location,
                  },
                }}
              >
                <Button icon={<EditTwoTone />}>Edit</Button>
              </Link>
              <Button
                icon={<DeleteTwoTone twoToneColor="#D47B6E" />}
                onClick={() => handleDelete(record)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default ProductsList;
