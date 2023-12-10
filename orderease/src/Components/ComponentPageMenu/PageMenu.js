import React, { useState, useEffect } from "react";
import "./PageMenu.css";

function PageMenu() {
  const [PMmenuItems, setPMMenuItems] = useState([]);
  const [PMfetchError, setPMFetchError] = useState(null);
  const [PMselectedMenuItem, setPMSelectedMenuItem] = useState(null);

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
        setPMMenuItems(menuData);
        setPMFetchError(null);
      } else {
        console.error("Erro ao buscar itens do menu:", response.statusText);
        setPMFetchError("Erro ao buscar itens do menu!");
      }
    } catch (error) {
      console.error("Erro ao buscar itens do menu:", error);
      setPMFetchError("Erro ao buscar itens do menu!");
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
    setPMSelectedMenuItem(menuItem);
    handleToggleCardapio({
      ...menuItem,
      cardapio: menuItem.cardapio === "Sim" ? "Não" : "Sim",
    });
  };

  const handleEnviarClick = () => {
    if (PMselectedMenuItem) {
      const cardapioValue = PMselectedMenuItem.cardapio;
      alert(`Valor selecionado: ${cardapioValue}`);
    }
  };

  return (
    <div className="PMpage">
      <div className="PMcontentPageMenu">
        <div className="PMMenuTitle-container">
          <h1>Menu</h1>
        </div>
        <div className="PMMenuItems">
          <div className="PMMenuItemsTitle">
            <h2>Itens do Menu</h2>
          </div>
          <div className="PMMenuItemsDataContent">
            {PMfetchError ? (
              <div className="PMFetchErrorMessage">{PMfetchError}</div>
            ) : (
              <div className="PMResponsiveBackground">
                <div
                  className="PMTableContainer"
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
                      {PMmenuItems.map((menuItem) => (
                        <tr
                          key={menuItem.id}
                          className={
                            PMselectedMenuItem === menuItem ? "selected" : ""
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
        <div className="PMEnviarButton">
          <button onClick={handleEnviarClick}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default PageMenu;
