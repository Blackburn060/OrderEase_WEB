import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./PageProduct.css";

function PageProduct() {
  return (
    <div className="page">
      <NavigationBar />
      <div className="content">
        <div className="title-container">
          <h1>Produtos</h1>
        </div>
        <div className="ProdutosCadastrados">
          
          <div className="NomeDadosProdutos">
            <div className="top-text">
              <p>Dados do Produto</p>
              <p>Nome do Produto</p>
            </div>
            <p>Conteúdo da segunda</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageProduct;
