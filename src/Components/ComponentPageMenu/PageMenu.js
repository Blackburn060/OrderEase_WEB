import React, { useState, useEffect } from "react";
import "./PageMenu.css";

function PageMenu() {
  const [PMmenuItems, setPMMenuItems] = useState([]);
  const [PMfetchError, setPMFetchError] = useState(null);
  const [PMselectedMenuItems, setPMSelectedMenuItems] = useState([]);
  const [PMselectedOptions, setPMSelectedOptions] = useState({});
  
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
  
        const initialSelectedItems = menuData.reduce((acc, menuItem) => {
          if (menuItem.cardapio === "Sim") {
            acc.push(menuItem.id);
          }
          setPMSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [menuItem.id]: menuItem.cardapio,
          }));
  
          return acc;
        }, []);
        setPMSelectedMenuItems(initialSelectedItems);
      } else {
        console.error("Erro ao buscar itens do menu:", response.statusText);
        setPMFetchError("Erro ao buscar itens do menu!");
      }
    } catch (error) {
      console.error("Erro ao buscar itens do menu:", error);
      setPMFetchError("Erro ao buscar itens do menu!");
    }
  };
  
  const handleMenuItemSelect = async (menuItem, value) => {
    try {
      setPMSelectedMenuItems((prevSelected) => {
        const updatedSelection = [...prevSelected];
        const existingIndex = updatedSelection.findIndex(
          (selectedId) => selectedId === menuItem.id
        );

        if (existingIndex !== -1) {
          updatedSelection.splice(existingIndex, 1);
        }

        if (value === "Sim") {
          updatedSelection.push(menuItem.id);
        }
        
        setPMSelectedOptions((prevOptions) => ({
          ...prevOptions,
          [menuItem.id]: value,
        }));

        return updatedSelection;
      });

      const response = await fetch(
        `https://orderease-api.up.railway.app/api/atualizar-produto-cardapio/${menuItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cardapio: value }),
        }
      );

      if (!response.ok) {
        console.error("Erro ao atualizar item do menu:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao atualizar item do menu:", error);
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
                        <th>Item de cardápio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PMmenuItems.map((menuItem) => (
                        <tr
                          key={menuItem.id}
                          className={
                            PMselectedMenuItems.includes(menuItem.id)
                              ? "selected"
                              : ""
                          }
                        >
                          <td>{menuItem.nome}</td>
                          <td>{`R$ ${menuItem.valor}`}</td>
                          <td>{menuItem.categoria}</td>
                          <td>
                          <select
                            value={PMselectedOptions[menuItem.id] || menuItem.cardapio}
                            onChange={(e) => handleMenuItemSelect(menuItem, e.target.value)}
                            style={{
                              backgroundColor:
                                PMselectedOptions[menuItem.id] === "Sim" ? "lightgreen" : "LightCoral",
                            }}
                          >
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                          </select>
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
