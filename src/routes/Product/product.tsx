import React from "react";
import { Button, Space, Tabs } from "antd";
import { useParams, useHistory, Link } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Options as HighChartsOptions } from "highcharts";
import { Helmet } from "react-helmet";
import LineChart from "../../components/product/LineChart";
import { useProducts } from "../../context/ProductsContext";
import { formatPrice } from "../../utils/amount";
import { deleteProduct } from "../../actions/Products";
import { priceHistoryDb } from "../../models/price-history-db";
import { quantityHistoryDb } from "../../models/quantity-history-db";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const generateChartsOptions = (
  data: number[],
  options: HighChartsOptions
): HighChartsOptions => {
  return {
    ...options,
    title: {
      text: "",
    },
    series: [
      {
        type: "line",
        data,
        name: "",
      },
    ],
  };
};

const ProductRoute: React.FC = () => {
  const history = useHistory();
  const { slug } = useParams();
  const { products, dispatchProducts } = useProducts();
  const product = products.products[slug];
  const { t } = useTranslation();

  if (!product) return null;

  const priceChartOptions: HighChartsOptions = generateChartsOptions(
    priceHistoryDb.getPriceHistories()[product.id].reverse(),
    {
      yAxis: {
        title: {
          text: t("price"),
        },
      },
      tooltip: {
        formatter: function() {
          return `${t("price")}: <strong>$${formatPrice(this.y)}</strong>`;
        },
      },
    }
  );
  const quantityChartOptions: HighChartsOptions = generateChartsOptions(
    quantityHistoryDb.getQuantityHistories()[product.id].reverse(),
    {
      yAxis: {
        title: {
          text: t("quantity"),
        },
      },
      tooltip: {
        formatter: function() {
          return `${t("quantity")}: <strong>${this.y}</strong>`;
        },
      },
    }
  );

  const handleDelete = () => {
    deleteProduct(dispatchProducts, product);
    history.goBack();
  };

  return (
    <div>
      <Helmet>
        <title>{product.name} | Storqed</title>
      </Helmet>
      <Tabs>
        <TabPane tab={t("product.tab_header.product_details")} key={1}>
          <Space direction="vertical" size={16}>
            <div>
              <p>{t("form_label.name")}</p>
              <p>{product.name}</p>
            </div>
            <div>
              <p>{t("form_label.ean")}</p>
              {product.ean}
            </div>
            <div>
              <p>{t("form_label.type")}</p>
              {product.type}
            </div>
            <div>
              <p>{t("form_label.weight")}</p>
              {product.weight}
            </div>
            <div>
              <p>{t("form_label.color")}</p>
              {product.color}
            </div>
            <div>
              <p>{t("form_label.quantity")}</p>
              {product.quantity}
            </div>
            <div>
              <p>{t("form_label.price")}</p>
              <>${formatPrice(product.price)}</>
            </div>
            <div>
              <p>{t("form_label.active")}</p>
              <p>{product.active.toString()}</p>
            </div>
            <Space size="middle">
              <Space>
                <Link
                  to={{
                    pathname: `/products/${slug}/edit`,
                    state: {
                      background: history.location,
                    },
                  }}
                >
                  <Button icon={<EditTwoTone />} htmlType="button">
                    {t("actions.edit")}
                  </Button>
                </Link>
                <Button
                  icon={<DeleteTwoTone twoToneColor="#D47B6E" />}
                  htmlType="button"
                  onClick={handleDelete}
                >
                  {t("actions.delete")}
                </Button>
              </Space>
            </Space>
          </Space>
        </TabPane>

        <TabPane tab={t("product.tab_header.price_history")} key={2}>
          <LineChart options={priceChartOptions} />
        </TabPane>
        <TabPane tab={t("product.tab_header.quantity_history")} key={3}>
          <LineChart options={quantityChartOptions} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProductRoute;
