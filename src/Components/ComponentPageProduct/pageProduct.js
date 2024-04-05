import React, { useState, useEffect } from "react";
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
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetchProducts();

    const intervalId = setInterval(() => {
      fetchProducts();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setProductName(selectedProduct.nome);
      setProductDescription(selectedProduct.descricao);
      setProductCategory(selectedProduct.categoria);
      setProductValue(selectedProduct.valor);
      setIsEditMode(true);
      // A imagem não é atualizada aqui, pois é uma string base64
    }
  }, [selectedProduct]);

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
    setIsEditMode(false);
    setSelectedProductId(null);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://orderease-api.azurewebsites.net/api/listar-produtos?status=Ativo"
      );
      if (response.ok) {
        const productsData = await response.json();
        setProductList(productsData);
        setFetchError(null);
      } else {
        console.error("Erro ao buscar produtos:", response.statusText);
        setFetchError("Erro ao buscar produtos!");
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setFetchError("Erro ao buscar produtos!");
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProductId(product.id);
    setSelectedProduct({ ...product });
  };

  const handleSubmit = async () => {
    if (
      !productName ||
      !productDescription ||
      !productCategory ||
      !productValue
    ) {
      alert(
        "Por favor, preencha todos os campos do formulário e selecione uma imagem."
      );
      return;
    }

    const productStatus = "Ativo";

    const data = {
      productName,
      productDescription,
      productValue,
      productCategory,
      productStatus,
    };

    if (imageBase64) {
      data.imageBase64 = imageBase64;
    }

    try {
      const response = await fetch(
        "https://orderease-api.azurewebsites.net/api/adicionar-produto",
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

        resetForm();
        setSelectedProduct(null);
        fetchProducts();
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

  const handleUpdate = async () => {
    if (
      !productName ||
      !productDescription ||
      !productCategory ||
      !productValue
    ) {
      alert(
        "Por favor, preencha todos os campos do formulário e selecione uma imagem."
      );
      return;
    }

    const data = {
      productName,
      productDescription,
      productValue,
      productCategory,
    };

    // Adicione a imagem ao objeto de dados se estiver presente
    if (imageBase64) {
      data.imageBase64 = imageBase64;
    }

    try {
      const response = await fetch(
        `https://orderease-api.azurewebsites.net/api/atualizar-produto/${selectedProduct.id}`,
        {
          method: "PUT", // Corrigir o método HTTP para PUT
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Convert data to JSON
        }
      );

      if (response.ok) {
        console.log("Produto atualizado com sucesso!");
        setServerResponse("Produto atualizado com sucesso!");
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

        resetForm();
        setSelectedProduct(null);
        fetchProducts();
      } else {
        console.error("Erro ao atualizar o produto");
        setServerResponse("Erro ao atualizar o produto");
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

  const handleDelete = async () => {
    if (!selectedProduct) {
      return;
    }

    try {
      const response = await fetch(
        `https://orderease-api.azurewebsites.net/api/excluir-produto/${selectedProduct.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Produto excluído com sucesso!");
        setServerResponse("Produto excluído com sucesso!");
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

        resetForm();
        setSelectedProduct(null);
        fetchProducts();
      } else {
        console.error("Erro ao excluir o produto");
        setServerResponse("Erro ao excluir o produto");
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

  const confirmDelete = () => {
    const userConfirmed = window.confirm(
      "Tem certeza que deseja excluir o produto?"
    );
    if (userConfirmed) {
      handleDelete();
    }
  };

  return (
    <div className="page">
      <div className="contentPageProduct">
        <div className="ProductTitle-container">
          <h1>Produtos</h1>
        </div>
        <div className="ButtonNewProduct">
          <button className="buttonDefaultStyle" onClick={resetForm}>
            {isEditMode ? "Cancelar" : "Novo"}
          </button>
        </div>
        <div className="ProductsRegistered">
          <div className="ProductsRegisteredTittle">
            <h2>Produtos Cadastrados</h2>
          </div>
          <div className="ProductsRegisteredDataContent">
            {fetchError ? (
              <div className="FetchErrorMessage">{fetchError}</div>
            ) : (
              <ul>
                {productList.map((product) => (
                  <li
                    key={product.id}
                    className={
                      selectedProductId === product.id ? "selected" : ""
                    }
                  >
                    <button onClick={() => handleProductSelect(product)}>
                      {product.nome}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="DetailedProductData" key={formKey}>
          <div className="DetailedProductDataTittle">
            <h2>Dados do Produto</h2>
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
                <option value="Alcoólicos">Alcoólicos</option>
                <option value="Cremes">Cremes</option>
                <option value="Sucos">Sucos</option>
                <option value="Coqueteis">Coquetéis</option>
                <option value="Não Alcoólicos">Não Alcoólicos</option>
                <option value="Entradas">Entradas</option>
                <option value="Petiscos">Petiscos</option>
                <option value="Risotos">Risotos</option>
                <option value="Massas">Massas</option>
                <option value="Sobremesas">Sobremesas</option>
                <option value="Batidas">Batidas</option>
              </select>

              <label htmlFor="productValue">Valor do Produto:</label>
              <input
                type="text"
                id="productValue"
                value={productValue}
                onChange={handleProductValueChange}
                onInput={(e) => {
                  // Remove caracteres não numéricos
                  e.target.value = e.target.value.replace(/[^0-9,.]/g, "");
                }}
              />

              <label htmlFor="productImage">Imagem do Produto:</label>
              <input
                type="file"
                id="productImage"
                onChange={handleImageChange}
              />
              <button
                className="buttonDefaultStyle"
                type="button"
                onClick={isEditMode ? handleUpdate : handleSubmit}
              >
                {isEditMode ? "Atualizar" : "Enviar"}
              </button>
              {selectedProduct && isEditMode && (
                <button
                  className="buttonDefaultStyle deleteButton"
                  type="button"
                  onClick={confirmDelete}
                >
                  Excluir
                </button>
              )}
            </form>
          </div>
          {serverResponse && (
            <div
              className={`ProductServer-response ${
                serverResponse.includes("sucesso") ? "success" : "error"
              } ${showProgressBar ? "show" : ""}`}
            >
              {serverResponse}
            </div>
          )}
          {showProgressBar && (
            <div
              className={`ProductProgress-container ${
                showProgressBar ? "show" : ""
              }`}
            >
              <div
                className="ProductProgress-bar"
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
