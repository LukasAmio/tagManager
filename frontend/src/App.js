import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from "./components/layout";
import RuleList from "./components/ruleList";
import RuleListProvider from "./components/ruleListProvider";
import RuleProvider from "./components/ruleProvider";
import RuleRoute from "./components/ruleRoute";

function App() {
  return (
    <div style={componentStyle()}>
        <RuleListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<RuleList />} />
                <Route
                  path="ruleDetail"
                  element={
                    <RuleProvider>
                      <RuleRoute />
                    </RuleProvider>
                  }
                />
                <Route path="*" element={"not found"} />
              </Route>
            </Routes>
          </BrowserRouter>
        </RuleListProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  };
}

export default App;