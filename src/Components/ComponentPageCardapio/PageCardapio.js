import React, { useState, useEffect, useCallback } from "react";
import "./PageCardapio.css";

function PageCardapio() {
  const [PCproductList, setPCProductList] = useState([]);
  const [PCcategories, setPCCategories] = useState([]);
  const [PCfetchError, setPCFetchError] = useState(null);
  const [PCselectedCategory, setPCSelectedCategory] = useState(null);
 
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("https://orderease-api.up.railway.app/api/listar-produtos?status=Ativo");

      if (response.ok) {
        const productsData = await response.json();
        const uniqueCategories = Array.from(new Set(productsData.map((product) => product.categoria)));
        setPCCategories(uniqueCategories);
      } else {
        console.error("Erro ao buscar categorias:", response.statusText);
        setPCFetchError("Erro ao buscar categorias!");
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      setPCFetchError("Erro ao buscar categorias!");
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      let apiUrl = "https://orderease-api.up.railway.app/api/listar-produtos?status=Ativo";
  
      if (PCselectedCategory) {
        apiUrl += `&categoria=${PCselectedCategory}`;
      }
  
      const response = await fetch(apiUrl);
  
      if (response.ok) {
        const productsData = await response.json();
        const filteredProducts = productsData.filter(product => product.cardapio === "Sim");

      setPCProductList(filteredProducts);
      setPCFetchError(null);
    } else {
      console.error("Erro ao buscar produtos:", response.statusText);
      setPCFetchError("Erro ao buscar produtos!");
    }
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    setPCFetchError("Erro ao buscar produtos!");
  }
}, [PCselectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, PCselectedCategory]);

  const handleCategorySelect = (category) => {
    setPCSelectedCategory(category);
  };

  const handleShowAll = () => {
    setPCSelectedCategory(null);
  };

  return (
    <div className="PCpage">
      <div className="PCMenuTitle-container">
        <div className="PCcontentPageMenu"></div>
        <div className="PCBlueStripe"></div>
        <div className="PCMenuTitle-container"></div>
        <div className="PCCategoryButtons">
          <button onClick={handleShowAll} className={!PCselectedCategory ? "active" : ""}>
            Todos
          </button>
          {PCcategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={PCselectedCategory === category ? "active" : ""}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="PCcontentProductList">
        <div className="PCMenuItems">
          {PCfetchError ? (
            <div className="PCFetchErrorMessage">{PCfetchError}</div>
          ) : (
            <ul>
              {PCproductList.map((product) => (
                <li key={product.id} style={{ display: PCselectedCategory && product.categoria !== PCselectedCategory ? "none" : "block" }}>
                  <div className="PCProductContainer">
                    <div className="PCTextContainer">
                      <h3>{product.nome}</h3>
                      <p>{product.descricao}</p>
                      <p>Categoria: {product.categoria}</p>
                      <p1>Valor: R$ {product.valor}</p1>
                    </div>
                    <div className="PCImageContainer">
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
