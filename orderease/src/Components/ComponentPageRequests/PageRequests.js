import React, { useState, useEffect } from "react";
import "./PageRequests.css";

function PageRequests() {
  const [pedidos, setPedidos] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const fetchPedidos = async () => {
    try {
      const response = await fetch(
        "https://orderease-api.up.railway.app/api/obter-pedidos"
      );

      if (response.ok) {
        const pedidosData = await response.json();
        setPedidos(pedidosData);
        setFetchError(null);
      } else {
        console.error("Erro ao buscar Pedidos:", response.statusText);
        setFetchError("Erro ao buscar Pedidos!");
      }
    } catch (error) {
      console.error("Erro ao buscar Pedidos:", error);
      setFetchError("Erro ao buscar Pedidos!");
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const calcularTotalPedido = (itens) => {
    return itens.reduce((acc, item) => acc + item.valor * item.quantidade, 0);
  };

  const calcularQuantidadeTotal = (itens) => {
    return itens.reduce((acc, item) => acc + item.quantidade, 0);
  };

  const calcularQuantidadeTotalTodosPedidos = () => {
    return pedidos.reduce(
      (acc, pedido) => acc + calcularQuantidadeTotal(pedido.itens),
      0
    );
  };

  return (
    <div className="page">
      <div className="contentPageRequests">
        <div className="RequestsTitle-container">
          <h1>Pedidos</h1>
        </div>

        {fetchError ? (
          <div className="FetchErrorMessage">{fetchError}</div>
        ) : (
          <div className="RequestsRegistered">
            {pedidos.map((pedido) => (
              <div className="RequestInfo" key={pedido.id}>
                <div className="RequestInfoTittle">
                  <h2>Dados do Pedido - {pedido.numeroPedido}</h2>
                </div>
                <div className="RequestInfoDataContent">
                  <ul className="RequestInfoDataList">
                    <li>Mesa: {pedido.mesa}</li>
                    <li>
                      Quantidade Total do Pedido:{" "}
                      {calcularQuantidadeTotal(pedido.itens)}
                    </li>
                    <li>
                      Valor Total do Pedido: {calcularTotalPedido(pedido.itens)}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PageRequests;
