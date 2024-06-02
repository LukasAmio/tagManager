import { useContext, useState } from "react";
import { RuleListContext } from "./ruleListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function RuleForm({ setShowRuleForm, rule }) {
  const { state, handlerMap } = useContext(RuleListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowRuleForm(false)}>
      <Form
        onSubmit={async (e) => {
          e.stopPropagation();
          var formData = Object.fromEntries(new FormData(e.target));
          formData.platform_ids = []
          formData.created_by = "system"
          try {
            await handlerMap.handleCreate(formData);

            setShowRuleForm(false);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>{`Vytvořit pravidlo`}</Modal.Title>
          <CloseButton onClick={() => setShowRuleForm(false)} />
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Nepodařilo se vytvořit pravidlo</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending ? (
            <div style={pendingStyle()}>
            </div>
          ) : null}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Název pravidla</Form.Label>
            <Form.Control
              type="text"
              name="name"
              // required
              defaultValue={rule.name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Úroveň pravidla</Form.Label>
            <Form.Select name="level">
                <option value="global">Global</option>
                <option value="platform">Platform</option>
                <option value="campaign">Campaign</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Query string</Form.Label>
            <Form.Control
              type="text"
              name="value"
              // required
              defaultValue={rule.value}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowRuleForm(false)}
            disabled={isPending}
          >
            Zavřít
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {rule.id ? "Upravit" : "Vytvořit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function pendingStyle() {
  return {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: "0.5",
  };
}

export default RuleForm;