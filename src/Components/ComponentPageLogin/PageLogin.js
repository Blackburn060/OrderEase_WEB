import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./PageLogin.css";
import IconUser from "../../assets/Images/IconeUserLoginPage.png";
import IconPassword from "../../assets/Images/IconeCadeadoLogin.png";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkm_pw2kGzze_T800gJYq2HMUYnY49Qx4",
  authDomain: "orderease-76588.firebaseapp.com",
  databaseURL: "https://orderease-76588-default-rtdb.firebaseio.com",
  projectId: "orderease-76588",
  storageBucket: "orderease-76588.appspot.com",
  messagingSenderId: "625191016976",
  appId: "1:625191016976:web:a06ee20338f6089c6dc895",
};

const firebaseApp = initializeApp(firebaseConfig);

function PageLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(firebaseApp);

    // Adiciona um observador de autenticação
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        setRedirect(true);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Limpa o observador ao desmontar o componente
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const auth = getAuth(firebaseApp);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login bem-sucedido!");
      // O estado do usuário será atualizado automaticamente pelo observador
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      setError(error.message);
    }
  };

  const [companyInfo, setCompanyInfo] = useState({
    loginPageUrl: "",
  });

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await fetch(
        "https://orderease-api.azurewebsites.net/api/obter-configuracoes"
      );
      if (response.ok) {
        const data = await response.json();
        setCompanyInfo({
          loginPageUrl: data.loginPageImage,
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

  if (redirect || user) {
    // Redirecionar para a página inicial
    return <Navigate to="/home" />;
  }

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
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={handleEmailChange}
            ></input>
          </div>
          <div className="form-group">
            <i className="icon">
              <img src={IconPassword} alt="Icone Senha"></img>
            </i>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={handlePasswordChange}
            ></input>
          </div>
          <div className="form-group">
            <button onClick={handleLogin}>ENTRAR</button>
          </div>
          {error && <p className="error-message">Falha no login! E-mail ou senha incorretos!</p>}
        </div>
      </div>
    </div>
  );
}

export default PageLogin;
