import React from "react";
import { Button, Space, Table } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

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
};

const ProductsList: React.FC<ProductsListProps> = (props) => {
  const { headings, products } = props;
  const history = useHistory();

  const handleViewClick = (record: IProduct) => {
    history.push(`/products/${record.id}`);
  };

  const handleEditClick = (record: IProduct) => {
    history.push(`/products/${record.id}`, {
      isEditing: true,
    });
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
              <Button icon={<DeleteTwoTone />}>Delete</Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default ProductsList;
