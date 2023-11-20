import React, { useState, useEffect } from "react";
import "./PageLogin.css";
import IconUser from "../../assets/Images/IconeUserLoginPage.png";
import IconPassword from "../../assets/Images/IconeCadeadoLogin.png";

function PageLogin() {

  const [companyInfo, setCompanyInfo] = useState({
    loginPageUrl: "",
  });

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await fetch("https://orderease-api.onrender.com/api/obter-configuracoes");
      if (response.ok) {
        const data = await response.json();
        setCompanyInfo({
          loginPageUrl: data.loginPageImage,
        });
      } else {
        console.error("Erro ao obter informações da empresa:", response.statusText);
      }
    } catch (error) {
      console.error("Erro durante a solicitação para o servidor:", error);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <img
          src={companyInfo.loginPageUrl}
          alt="Imagem de fundo"
          width="60"
          height="40"
        ></img>
      </div>
      <div className="right-side">
        <div className="container-right-side">
          <h1>LOGIN</h1>
          <div className="form-group">
            <i className="icon">
              <img src={IconUser} alt="Icone Usuario"></img>
            </i>
            <input type="text" placeholder="Usuário"></input>
          </div>
          <div className="form-group">
            <i className="icon">
              <img src={IconPassword} alt="Icone Senha"></img>
            </i>
            <input type="password" placeholder="Senha"></input>
          </div>
          <div className="form-group">
            <button>ENTRAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageLogin;
