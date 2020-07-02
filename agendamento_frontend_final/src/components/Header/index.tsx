import React from "react";

import "./styles.css";
import logo from "../../assets/banner.png";

const Header = () => {
  return (
    <div id="header">
      <header>
        <img src={logo} alt="Agendamento" />
      </header>
    </div>
  );
};

export default Header;
