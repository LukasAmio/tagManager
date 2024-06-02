import { useContext } from "react";
import { RuleContext } from "./ruleContext";


function RuleRoute() {

  const { state } = useContext(RuleContext);

  let child = null;
  switch (state) {
    case "ready":
      child = (
        <>
          <div
            className="card border-0 shadow rounded"
            style={componentStyle()}
          >
            <>
              <div
                style={{
                  display: "grid",
                  gap: "2px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
              </div>
            </>
          </div>
          <div
            className="card border-0 shadow rounded"
            style={componentStyle()}
          >
          </div>
        </>
      );
      break;
    case "pending":
      child = "loading...";
      break;
    case "error":
      child = "error";
      break;
    default:
      child = "loading...";
  }

  return child;
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "max-content auto 32px",
    columnGap: "8px",
    maxWidth: "640px",
  };
}

export default RuleRoute;