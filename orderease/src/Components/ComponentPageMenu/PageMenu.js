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
        "https://orderease-api.up.railway.app/api/listar-produtos"
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

  const handleToggleCardapio = async (menuItem) => {
    const updatedMenuItem = {
      ...menuItem,
      cardapio: menuItem.cardapio === "Sim" ? "Não" : "Sim",
    };

    try {
      const response = await fetch(
        `https://orderease-api.up.railway.app/api/atualizar-produto-cardapio/${menuItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMenuItem),
        }
      );

      if (response.ok) {
        console.log("Campo cardápio atualizado com sucesso!");
        fetchMenuItems();
      } else {
        console.error(
          "Erro ao atualizar o campo cardápio:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erro durante a solicitação para o servidor:", error);
    }
  };

  const handleMenuChange = (menuItem) => {
    setSelectedMenuItem(menuItem);
    handleToggleCardapio({
      ...menuItem,
      cardapio: menuItem.cardapio === "Sim" ? "Não" : "Sim",
    });
  };

  const handleEnviarClick = () => {
    if (selectedMenuItem) {
      const cardapioValue = selectedMenuItem.cardapio;
      alert(`Valor selecionado: ${cardapioValue}`);
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
                <div
                  className="TableContainer"
                  style={{ height: "400px", overflow: "auto" }}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Ativo no menu?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.map((menuItem) => (
                        <tr
                          key={menuItem.id}
                          className={
                            selectedMenuItem === menuItem ? "selected" : ""
                          }
                        >
                          <td>{menuItem.nome}</td>
                          <td>{`R$ ${menuItem.valor}`}</td>
                          <td>{menuItem.categoria}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={menuItem.cardapio === "Sim"}
                              onChange={() => handleMenuChange(menuItem)}
                            />
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
        <div className="EnviarButton">
          <button onClick={handleEnviarClick}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default PageMenu;
