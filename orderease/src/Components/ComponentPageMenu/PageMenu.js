import React, { useState, useEffect } from "react";
import "./PageMenu.css";

function PageMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(
        "https://orderease-api.onrender.com/api/listar-produtos?status=Ativo"
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

  const handleMenuItemSelect = (menuItem) => {
    setSelectedMenuItem(menuItem);
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
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Valor</th>
                      <th>Categoria</th>
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
                        <td>
                          <button
                            onClick={() => handleMenuItemSelect(menuItem)}
                          >
                            {menuItem.nome}
                          </button>
                        </td>
                        <td>{`R$ ${menuItem.valor}`}</td>
                        <td>{menuItem.categoria}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageMenu;
