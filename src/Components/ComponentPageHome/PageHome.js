import React, { useState, useEffect } from "react";
import "./PageHome.css";
import { useAuth } from "../../context/AuthContext";

function PageHome() {
  const [companyInfo, setCompanyInfo] = useState({
    homePageImageUrl: "",
  });

  const { user } = useAuth();

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await fetch(
        "https://orderease-api.up.railway.app/api/obter-configuracoes"
      );
      if (response.ok) {
        const data = await response.json();
        setCompanyInfo({
          homePageImageUrl: data.homePageImage,
          companyLogo: data.companyLogo,
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
      <div className="contentPageHome">
        <div className="PageHomeTitle-container">
          <img src={companyInfo.companyLogo} alt="User logo home page" />
          <h1>Olá, {user ? user.email.split('@')[0] : "Olá, Nome Usuário"}</h1>
        </div>
        <div className="PageHomeImageCenter">
          <img src={companyInfo.homePageImageUrl} alt="Center Page" />
        </div>
        <div className="PageHomeWhereItStopped">
          <h1>Continue de onde parou</h1>
        </div>
        <div className="RecentContent">
          <div className="RecentContentTittle">
            <h2>Conteúdo Recente</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHome;
