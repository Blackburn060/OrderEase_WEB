import LogoExemplo from "../Images/LogoExemplo.png";
import React from "react";
/* import { Link } from "react-router-dom"; */

function NavigationBar() {
  return (
    <nav>
    <img src={LogoExemplo} alt="Logo"></img>
      <p>Teste texto</p>
    </nav>
  );
}

export default NavigationBar;
