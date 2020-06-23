import React from "react";
import { PageHeader } from "antd";
import { useHistory } from "react-router-dom";

type HeaderProps = {
  onBack?: () => void;
  title: string;
  subtitle?: string;
};

const Header: React.FC<HeaderProps> = (props) => {
  const { subtitle } = props;

  const history = useHistory();

  return (
    <header>
      <PageHeader
        onBack={history.location.pathname === "/" ? undefined : history.goBack}
        title="Storqed"
        subTitle={subtitle}
      />
    </header>
  );
};

export default Header;
