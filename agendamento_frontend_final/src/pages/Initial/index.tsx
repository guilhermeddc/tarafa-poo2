import React from "react";

import "./styles.css";
import logo from "../../assets/banner.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div id="header">
      <header>
        <img src={logo} alt="Agendamento" />
        <Link className="link" to="Home">
          Entrar
        </Link>
      </header>
    </div>
  );
};

export default Header;
