import React from "react";
import { Button, Space, Table } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

const { Column } = Table;

export type Product = {
  id: number;
  name: string;
  ean: string;
  type: string;
  weight?: string;
  color: string;
  active: boolean;
  quantity: number;
  price: number;
};

type ProductListHeadingProps = {
  title: string;
  dataIndex: string;
  key: string;
};

type ProductsListProps = {
  headings: ProductListHeadingProps[];
  products: Object[];
};

const ProductsList: React.FC<ProductsListProps> = (props) => {
  const { headings, products } = props;

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
          render={(text, record) => (
            <Space size="middle">
              <Button>View</Button>
              <Button icon={<EditTwoTone />}>Edit</Button>
              <Button icon={<DeleteTwoTone />}>Delete</Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default ProductsList;
