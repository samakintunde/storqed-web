import React from "react";
import { PageHeader } from "antd";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useProducts } from "../../../context/ProductsContext";

type HeaderProps = {
  onBack?: () => void;
  title: string;
  subtitle?: string;
};

const Header: React.FC<HeaderProps> = (props) => {
  const { subtitle } = props;

  const history = useHistory();
  const matchesProduct = useRouteMatch("/products/:id");
  // @ts-ignore
  const { products } = useProducts();

  const getRoutes = (url: string) => {
    switch (url) {
      case "/":
        return {
          action: undefined,
          title: "Storqed",
        };
      case "/products":
        return {
          action: history.goBack,
          title: "All Products",
        };
      case "/products/edit":
        return {
          action: history.goBack,
          title: "Edit Product",
        };
      case "/products/create":
        return {
          action: history.goBack,
          title: "Create Product",
        };
      default:
        return {
          action: history.goBack,
          title: "Storqed",
        };
    }
  };

  const generateProps = (pathname: string) => {
    if (!matchesProduct) return getRoutes(pathname);

    return {
      action: history.goBack,
      // @ts-ignore
      title: matchesProduct.isExact && products[matchesProduct.params.id].name,
    };
  };

  return (
    <header>
      <PageHeader
        onBack={generateProps(history.location.pathname).action}
        title={generateProps(history.location.pathname).title}
        subTitle={subtitle}
      />
    </header>
  );
};

export default Header;
