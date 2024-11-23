import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Layout() {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
