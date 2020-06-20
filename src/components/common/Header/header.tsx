import React from "react";
import { PageHeader } from "antd";

type HeaderProps = {
  onBack?: () => void;
  title: string;
  subtitle?: string;
};

const Header: React.FC<HeaderProps> = (props) => {
  const { onBack, title, subtitle } = props;

  return (
    <header>
      <PageHeader onBack={onBack} title={title} subTitle={subtitle} />
    </header>
  );
};

export default Header;
