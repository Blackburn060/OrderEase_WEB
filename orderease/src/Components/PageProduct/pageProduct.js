import React from "react";
import "./PageProduct.css";

function PageProduct() {
  return (
    <div className="page">
      <div className="content">
        <div className="title-container">
          <h1>Produtos</h1>
        </div>
        <div className="ProdutosCadastrados">
          <h2>Produtos</h2> {/* Título */}
          <div className="content-container">
            <div className="NomeDadosProdutos">
              <div className="top-text">
                <p>Dados do Produto</p>
                <p>Nome do Produto</p>
              </div>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageProduct;
