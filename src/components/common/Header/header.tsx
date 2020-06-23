import React, { useState } from "react";
import { PageHeader, Select } from "antd";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const Header: React.FC = () => {
  const history = useHistory();
  const [isHome, setIsHome] = useState(history.location.pathname === "/");
  const { t, i18n } = useTranslation();

  history.listen((location) => {
    location.pathname === "/" ? setIsHome(true) : setIsHome(false);
  });

  return (
    <header>
      <PageHeader
        onBack={isHome ? undefined : () => history.goBack()}
        title="Storqed"
        extra={[
          <Select
            defaultValue={
              i18n.language || localStorage.getItem("i18nextLng") || "en-US"
            }
            style={{ width: 120 }}
            onChange={(value) => i18n.changeLanguage(value)}
          >
            <Option value="en-US">{t("languages.english")}</Option>
            <Option value="fr">{t("languages.french")}</Option>
          </Select>,
        ]}
      />
    </header>
  );
};

export default Header;
