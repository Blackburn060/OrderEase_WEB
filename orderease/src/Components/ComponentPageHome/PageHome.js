import "./PageHome.css";
import ImageUserLogo from "../../assets/Images/LogoExemplo.png";
import ImageCenterPage from "../../assets/Images/ImagemPaginaLogin.jpg"

function PageHome() {
  return (
    <div className="page">
      <div className="contentPageHome">
        <div className="PageHomeTitle-container">
          <img src={ImageUserLogo} alt="User logo home page"/> 
          <h1>Olá, Nome Usuário</h1>
        </div>
        <div className="PageHomeImageCenter">
          <img src={ImageCenterPage} alt="Center Page"/>
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
