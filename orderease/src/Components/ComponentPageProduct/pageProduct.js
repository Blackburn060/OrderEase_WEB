import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./PageProduct.css";

function PageProduct() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productValue, setProductValue] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [serverResponse, setServerResponse] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progressWidth, setProgressWidth] = useState("0%");
  const [formKey, setFormKey] = useState(0);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleProductCategoryChange = (e) => {
    setProductCategory(e.target.value);
  };

  const handleProductValueChange = (e) => {
    setProductValue(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64WithoutPrefix = event.target.result.replace(
          /^data:image\/[a-zA-Z+]+;base64,/,
          ""
        );
        setImageBase64(base64WithoutPrefix);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const resetForm = () => {
    setProductName("");
    setProductDescription("");
    setProductCategory("");
    setProductValue("");
    setImageBase64("");
    setFormKey((prevKey) => prevKey + 1); // Incrementa a chave para forçar a remontagem do componente
  };

  const handleSubmit = async () => {
    if (!productName || !productDescription || !productCategory || !productValue || !imageBase64) {
      alert(
        "Por favor, preencha todos os campos do formulário e selecione uma imagem."
      );
      return;
    }

    const productId = uuidv4();

    const data = {
      productId,
      productName,
      productDescription,
      productValue,
      imageBase64,
      productCategory,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/adicionar-produto",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Convert data to JSON
        }
      );

      if (response.ok) {
        console.log("Produto cadastrado com sucesso!");
        setServerResponse("Produto cadastrado com sucesso!");
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

        setProductName("");
        setProductDescription("");
        setProductCategory("");
        setProductValue("");
        setImageBase64("");
        setFormKey((prevKey) => prevKey + 1);
      } else {
        console.error("Erro ao cadastrar o produto");
        setServerResponse("Erro ao cadastrar o produto");
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

  return (
    <div className="page">
      <div className="contentPageProduct">
        <div className="ProductTitle-container">
          <h1>Produtos</h1>
        </div>
        <div className="ButtonNewProduct">
          <button onClick={resetForm}>Novo</button>
        </div>
        <div className="ProductsRegistered">
          <div className="ProductsRegisteredTittle">
            <h2>Produtos Cadastrados</h2>
          </div>
          <div></div>
        </div>
        <div className="DetailedProductData" key={formKey}>
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

              <label htmlFor="productCategory">Categoria do Produto:</label>
              <select
                id="productCategory"
                value={productCategory}
                onChange={handleProductCategoryChange}
              >
                <option value="">Selecione uma categoria</option>
                <option value="alcoolicos">Alcoólicos</option>
                <option value="cremes">Cremes</option>
                <option value="sucos">Sucos</option>
              </select>

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
          {serverResponse && (
            <div
              className={`server-response ${
                serverResponse.includes("sucesso") ? "success" : "error"
              } ${showProgressBar ? "show" : ""}`}
            >
              {serverResponse}
            </div>
          )}
          {showProgressBar && (
            <div
              className={`progress-container ${showProgressBar ? "show" : ""}`}
            >
              <div
                className="progress-bar"
                style={{ width: progressWidth }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageProduct;
