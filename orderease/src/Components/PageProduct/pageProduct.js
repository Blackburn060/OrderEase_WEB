import React from "react";
import "./PageProduct.css";

function PageProduct() {
  return (
    <div className="page">
      <div className="content">
        <div className="title-container">
          <h1>Produtos</h1>
        </div>
        <div className="ButtonNewProduct">
          <button>Novo</button>
        </div>
        <div className="ProductsRegistered">
          <div className="ProductsRegisteredTittle">
            <h2>Produtos Cadastrados</h2>
          </div>
          <div></div>
        </div>
        <div className="DetailedProductData">
          <div className="DetailedProductDataTittle">
            <h2>Dados do Produto - </h2>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default PageProduct;
