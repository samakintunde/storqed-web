import React from "react";
import { PageHeader } from "antd";
import { useLocation, useHistory } from "react-router-dom";

type HeaderProps = {
  onBack?: () => void;
  title: string;
  subtitle?: string;
};

const Header: React.FC<HeaderProps> = (props) => {
  const { onBack, title, subtitle } = props;

  const location = useLocation();
  const history = useHistory();

  return (
    <header>
      <PageHeader
        onBack={location.pathname === "/" ? undefined : history.goBack}
        title={title}
        subTitle={subtitle}
      />
    </header>
  );
};

export default Header;
