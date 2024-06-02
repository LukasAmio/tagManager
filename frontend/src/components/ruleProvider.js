import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { RuleContext } from "./ruleContext.js";

function RuleProvider({ children }) {
  const [ruleLoadObject, setRuleLoadObject] = useState({
    state: "pending",
    error: null,
    data: null,
  });
  const location = useLocation();

  /* eslint-disable */
  useEffect(() => {
    handleLoad();
  }, []);
  /* eslint-enable */

  async function handleLoad() {
    setRuleLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8080/rules/?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
    const responseJson = await response.json();

    if (response.status < 400) {
      setRuleLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setRuleLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
    }
  }


  const value = {
    state: ruleLoadObject.state,
    rule: ruleLoadObject.data
  };

  return (
    <RuleContext.Provider value={value}>{children}</RuleContext.Provider>
  );
}

export default RuleProvider;