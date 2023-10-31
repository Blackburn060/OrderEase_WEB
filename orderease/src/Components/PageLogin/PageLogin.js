/* import NavigationBar from "../NavigationBar/NavigationBar"; */
import "./PageLogin.css";
import ImageLoginExample from "../../Images/ImagemPaginaLogin.jpg";
import IconUser from "../../Images/IconeUserLoginPage.png";
import IconPassword from "../../Images/IconeCadeadoLogin.png";

function PageLogin() {
  return (
    <div class="container">
      <div class="left-side">
        <img
          src={ImageLoginExample}
          alt="Imagem de fundo"
          width="60"
          height="40"
        ></img>
      </div>
      {/* <div class="divider"></div> */}
      <div class="right-side">
        <div className="container-right-side">
          <h1>LOGIN</h1>
          <div class="form-group">
            <i class="icon">
              <img src={IconUser} alt="Icone Usuario"></img>
            </i>
            <input type="text" placeholder="Usuário"></input>
          </div>
          <div class="form-group">
            <i class="icon">
              <img src={IconPassword} alt="Icone Senha"></img>
            </i>
            <input type="password" placeholder="Senha"></input>
          </div>
          <div class="form-group">
            <button>ENTRAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageLogin;
