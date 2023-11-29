import React, { useState, useEffect } from "react";
import "./NavigationBar.css";
import UserLogo from "../../assets/Images/IconeUserLoginPage.png";
import IconSearch from "../../assets/Images/IconeLupaBarraNavegacao.png";
import MenuIcon from "../../assets/Images/IconeHamburguerMenuLateral.png";
import CloseIcon from "../../assets/Images/IconeVoltarMenuLateral2.png";
import { Link } from "react-router-dom";

function NavigationBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState(MenuIcon);
  const [overlayVisible, setOverlayVisible] = useState(false); // Novo estado para a tela de sobreposição
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    logoUrl: "",
  });

  useEffect(() => {
    // Adicione um event listener para detectar cliques no documento inteiro
    document.addEventListener("click", handleDocumentClick);

    fetchCompanyInfo();

    return () => {
      // Remova o event listener ao desmontar o componente
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setMenuIcon(sidebarOpen ? MenuIcon : CloseIcon);
    setOverlayVisible(!overlayVisible); // Mostrar ou esconder a tela de sobreposição
  };

  const handleDocumentClick = (e) => {
    // Verifique se o clique ocorreu fora do menu lateral
    const sidebar = document.querySelector(".sidebar");
    if (sidebar && !sidebar.contains(e.target)) {
      setSidebarOpen(false);
      setMenuIcon(MenuIcon);
      setOverlayVisible(false); // Esconder a tela de sobreposição
    }
  };

  const fetchCompanyInfo = async () => {
    try {
      const response = await fetch(
        "https://orderease-api.up.railway.app/api/obter-configuracoes"
      );
      if (response.ok) {
        const data = await response.json();
        setCompanyInfo({
          name: data.companyName,
          logoUrl: data.companyLogo,
        });
      } else {
        console.error(
          "Erro ao obter informações da empresa:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erro durante a solicitação para o servidor:", error);
    }
  };

  return (
    <div className="page">
      {overlayVisible && (
        <div className="SideBarOverlay" onClick={toggleSidebar} />
      )}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="menu-header">
          <span>Menu</span>
        </div>
        <div className="menu-icon-right">
          <img src={menuIcon} alt="Menu Icon" onClick={toggleSidebar} />
        </div>
        <ul>
          <li>
            <Link to="/home" onClick={toggleSidebar}>
              Início
            </Link>
          </li>
          <li>
            <Link to="/pageProduct" onClick={toggleSidebar}>
              Produtos
            </Link>
          </li>
          <li>
            <Link to="/PageMenu" onClick={toggleSidebar}>
              Cardápio
            </Link>
          </li>
          <li>
            <Link to="/PageTables" onClick={toggleSidebar}>
              Mesas
            </Link>
          </li>
          <li>
            <Link to="/PageWaiters" onClick={toggleSidebar}>
              Garçons
            </Link>
          </li>
          <li>
            <Link to="/PageRequests" onClick={toggleSidebar}>
              Pedidos
            </Link>
          </li>
          <li>
            <Link to="/PageSettings" onClick={toggleSidebar}>
              Configurações
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar">
        <div className="navbar-left">
          <Link to="/home">
            <img
              src={companyInfo.logoUrl}
              alt="Logo da Empresa"
              className="logo"
            />
          </Link>
          <span>{companyInfo.name}</span>
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
          <Link to="/PageLogin">
            <img src={UserLogo} alt="Logo do Usuário" className="user-logo" />
          </Link>
        </div>
      </div>
      <div className="footer">
        <span>Desenvolvido por TizDeveloper Inc.</span>
      </div>
    </div>
  );
}

export default NavigationBar;
