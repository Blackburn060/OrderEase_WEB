import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./homeCardapio.css";
import logoInstagram from "../../assets/Images/LogoInstagram.png";
import LogoWhatsApp from "../../assets/Images/LogoWhatsApp.png";
import logofacebook from "../../assets/Images/LogoFacebook.png";

function HomeCardapio() {
  const [companyName, setCompanyName] = useState("");
  const [businessDayHours, setBusinessDayHours] = useState("");
  const [finalWeekSchedules, setFinalWeekSchedules] = useState("");
  const [linkInstagram, setLinkInstagram] = useState("");
  const [linkFacebook, setLinkFacebook] = useState("");
  const [linkWhatsApp, setLinkWhatsApp] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

  const navigate = useNavigate();

  const fetchSettings = async () => {
    try {
      const response = await fetch(
        "https://orderease-api.azurewebsites.net/api/obter-configuracoes"
      );
      if (response.ok) {
        const data = await response.json();
        setCompanyName(data.companyName);
        setBusinessDayHours(data.businessDayHours);
        setFinalWeekSchedules(data.finalWeekSchedules);
        setLinkInstagram(data.linkInstagram);
        setLinkFacebook(data.linkFacebook);
        setLinkWhatsApp(data.linkWhatsApp);
        setCompanyLogo(data.companyLogo);
      } else {
        console.error("Erro ao obter configurações:", response.statusText);
      }
    } catch (error) {
      console.error("Erro durante a solicitação para o servidor:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
    document.body.classList.add("bodyHomeCardapio");
    fetchSettings();
    return () => {
      // Remove a classe do body quando o componente desmonta
      document.body.classList.remove("bodyHomeCardapio");
    };
  }, []); // Executará a chamada à API apenas uma vez ao montar o componente

  const handleNavigateToPageCardapio = () => {
    navigate("/PageCardapio");
  };

  return (
    <div className="home-container">
      <div className="header-bar">
        <div className="logo-containerCardapio">
          {companyLogo && <img src={companyLogo} alt="Logo da Empresa" />}
        </div>
        <div className="company-name">{companyName}</div>
      </div>

      <div className="social-buttons-container">
        {linkWhatsApp && (
          <button
            className="social-button"
            onClick={() => window.open(linkWhatsApp)}
          >
            <img src={LogoWhatsApp} alt="WhatsApp" />
          </button>
        )}
        {linkFacebook && (
          <button
            className="social-button"
            onClick={() => window.open(linkFacebook)}
          >
            <img src={logofacebook} alt="Facebook" />
          </button>
        )}
        {linkInstagram && (
          <button
            className="social-button"
            onClick={() => window.open(linkInstagram)}
          >
            <img src={logoInstagram} alt="Instagram" />
          </button>
        )}
      </div>

      <div className="home-cardapio-container">
        <button
          className="acessar-cardapio-button"
          onClick={handleNavigateToPageCardapio}
        >
          Acessar Cardápio
        </button>
        <button className="acessar-cardapio-button">
          Horário de Funcionamento
        </button>

        <div className="horario-funcionamento">
          {businessDayHours && finalWeekSchedules && (
            <>
              <p>{`Dias Úteis: ${businessDayHours}`}</p>
              <p>{`Finais de Semana: ${finalWeekSchedules}`}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeCardapio;
