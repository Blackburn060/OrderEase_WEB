import React, { useState, useEffect } from "react";
import "./PageTables.css";

function PageTables() {
  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState({ numero: null, status: null });
  const [newTable, setNewTable] = useState({ numero: "", status: "" });

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch("https://orderease-api.up.railway.app/api/obter-mesas");
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Erro ao obter dados das mesas:", error);
      }
    };

    fetchTables();
  }, []);

  const handleTableSelect = (numero, status) => {
    setSelectedTable({ numero, status });
  };

  const handleNewTableChange = (e) => {
    const { name, value } = e.target;
    setNewTable((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTable = async () => {
    try {
      const response = await fetch("https://orderease-api.up.railway.app/api/adicionar-mesa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTable),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const newData = await response.json();
      setTableData((prevData) => [...prevData, newData]);

      // Limpar os dados da nova mesa após a adição bem-sucedida
      setNewTable({ numero: "", status: "" });
    } catch (error) {
      console.error("Erro ao adicionar nova mesa:", error);
    }
  };

  return (
    <div className="page">
      <div className="contentPageTable">
        <div className="TableTitle-container">
          <h1>Mesas</h1>
        </div>
        <div className="ButtonNewTable">
          <button className="buttonDefaultStyle" onClick={handleAddTable}>
            Novo
          </button>
        </div>
        <div className="DetailedTableData">
          <div className="DetailedTableDataTitle">
            <h2>Dados das Mesas</h2>
          </div>
          <div className="DetailedTableDataContent">
            <table>
              <thead>
                <tr>
                  <th>Numero</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((table) => (
                  <tr key={table.id} onClick={() => handleTableSelect(table.numero, table.status)}>
                    <td>{table.numero}</td>
                    <td>{table.status}</td>
                  </tr>
                ))}
                {/* Adiciona uma linha para a nova mesa */}
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
                    <input
                      type="text"
                      name="status"
                      value={newTable.status}
                      onChange={handleNewTableChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageTables;
