import React from "react";
import { Button, Space, Table } from "antd";
import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from "@ant-design/icons";
import { useHistory, useLocation, Link } from "react-router-dom";

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
  const location = useLocation();

  const handleViewClick = (record: IProduct) => {
    history.push(`/products/${record.id}`);
  };

  const handleEditClick = (record: IProduct) => {
    history.push(`/products/${record.id}/edit`, {
      background: location,
    });
  };

  const handleDelete = (record: IProduct) => {
    handleProductDelete(record);
  };

  return (
    <div>
      <Table
        dataSource={products}
        onRow={(record) => ({
          onClick: () => handleViewClick(record),
        })}
      >
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
              <Link to={`/products/${record.id}/edit`}>
                <Button
                  icon={<EditTwoTone />}
                  onClick={() => handleEditClick(record)}
                >
                  Edit
                </Button>
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
