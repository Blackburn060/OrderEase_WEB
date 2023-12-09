import React, { useState, useEffect } from "react";
import "./PageMenu.css";

function PageMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [selectedMenuItem] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(
        "https://orderease-api.up.railway.app/api/listar-produtos?status=Ativo"
      );
      if (response.ok) {
        const menuData = await response.json();
        setMenuItems(menuData);
        setFetchError(null);
      } else {
        console.error("Erro ao buscar itens do menu:", response.statusText);
        setFetchError("Erro ao buscar itens do menu!");
      }
    } catch (error) {
      console.error("Erro ao buscar itens do menu:", error);
      setFetchError("Erro ao buscar itens do menu!");
    }
  };

  const handleToggleCardapio = async () => {
    if (!selectedMenuItem) {
      return;
    }

    const updatedMenuItem = {
      ...selectedMenuItem,
      cardapio: selectedMenuItem.cardapio === "Sim" ? "Não" : "Sim",
    };

    try {
      const response = await fetch(
        `https://orderease-api.up.railway.app/api/atualizar-produto/${selectedMenuItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMenuItem),
        }
      );

      if (response.ok) {
        console.log("Campo cardapio atualizado com sucesso!");
        fetchMenuItems();
      } else {
        console.error("Erro ao atualizar o campo cardapio");
      }
    } catch (error) {
      console.error("Erro durante a solicitação para o servidor:", error);
    }
  };

  return (
    <div className="page">
      <div className="contentPageMenu">
        <div className="MenuTitle-container">
          <h1>Menu</h1>
        </div>
        <div className="MenuItems">
          <div className="MenuItemsTitle">
            <h2>Itens do Menu</h2>
          </div>
          <div className="MenuItemsDataContent">
            {fetchError ? (
              <div className="FetchErrorMessage">{fetchError}</div>
            ) : (
              <div className="ResponsiveBackground">
                {/* Adiciona um contêiner com altura fixa e scroll */}
                <div className="TableContainer" style={{ height: "400px", overflow: "auto" }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Cardápio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.map((menuItem) => (
                        <tr
                          key={menuItem.id}
                          className={
                            selectedMenuItem === menuItem.id ? "selected" : ""
                          }
                        >
                          <td>{menuItem.nome}</td>
                          <td>{`R$ ${menuItem.valor}`}</td>
                          <td>{menuItem.categoria}</td>
                          <td>
                            <button onClick={handleToggleCardapio}>
                              {menuItem.cardapio}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageMenu;
