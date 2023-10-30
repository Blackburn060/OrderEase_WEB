import React, { useState } from "react";
import "./NavigationBar.css";
import ImageLogo from "../Images/LogoExemplo.png";
import IconSearch from "../Images/IconeLupaBarraNavegacao.png";
import MenuIcon from "../Images/IconeHamburguerMenuLateral.png";
import CloseIcon from "../Images/IconeVoltarMenuLateral2.png";

function NavigationBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState(MenuIcon);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setMenuIcon(sidebarOpen ? MenuIcon : CloseIcon);

    // Adicione ou remova a classe 'open' com base no estado do menu
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      if (sidebarOpen) {
        sidebar.classList.add("open");
      } else {
        sidebar.classList.remove("open");
      }
    }
  };

  return (
    <div className="page">
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="menu-header">
          <span>Menu</span>
        </div>
        <div className="menu-icon-right">
          <img src={menuIcon} alt="Menu Icon" onClick={toggleSidebar} />
        </div>
        {/* Adicione os itens do menu aqui */}
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
      <div className="navbar">
        <div className="navbar-left">
          <img src={ImageLogo} alt="Logo da Empresa" className="logo" />
          <span>Nome da Empresa</span>
        </div>
        <div className="navbar-center">
          <img
            src={IconSearch}
            alt="Ícone de Pesquisa"
            className="search-icon"
          />
          <input type="text" placeholder="Pesquisar..." />
        </div>
        <div className="navbar-right">
          <span>Nome do Usuário</span>
          <img src={ImageLogo} alt="Logo do Usuário" className="user-logo" />
        </div>
      </div>
      <div className="footer">
        <span>Desenvolvido por TizDeveloper Inc.</span>
      </div>
    </div>
  );
}

export default NavigationBar;
