import React, { useState, useEffect } from "react";
import "./PageWaiters.css";

function PageWaiters() {
  const [waiterName, setWaiterName] = useState("");
  const [waiterSurname, setWaiterSurname] = useState("");
  const [waiterEmail, setWaiterEmail] = useState("");
  const [waiterPassword, setWaiterPassword] = useState("");
  const [waiterSituation, setWaiterSituation] = useState("");
  const [serverResponse, setServerResponse] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progressWidth, setProgressWidth] = useState("0%");
  const [formKey, setFormKey] = useState(0);
  const [waiterList, setWaiterList] = useState([]);
  const [selectedWaiter, setSelectedWaiter] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [selectedWaiterId, setSelectedWaiterId] = useState(null);

  useEffect(() => {
    fetchWaiters();

    const intervalId = setInterval(() => {
      fetchWaiters();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (selectedWaiter) {
      setWaiterName(selectedWaiter.nome);
      setWaiterSurname(selectedWaiter.sobrenome);
      setWaiterEmail(selectedWaiter.email);
      setWaiterPassword(selectedWaiter.senha);
      setWaiterSituation(selectedWaiter.situacao);
      setIsEditMode(true);
    }
  }, [selectedWaiter]);

  const handleWaiterNameChange = (e) => {
    setWaiterName(e.target.value);
  };

  const handlewaiterSurnameChange = (e) => {
    setWaiterSurname(e.target.value);
  };

  const handlewaiterEmailChange = (e) => {
    setWaiterEmail(e.target.value);
  };

  const handleWaiterPasswordChange = (e) => {
    setWaiterPassword(e.target.value);
  };

  const handleWaiterSituationChange = (e) => {
    setWaiterSituation(e.target.value);
  };

  const resetForm = () => {
    setWaiterName("");
    setWaiterSurname("");
    setWaiterEmail("");
    setWaiterPassword("");
    setWaiterSituation("");
    setFormKey((prevKey) => prevKey + 1);
    setIsEditMode(false);
    setSelectedWaiterId(null);
  };

  const fetchWaiters = async () => {
    try {
      const response = await fetch(
        "https://orderease-api.onrender.com/api/listar-garcons?status=Ativo"
      );
      if (response.ok) {
        const waitersData = await response.json();
        setWaiterList(waitersData);
        setFetchError(null);
      } else {
        console.error("Erro ao buscar garçons:", response.statusText);
        setFetchError("Erro ao buscar garçons!");
      }
    } catch (error) {
      console.error("Erro ao buscar garçons:", error);
      setFetchError("Erro ao buscar garçons!");
    }
  };

  const handleWaiterSelect = (waiter) => {
    setSelectedWaiterId(waiter.id);
    setSelectedWaiter({ ...waiter });
  };

  const handleSubmit = async () => {
    if (
      !waiterName ||
      !waiterSurname ||
      !waiterEmail ||
      !waiterPassword ||
      !waiterSituation
    ) {
      alert("Por favor, preencha todos os campos do formulário.");
      return;
    }

    const data = {
      waiterName,
      waiterSurname,
      waiterEmail,
      waiterSituation,
      waiterPassword,
      waiterStatus: "Ativo",
    };

    try {
      const response = await fetch(
        "https://orderease-api.onrender.com/api/adicionar-garcom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Garçom cadastrado com sucesso!");
        setServerResponse("Garçom cadastrado com sucesso!");
        setShowProgressBar(true);

        setProgressWidth("100%");
        let startTime = Date.now();
        const intervalId = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(4000 - elapsed, 0);
          const width = `${(remainingTime / 4000) * 100}%`;
          setProgressWidth(width);
        }, 100);

        setTimeout(() => {
          setServerResponse(null);
          setShowProgressBar(false);
          clearInterval(intervalId);
          setProgressWidth("0%");
        }, 4000);

        resetForm();
        setSelectedWaiter(null);
        fetchWaiters();
      } else {
        console.error("Erro ao cadastrar o garçom");
        setServerResponse("Erro ao cadastrar o garçom");
        setShowProgressBar(true);

        setProgressWidth("100%");
        let startTime = Date.now();
        const intervalId = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(4000 - elapsed, 0);
          const width = `${(remainingTime / 4000) * 100}%`;
          setProgressWidth(width);
        }, 100);

        setTimeout(() => {
          setServerResponse(null);
          setShowProgressBar(false);
          clearInterval(intervalId);
          setProgressWidth("0%");
        }, 4000);
      }
    } catch (error) {
      console.error("Erro durante a solicitação para o servidor:", error);
      setServerResponse("Erro durante a solicitação para o servidor");
      setShowProgressBar(true);

      setProgressWidth("100%");
      let startTime = Date.now();
      const intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(4000 - elapsed, 0);
        const width = `${(remainingTime / 4000) * 100}%`;
        setProgressWidth(width);
      }, 100);

      setTimeout(() => {
        setServerResponse(null);
        setShowProgressBar(false);
        clearInterval(intervalId);
        setProgressWidth("0%");
      }, 4000);
    }
  };

  const handleUpdate = async () => {
    if (
      !waiterName ||
      !waiterSurname ||
      !waiterEmail ||
      !waiterPassword ||
      !waiterSituation
    ) {
      alert("Por favor, preencha todos os campos do formulário.");
      return;
    }

    const data = {
      waiterName,
      waiterSurname,
      waiterEmail,
      waiterSituation,
      waiterPassword,
    };

    try {
      const response = await fetch(
        `https://orderease-api.onrender.com/api/atualizar-garcom/${selectedWaiter.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Garçom atualizado com sucesso!");
        setServerResponse("Garçom atualizado com sucesso!");
        setShowProgressBar(true);

        setProgressWidth("100%");
        let startTime = Date.now();
        const intervalId = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(4000 - elapsed, 0);
          const width = `${(remainingTime / 4000) * 100}%`;
          setProgressWidth(width);
        }, 100);

        setTimeout(() => {
          setServerResponse(null);
          setShowProgressBar(false);
          clearInterval(intervalId);
          setProgressWidth("0%");
        }, 4000);

        resetForm();
        setSelectedWaiter(null);
        fetchWaiters();
      } else {
        console.error("Erro ao atualizar o garçom");
        setServerResponse("Erro ao atualizar o garçom");
        setShowProgressBar(true);

        setProgressWidth("100%");
        let startTime = Date.now();
        const intervalId = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(4000 - elapsed, 0);
          const width = `${(remainingTime / 4000) * 100}%`;
          setProgressWidth(width);
        }, 100);

        setTimeout(() => {
          setServerResponse(null);
          setShowProgressBar(false);
          clearInterval(intervalId);
          setProgressWidth("0%");
        }, 4000);
      }
    } catch (error) {
      console.error("Erro durante a solicitação para o servidor:", error);
      setServerResponse("Erro durante a solicitação para o servidor");
      setShowProgressBar(true);

      setProgressWidth("100%");
      let startTime = Date.now();
      const intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(4000 - elapsed, 0);
        const width = `${(remainingTime / 4000) * 100}%`;
        setProgressWidth(width);
      }, 100);

      setTimeout(() => {
        setServerResponse(null);
        setShowProgressBar(false);
        clearInterval(intervalId);
        setProgressWidth("0%");
      }, 4000);
    }
  };

  const handleDelete = async () => {
    if (!selectedWaiter) {
      return;
    }

    try {
      const response = await fetch(
        `https://orderease-api.onrender.com/api/excluir-garcom/${selectedWaiter.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Garçom excluído com sucesso!");
        setServerResponse("Garçom excluído com sucesso!");
        setShowProgressBar(true);

        setProgressWidth("100%");
        let startTime = Date.now();
        const intervalId = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(4000 - elapsed, 0);
          const width = `${(remainingTime / 4000) * 100}%`;
          setProgressWidth(width);
        }, 100);

        setTimeout(() => {
          setServerResponse(null);
          setShowProgressBar(false);
          clearInterval(intervalId);
          setProgressWidth("0%");
        }, 4000);

        resetForm();
        setSelectedWaiter(null);
        fetchWaiters();
      } else {
        console.error("Erro ao excluir o garçom");
        setServerResponse("Erro ao excluir o garçom");
        setShowProgressBar(true);

        setProgressWidth("100%");
        let startTime = Date.now();
        const intervalId = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(4000 - elapsed, 0);
          const width = `${(remainingTime / 4000) * 100}%`;
          setProgressWidth(width);
        }, 100);

        setTimeout(() => {
          setServerResponse(null);
          setShowProgressBar(false);
          clearInterval(intervalId);
          setProgressWidth("0%");
        }, 4000);
      }
    } catch (error) {
      console.error("Erro durante a solicitação para o servidor:", error);
      setServerResponse("Erro durante a solicitação para o servidor");
      setShowProgressBar(true);

      setProgressWidth("100%");
      let startTime = Date.now();
      const intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(4000 - elapsed, 0);
        const width = `${(remainingTime / 4000) * 100}%`;
        setProgressWidth(width);
      }, 100);

      setTimeout(() => {
        setServerResponse(null);
        setShowProgressBar(false);
        clearInterval(intervalId);
        setProgressWidth("0%");
      }, 4000);
    }
  };

  const confirmDelete = () => {
    const userConfirmed = window.confirm(
      "Tem certeza que deseja excluir o garçom?"
    );
    if (userConfirmed) {
      handleDelete();
    }
  };

  return (
    <div className="page">
      <div className="contentPageWaiter">
        <div className="WaiterTitle-container">
          <h1>Garçons</h1>
        </div>
        <div className="ButtonNewWaiter">
          <button className="buttonDefaultStyle" onClick={resetForm}>
            {isEditMode ? "Cancelar" : "Novo"}
          </button>
        </div>
        <div className="WaitersRegistered">
          <div className="WaitersRegisteredTittle">
            <h2>Garçons Cadastrados</h2>
          </div>
          <div className="WaitersRegisteredDataContent">
            {fetchError ? (
              <div className="FetchErrorMessage">{fetchError}</div>
            ) : (
              <ul>
                {waiterList.map((waiter) => (
                  <li
                    key={waiter.id}
                    className={selectedWaiterId === waiter.id ? "selected" : ""}
                  >
                    <button onClick={() => handleWaiterSelect(waiter)}>
                    {`${waiter.nome} ${waiter.sobrenome}`}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="DetailedWaiterData" key={formKey}>
          <div className="DetailedWaiterDataTittle">
            <h2>Dados do Garçom</h2>
          </div>
          <div className="DetailedWaiterDataContent">
            <form>
              <label htmlFor="waiterName">Nome:</label>
              <input
                type="text"
                id="waiterName"
                value={waiterName}
                onChange={handleWaiterNameChange}
              />

              <label htmlFor="waiterSurname">Sobrenome:</label>
              <input
                type="text"
                id="waiterSurname"
                value={waiterSurname}
                onChange={handlewaiterSurnameChange}
              />

              <label htmlFor="waiterEmail">E-mail:</label>
              <input
                type="email"
                id="waiterEmail"
                value={waiterEmail}
                onChange={handlewaiterEmailChange}
              />

              <label htmlFor="waiterPassword">Senha:</label>
              <input
                type="password"
                id="waiterPassword"
                value={waiterPassword}
                onChange={handleWaiterPasswordChange}
              />

              <label htmlFor="waiterSituation">Situação</label>
              <select
                id="waiterSituation"
                value={waiterSituation}
                onChange={handleWaiterSituationChange}
              >
                <option value="">Situação do Garçom</option>
                <option value="Contratado">Contratado</option>
                <option value="Demitido">Demitido</option>
                <option value="Ferias">Férias</option>
                <option value="Afastado">Afastado</option>
              </select>

              <button
                className="buttonDefaultStyle"
                type="button"
                onClick={isEditMode ? handleUpdate : handleSubmit}
              >
                {isEditMode ? "Atualizar" : "Enviar"}
              </button>
              {selectedWaiter && isEditMode && (
                <button
                  className="buttonDefaultStyle deleteButton"
                  type="button"
                  onClick={confirmDelete}
                >
                  Excluir
                </button>
              )}
            </form>
          </div>
          {serverResponse && (
            <div
              className={`WaiterServer-response ${
                serverResponse.includes("sucesso") ? "success" : "error"
              } ${showProgressBar ? "show" : ""}`}
            >
              {serverResponse}
            </div>
          )}
          {showProgressBar && (
            <div
              className={`WaiterProgress-container ${
                showProgressBar ? "show" : ""
              }`}
            >
              <div
                className="WaiterProgress-bar"
                style={{ width: progressWidth }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageWaiters;
