import Button from "react-bootstrap/esm/Button.js";

function RuleCard({ rule, setShowConfirmDeleteDialog }) {

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
        <div>
            <div> { rule.name },{ rule.level }</div>
            <div> { JSON.stringify(rule.value) } </div>
        </div>
      <div
        style={{
          display: "grid",
          gap: "2px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => setShowConfirmDeleteDialog(rule)}
          size={"sm"}
          variant="danger"
        >
            SMAZAT
        </Button>
      </div>
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "max-content auto 32px",
    columnGap: "8px",
    maxWidth: "70%",
  };
}

export default RuleCard;