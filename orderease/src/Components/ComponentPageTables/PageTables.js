import React from "react";
import "./PageTables.css";
function PageTables() {
  return (
    <div className="page">
      <div className="contentTable">
        <div className="titleContainerTable">
          <h1>Mesas</h1>
        </div>
        <div className="ButtonNewTable">
          <button className="buttonDefaultStyle">Novo</button>
        </div>
        <div className="DetailedTableData">
          <div className="DetailedTableDataTittle">
            <h2>Dados das Mesas - </h2>
          </div>
          <div className="DetailedTableDataContent">
            {/* Seu conteúdo aqui */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageTables;
