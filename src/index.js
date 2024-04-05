import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from './context/AuthContext';

fetch("https://orderease-api.azurewebsites.net/api/obter-configuracoes")
  .then((response) => response.json())
  .then((data) => {
    // Aqui você pode acessar o valor de primaryColor do objeto retornado pela API
    const primaryColor = data.primaryColor;
    const secondaryColor = data.secondaryColor;

    // Em seguida, você pode aplicar esse valor ao CSS
    document.documentElement.style.setProperty("--cor-primaria", primaryColor);
    document.documentElement.style.setProperty(
      "--cor-secundaria",
      secondaryColor
    );
  })
  .catch((error) =>
    console.error("Erro ao obter configurações da API:", error)
  );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
        <App />
      </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
