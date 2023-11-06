import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./PageProduct.css";

function PageProduct() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productValue, setProductValue] = useState("");
  const [imageBase64, setImageBase64] = useState(null);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleProductValueChange = (e) => {
    setProductValue(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        setImageBase64(base64);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async () => {
    if (!productName || !productDescription || !productValue || !imageBase64) {
      alert("Por favor, preencha todos os campos do formulário e selecione uma imagem.");
      return;
    }

    const productId = uuidv4();

    const data = {
      productId,
      productName,
      productDescription,
      productValue,
      imageBase64,
    };

    try {
      const response = await fetch("http://localhost:3001/api/adicionar-produto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Produto cadastrado com sucesso");
        setProductName("");
        setProductDescription("");
        setProductValue("");
        setImageBase64(null);
      } else {
        console.error("Erro ao cadastrar o produto");
      }
    } catch (error) {
      console.error("Erro durante a solicitação para o servidor:", error);
    }
  };

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
          <div className="DetailedProductDataContent">
            <form>
              <label htmlFor="productName">Nome do Produto:</label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={handleProductNameChange}
              />

              <label htmlFor="productDescription">Descrição:</label>
              <textarea
                id="productDescription"
                value={productDescription}
                onChange={handleProductDescriptionChange}
              />

              <label htmlFor="productValue">Valor do Produto:</label>
              <input
                type="text"
                id="productValue"
                value={productValue}
                onChange={handleProductValueChange}
              />

              <label htmlFor="productImage">Imagem do Produto:</label>
              <input
                type="file"
                id="productImage"
                onChange={handleImageChange}
              />

              <button type="button" onClick={handleSubmit}>
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageProduct;
