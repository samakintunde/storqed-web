import React from "react";
import { Button, Space, Table } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useProducts } from "../../../context/ProductsContext";
import { DELETE_PRODUCT } from "../../../context/ProductsContext/action-types";

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
  const history = useHistory();
  // @ts-ignore

  const handleViewClick = (record: IProduct) => {
    history.push(`/products/${record.id}`);
  };

  const handleEditClick = (record: IProduct) => {
    history.push(`/products/${record.id}`, {
      isEditing: true,
    });
  };

  const handleDelete = (record: IProduct) => {
    handleProductDelete(record);
  };

  return (
    <div>
      <Table dataSource={products}>
        {headings.map((heading, index) => (
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
              <Button onClick={() => handleViewClick(record)}>View</Button>
              <Button
                icon={<EditTwoTone />}
                onClick={() => handleEditClick(record)}
              >
                Edit
              </Button>
              <Button
                icon={<DeleteTwoTone />}
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
