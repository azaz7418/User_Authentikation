import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className=" h-full bg-amber-200 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;