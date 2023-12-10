import React, { useState, useEffect, useCallback } from "react";
import "./PageCardapio.css";

function PageCardapio() {
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
 
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("https://orderease-api.up.railway.app/api/listar-produtos?status=Ativo");

      if (response.ok) {
        const productsData = await response.json();
        const uniqueCategories = Array.from(new Set(productsData.map((product) => product.categoria)));
        setCategories(uniqueCategories);
      } else {
        console.error("Erro ao buscar categorias:", response.statusText);
        setFetchError("Erro ao buscar categorias!");
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      setFetchError("Erro ao buscar categorias!");
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      let apiUrl = "https://orderease-api.up.railway.app/api/listar-produtos?status=Ativo";

      if (selectedCategory) {
        apiUrl += `&categoria=${selectedCategory}`;
      }

      const response = await fetch(apiUrl);

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
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleShowAll = () => {
    setSelectedCategory(null);
  };

  return (

    <div className="page">
        <div className="MenuTitle-container">
        <div className="contentPageMenu"></div>
        <div className="BlueStripe"></div>
        <div className="MenuTitle-container"></div>
        <div className="CategoryButtons">
          <button onClick={handleShowAll} className={!selectedCategory ? "active" : ""}>
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="contentProductList">
        <div className="MenuItems">
          {fetchError ? (
            <div className="FetchErrorMessage">{fetchError}</div>
          ) : (
            <ul>
              {productList.map((product) => (
                  <li key={product.id} style={{ display: selectedCategory && product.categoria !== selectedCategory ? "none" : "block" }}>
                    <div className="ProductContainer">
                      <div className="TextContainer">
                        <h3>{product.nome}</h3>
                        <p>{product.descricao}</p>
                        <p>Categoria: {product.categoria}</p>
                        <p1>Valor: R$ {product.valor}</p1>
                      </div>
                      <div className="ImageContainer">
                        <img src={product.imageUri} alt={product.nome} />
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageCardapio;
