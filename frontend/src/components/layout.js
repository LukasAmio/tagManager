import { Outlet } from "react-router-dom";

import NavBar from "./header";

const Layout = () => {
  return (
    <>
      <div className="card-header">
        <NavBar />
      </div>
      <div style={bodyStyle()}>
        <Outlet />
      </div>
      <div className={"card-footer text-light"} style={footerStyle()}>
        © Lukáš Holý
      </div>
    </>
  );
};

function bodyStyle() {
  return {
    overflow: "auto",
    padding: "16px",
    flex: "1",
    borderTop: "white 4px solid",
    borderBottom: "white 4px solid",
  };
}

function footerStyle() {
  return { padding: "8px", textAlign: "center"};
}

export default Layout;
