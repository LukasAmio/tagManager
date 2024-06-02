import { useContext, useState } from "react";
import { RuleListContext } from "./ruleListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import RuleCard from "./ruleCard";
import RuleForm from "./ruleForm.js";
import Container from "react-bootstrap/esm/Container.js";

import ConfirmDeleteDialog from "./confirmDeleteDialog.js";

function RuleList() {
  const { ruleList } = useContext(RuleListContext);
  const [showRuleForm, setShowRuleForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  console.log('ruleList:', ruleList)
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowRuleForm({})}>
         Nové pravidlo
        </Button>
      </div>
      {!!showRuleForm ? (
        <RuleForm rule={showRuleForm} setShowRuleForm={setShowRuleForm} />
      ) : null}
      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          rule={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
      {ruleList.map((rule) => {
        return (
          <RuleCard
            key={rule.id}
            rule={rule}
            setShowRuleForm={setShowRuleForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}
    </Container>
  );
}

export default RuleList;