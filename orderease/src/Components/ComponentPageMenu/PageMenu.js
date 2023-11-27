import React, { useState, useEffect } from "react";
import "./PageMenu.css";

function PageMenu() {
  const [productList, setProductList] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://orderease-api.onrender.com/api/listar-produtos?status=Ativo"
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

  return (
    <div className="page">
      <div className="contentPageMenu">
        <div className="MenuTitle-container">
          <h1>Menu</h1>
        </div>
        <div className="MenuItems">
          {fetchError ? (
            <div className="FetchErrorMessage">{fetchError}</div>
          ) : (
            <ul>
              {productList.map((product) => (
                <li key={product.id}>
                  <div>
                    <img
                      src={product.imageUri}
                      alt={product.nome}
                    />
                    <h3>{product.nome}</h3>
                    <p>{product.descricao}</p>
                    <p>Categoria: {product.categoria}</p>
                    <p>Valor: {product.valor}</p>
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

export default PageMenu;
