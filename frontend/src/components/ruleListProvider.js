import { useEffect, useState } from "react";
import { RuleListContext } from "./ruleListContext.js";

function RuleListProvider({ children }) {
  const [ruleListObject, setRuleListObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);
  console.log('fetching rules')
  async function handleLoad() {
    setRuleListObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8080/api/rules/`, {
      method: "GET",
    });
    console.log('GET response:', response)
    const responseJson = await response.json();
    if (response.status < 400) {
      setRuleListObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setRuleListObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    console.log('handle create')
    console.log(dtoIn)
    setRuleListObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8080/api/rules/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setRuleListObject((current) => {
        current.data.push(responseJson);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setRuleListObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleDelete(id) {
    setRuleListObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8080/api/rules/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (response.status < 400) {
      setRuleListObject((current) => {
        const ruleIndex = current.data.findIndex(
          (e) => e.id === id
        );
        current.data.splice(ruleIndex, 1);
        return { state: "ready", data: current.data };
      });
      return
    } else {
      setRuleListObject((current) => ({
        state: "error",
        data: current.data,
        error: response.errors,
      }));
      throw new Error(JSON.stringify(response, null, 2));
    }
  }

  const value = {
    state: ruleListObject.state,
    ruleList: ruleListObject.data || [],
    handlerMap: { handleCreate, handleDelete },
  };

  return (
    <RuleListContext.Provider value={value}>
      {children}
    </RuleListContext.Provider>
  );
}

export default RuleListProvider;