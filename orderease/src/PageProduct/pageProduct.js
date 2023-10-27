import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PageProduct.css";
import Images from "../Images/LogoExemplo.png";

function NavigationBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div id="header">
        <div>
          <span id="menu-toggle" onClick={toggleSidebar}>
            &#9776;
          </span>
          <img id="logo" src={Images} alt="Logo da Empresa" />
          <span id="company-name">OrderEase</span>
          <div id="sidebar" style={{ left: sidebarOpen ? "0px" : "-250px" }}>
            {/* Conteúdo do menu lateral pode ser adicionado aqui */}
          </div>
        </div>
        <div id="search-bar-container">
          <input type="text" id="search-bar" placeholder="Pesquisar..." />
        </div>
        <span id="user-name">
          Marcelo Tizo
          <img id="user-photo" src={Images} alt="Foto de Perfil" />
        </span>
      </div>

      <div id="footer">Desenvolvido por TizDeveloper Inc.</div>
    </div>
  );
}

export default NavigationBar;
