import React, { useState, useEffect } from "react";
import "./PageWaiters.css";

function PageWaiters() {
  const [waiterName, setWaiterName] = useState("");
  const [waiterDescription, setWaiterDescription] = useState("");
  const [waiterCategory, setWaiterCategory] = useState("");
  const [waiterValue, setWaiterValue] = useState("");
  const [imageBase64, setImageBase64] = useState("");
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
      setWaiterDescription(selectedWaiter.descricao);
      setWaiterCategory(selectedWaiter.categoria);
      setWaiterValue(selectedWaiter.valor);
      setIsEditMode(true);
    }
  }, [selectedWaiter]);

  const handleWaiterNameChange = (e) => {
    setWaiterName(e.target.value);
  };

  const handleWaiterDescriptionChange = (e) => {
    setWaiterDescription(e.target.value);
  };

  const handleWaiterCategoryChange = (e) => {
    setWaiterCategory(e.target.value);
  };

  const handleWaiterValueChange = (e) => {
    setWaiterValue(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64WithoutPrefix = event.target.result.replace(
          /^data:image\/[a-zA-Z+]+;base64,/,
          ""
        );
        setImageBase64(base64WithoutPrefix);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const resetForm = () => {
    setWaiterName("");
    setWaiterDescription("");
    setWaiterCategory("");
    setWaiterValue("");
    setImageBase64("");
    setFormKey((prevKey) => prevKey + 1);
    setIsEditMode(false);
    setSelectedWaiterId(null);
  };

  const fetchWaiters = async () => {
    try {
      const response = await fetch(
        "https://orderease-api.onrender.com/api/listar-produtos?status=Ativo"
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
      !waiterDescription ||
      !waiterCategory ||
      !waiterValue
    ) {
      alert(
        "Por favor, preencha todos os campos do formulário e selecione uma imagem."
      );
      return;
    }

    const waiterStatus = "Ativo";

    const data = {
      waiterName,
      waiterDescription,
      waiterValue,
      waiterCategory,
      waiterStatus,
    };

    if (imageBase64) {
      data.imageBase64 = imageBase64;
    }

    try {
      const response = await fetch(
        "https://orderease-api.onrender.com/api/adicionar-produto",
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
      !waiterDescription ||
      !waiterCategory ||
      !waiterValue
    ) {
      alert(
        "Por favor, preencha todos os campos do formulário e selecione uma imagem."
      );
      return;
    }

    const data = {
      waiterName,
      waiterDescription,
      waiterValue,
      waiterCategory,
    };

    if (imageBase64) {
      data.imageBase64 = imageBase64;
    }

    try {
      const response = await fetch(
        `https://orderease-api.onrender.com/api/atualizar-produto/${selectedWaiter.id}`,
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
        `https://orderease-api.onrender.com/api/excluir-produto/${selectedWaiter.id}`,
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
      <div className="contentPageProduct">
        <div className="ProductTitle-container">
          <h1>Garçons</h1>
        </div>
        <div className="ButtonNewProduct">
          <button className="buttonDefaultStyle" onClick={resetForm}>
            {isEditMode ? "Cancelar" : "Novo"}
          </button>
        </div>
        <div className="ProductsRegistered">
          <div className="ProductsRegisteredTittle">
            <h2>Garçons Cadastrados</h2>
          </div>
          <div className="ProductsRegisteredDataContent">
            {fetchError ? (
              <div className="FetchErrorMessage">{fetchError}</div>
            ) : (
              <ul>
                {waiterList.map((waiter) => (
                  <li
                    key={waiter.id}
                    className={
                      selectedWaiterId === waiter.id ? "selected" : ""
                    }
                  >
                    <button onClick={() => handleWaiterSelect(waiter)}>
                      {waiter.nome}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="DetailedProductData" key={formKey}>
          <div className="DetailedProductDataTittle">
            <h2>Dados do Garçom</h2>
          </div>
          <div className="DetailedProductDataContent">
            <form>
            <label htmlFor="waiterName">Nome do Garçom:</label>
              <input
                type="text"
                id="waiterName"
                value={waiterName}
                onChange={handleWaiterNameChange}
              />

              <label htmlFor="waiterDescription">Descrição:</label>
              <textarea
                id="waiterDescription"
                value={waiterDescription}
                onChange={handleWaiterDescriptionChange}
              />

              <label htmlFor="waiterCategory">Categoria do Garçom:</label>
              <select
                id="waiterCategory"
                value={waiterCategory}
                onChange={handleWaiterCategoryChange}
              >
                <option value="">Selecione uma categoria</option>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>

              <label htmlFor="waiterValue">Valor do Garçom:</label>
              <input
                type="text"
                id="waiterValue"
                value={waiterValue}
                onChange={handleWaiterValueChange}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9,.]/g, "");
                }}
              />

              <label htmlFor="waiterImage">Imagem do Garçom:</label>
              <input
                type="file"
                id="waiterImage"
                onChange={handleImageChange}
              />
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
              className={`ProductServer-response ${
                serverResponse.includes("sucesso") ? "success" : "error"
              } ${showProgressBar ? "show" : ""}`}
            >
              {serverResponse}
            </div>
          )}
          {showProgressBar && (
            <div
              className={`ProductProgress-container ${
                showProgressBar ? "show" : ""
              }`}
            >
              <div
                className="ProductProgress-bar"
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