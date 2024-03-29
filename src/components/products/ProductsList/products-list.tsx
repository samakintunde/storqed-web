import React from "react";
import { Button, Space, Table } from "antd";
import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Breakpoint } from "antd/lib/_util/responsiveObserve";
import { useTranslation } from "react-i18next";

const { Column } = Table;

export interface IProduct {
  id: string;
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
  props?: {
    colSpan?: number;
  };
  responsive?: Breakpoint[];
};

type ProductsListProps = {
  headings: ProductListHeadingProps[];
  products: IProduct[];
  handleProductDelete: Function;
};

const ProductsList: React.FC<ProductsListProps> = (props) => {
  const { headings, products, handleProductDelete } = props;
  const { t } = useTranslation();

  return (
    <div>
      <Table dataSource={products}>
        {headings.map((heading) => (
          <Column
            title={heading.title}
            dataIndex={heading.dataIndex}
            key={heading.key}
            responsive={heading.responsive}
            colSpan={heading.props?.colSpan}
          />
        ))}
        <Column
          key="action"
          render={(record) => (
            <Space size="middle">
              <Link to={`/products/${record.id}`}>
                <Button icon={<EyeTwoTone />}>{t("actions.view")}</Button>
              </Link>
              <Link to={`/products/${record.id}/edit`}>
                <Button icon={<EditTwoTone />}>{t("actions.edit")}</Button>
              </Link>
              <Button
                icon={<DeleteTwoTone twoToneColor="#D47B6E" />}
                onClick={() => handleProductDelete(record)}
              >
                {t("actions.delete")}
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default ProductsList;
