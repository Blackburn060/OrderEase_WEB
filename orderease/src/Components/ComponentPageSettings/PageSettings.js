import React, { useState, useEffect } from "react";
import "./PageSettings.css";

function PageSettings() {
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [loginPageImage, setLoginPageImage] = useState("");
  const [homePageImage, setHomePageImage] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [serverResponse, setServerResponse] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progressWidth, setProgressWidth] = useState("0%");

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleFileChange = (e, setImageFunction) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64WithoutPrefix = event.target.result.replace(
          /^data:image\/[a-zA-Z+]+;base64,/,
          ""
        );
        setImageFunction(base64WithoutPrefix);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async () => {
    const data = {
      companyName,
      primaryColor,
      secondaryColor,
    };

    if (companyLogo) {
      data.companyLogo = companyLogo;
    };

    if (loginPageImage) {
      data.loginPageImage = loginPageImage;
    };

    if (homePageImage) {
      data.homePageImage = homePageImage;
    };

    try {
      const response = await fetch(
        "https://orderease-api.onrender.com/api/salvar-configuracoes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Configurações salvas com sucesso!");
        setServerResponse("Configurações salvas com sucesso!");
        setShowProgressBar(true);

        setProgressWidth("100%");
        let startTime = Date.now();
        const intervalId = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(4000 - elapsed, 0);
          const width = `${(remainingTime / 4000) * 100}%`;
          setProgressWidth(width);
        }, 100);

        setTimeout(() => {
          setServerResponse(null);
          setShowProgressBar(false);
          clearInterval(intervalId);
          setProgressWidth("0%");
        }, 4000);
      } else {
        console.error("Erro ao salvar configurações:", response.statusText);
        setServerResponse("Erro ao salvar configurações");
        setShowProgressBar(true);

        setProgressWidth("100%");
        let startTime = Date.now();
        const intervalId = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(4000 - elapsed, 0);
          const width = `${(remainingTime / 4000) * 100}%`;
          setProgressWidth(width);
        }, 100);

        setTimeout(() => {
          setServerResponse(null);
          setShowProgressBar(false);
          clearInterval(intervalId);
          setProgressWidth("0%");
        }, 4000);
      }
    } catch (error) {
      console.error("Erro durante a solicitação para o servidor:", error);
      setServerResponse("Erro durante a solicitação para o servidor");
      setShowProgressBar(true);

      setProgressWidth("100%");
      let startTime = Date.now();
      const intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(4000 - elapsed, 0);
        const width = `${(remainingTime / 4000) * 100}%`;
        setProgressWidth(width);
      }, 100);

      setTimeout(() => {
        setServerResponse(null);
        setShowProgressBar(false);
        clearInterval(intervalId);
        setProgressWidth("0%");
      }, 4000);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch(
        "https://orderease-api.onrender.com/api/obter-configuracoes"
      );
      if (response.ok) {
        const data = await response.json();
        setCompanyName(data.companyName);
        setCompanyLogo(data.companyLogo);
        setLoginPageImage(data.loginPageImage);
        setHomePageImage(data.homePageImage);
        setPrimaryColor(data.primaryColor);
        setSecondaryColor(data.secondaryColor);
      } else {
        console.error("Erro ao obter configurações:", response.statusText);
      }
    } catch (error) {
      console.error("Erro durante a solicitação para o servidor:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="page">
      <div className="contentPageSettings">
        <div className="settingsTitle-container">
          <h1>Configurações</h1>
        </div>
        <div className="configurationParameters">
          <div className="configurationParametersTittle">
            <h2>Parâmetros Gerais</h2>
          </div>
          <div className="configurationParametersContent">
            <form>
              <label htmlFor="companyName">Nome da Empresa:</label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={handleCompanyNameChange}
              />

              <label htmlFor="companyLogo">Logo da Empresa:</label>
              <input
                type="file"
                id="companyLogo"
                onChange={(e) => handleFileChange(e, setCompanyLogo)}
              />

              <label htmlFor="loginPageImage">Imagem da Página de Login:</label>
              <input
                type="file"
                id="loginPageImage"
                onChange={(e) => handleFileChange(e, setLoginPageImage)}
              />

              <label htmlFor="homePageImage">Imagem da Página Inicial:</label>
              <input
                type="file"
                id="homePageImage"
                onChange={(e) => handleFileChange(e, setHomePageImage)}
              />

              <label htmlFor="primaryColor">Cor Principal:</label>
              <input
                type="color"
                id="primaryColor"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />

              <label htmlFor="secondaryColor">Cor Secundária:</label>
              <input
                type="color"
                id="secondaryColor"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
              />

              <button
                className="buttonDefaultStyle"
                type="button"
                onClick={handleSubmit}
              >
                Salvar Configurações
              </button>
            </form>
          </div>
          {serverResponse && (
            <div
              className={`SettingsServer-response ${
                serverResponse.includes("sucesso") ? "success" : "error"
              } ${showProgressBar ? "show" : ""}`}
            >
              {serverResponse}
            </div>
          )}
          {showProgressBar && (
            <div
              className={`SettingsProgress-container ${showProgressBar ? "show" : ""}`}
            >
              <div
                className="SettingsProgress-bar"
                style={{ width: progressWidth }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageSettings;
