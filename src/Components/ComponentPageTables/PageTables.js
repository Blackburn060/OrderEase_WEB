import React, { useState, useEffect } from "react";
import "./PageTables.css";

const PageTables = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [newTable, setNewTable] = useState({ numero: "", status: "" });
  const [showNewTableForm, setShowNewTableForm] = useState(false);
  const [lastOperation, setLastOperation] = useState(null);
  const [updateTable, setUpdateTable] = useState({ numero: "", status: "" });

  const fetchTables = async () => {
    try {
      const response = await fetch(
        "https://orderease-api.azurewebsites.net/api/obter-mesas"
      );
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Erro ao obter dados das mesas:", error);
    }
  };

  const reloadData = () => {
    fetchTables();
  };

  useEffect(() => {
    fetchTables();
  }, []);

  useEffect(() => {
    fetchTables();
  }, [lastOperation]);

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setShowNewTableForm(false);
    setUpdateTable({ numero: table.numero, status: table.status });
  };

  const handleNewTableChange = (e) => {
    const { name, value } = e.target;

    // Se o tipo do elemento for "select", use o valor selecionado diretamente
    const newValue = e.target.type === "select-one" ? e.target.value : value;

    setNewTable((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleAddTable = () => {
    setShowNewTableForm(true);
    setSelectedTable(null);
    setNewTable({ numero: "", status: "Disponível" }); // Valor padrão para status
  };

  const handleCancel = () => {
    if (selectedTable) {
      setSelectedTable(null);
    } else {
      setShowNewTableForm(false);
    }
    setNewTable({ numero: "", status: "" });
  };

  const handleSendTable = async () => {
    try {
      // Construa o objeto newTable da mesma forma que é feito em handleUpdateTable
      const newTableData = {
        numero: newTable.numero,
        status: newTable.status,
      };

      const response = await fetch(
        "https://orderease-api.azurewebsites.net/api/adicionar-mesa",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTableData), // Use o novo objeto construído
        }
      );

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(
          `Erro na requisição: ${response.statusText} - ${JSON.stringify(
            responseBody
          )}`
        );
      }

      const newData = await response.json();
      setTableData((prevData) => [...prevData, newData]);

      setNewTable({ numero: "", status: "" });
      setShowNewTableForm(false);

      setLastOperation("add");

      reloadData();
    } catch (error) {
      console.error("Erro ao adicionar nova mesa:", error);
    }
  };

  const handleUpdateTable = async () => {
    if (!selectedTable) return;

    try {
      const updatedData = {
        numero: updateTable.numero,
        status: updateTable.status,
      };

      const response = await fetch(
        `https://orderease-api.azurewebsites.net/api/atualizar-mesa/${selectedTable.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const updatedTable = await response.json();
      setTableData((prevData) =>
        prevData.map((table) =>
          table.id === updatedTable.id ? updatedTable : table
        )
      );

      setSelectedTable(null);
      setShowNewTableForm(false);
      setUpdateTable({ numero: "", status: "" }); // Limpar os dados de atualização

      setLastOperation("update");

      reloadData();
    } catch (error) {
      console.error("Erro ao atualizar mesa:", error);
    }
  };

  const handleDeleteTable = async () => {
    if (!selectedTable) return;

    try {
      const response = await fetch(
        `https://orderease-api.azurewebsites.net/api/deletar-mesa/${selectedTable.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      setTableData((prevData) =>
        prevData.filter((table) => table.id !== selectedTable.id)
      );

      setSelectedTable(null);

      setLastOperation("delete");

      reloadData();
    } catch (error) {
      console.error("Erro ao deletar mesa:", error);
    }
  };

  return (
    <div className="page">
      <div className="contentPageTable">
        <div className="TableTitle-container">
          <h1>Mesas</h1>
        </div>
        <div className="ButtonNewTable">
          {showNewTableForm ? (
            <>
              <button className="buttonDefaultStyle" onClick={handleCancel}>
                Cancelar
              </button>
            </>
          ) : (
            <button
              className="buttonDefaultStyle"
              onClick={selectedTable ? handleCancel : handleAddTable}
            >
              {selectedTable ? "Cancelar" : "Novo"}
            </button>
          )}
        </div>
        <div className="DetailedTableData">
          <div className="DetailedTableDataTitle">
            <h2>Dados das Mesas</h2>
          </div>
          <div className="DetailedTableDataContent">
            <table>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
        {tableData.map((table) => (
          <tr
            key={table.id}
            onClick={() => handleTableSelect(table)}
            className={
              selectedTable && selectedTable.id === table.id
                ? "selectedRow"
                : ""
            }
          >
            <td>{table.numero}</td>
            <td>{table.status}</td>
          </tr>
        ))}
        {showNewTableForm && (
          <tr>
            <td>
              <input
                type="text"
                name="numero"
                value={newTable.numero}
                onChange={handleNewTableChange}
              />
            </td>
            <td>
              <select
                name="status"
                value={newTable.status}
                onChange={handleNewTableChange}
              >
                <option value="Disponível">Disponível</option>
                <option value="Ocupada">Ocupada</option>
              </select>
            </td>
          </tr>
        )}
                {selectedTable && !showNewTableForm && (
                  <>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="numero"
                          value={updateTable.numero}
                          onChange={(e) =>
                            setUpdateTable((prev) => ({
                              ...prev,
                              numero: e.target.value,
                            }))
                          }
                        />
                      </td>
                      <td>
                        <select
                          name="status"
                          value={updateTable.status}
                          onChange={(e) =>
                            setUpdateTable((prev) => ({
                              ...prev,
                              status: e.target.value,
                            }))
                          }
                        >
                          <option value="Disponível">Disponível</option>
                          <option value="Ocupada">Ocupada</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          className="buttonDefaultStyle updateButton"
                          onClick={handleUpdateTable}
                        >
                          Atualizar
                        </button>
                      </td>
                      <td>
                        <button
                          className="buttonDefaultStyle deleteButton"
                          onClick={handleDeleteTable}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  </>
                )}
                {showNewTableForm && (
                  <tr>
                    <td>
                      <button
                        className="buttonDefaultStyle sendButton"
                        onClick={handleSendTable}
                      >
                        Enviar
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTables;
