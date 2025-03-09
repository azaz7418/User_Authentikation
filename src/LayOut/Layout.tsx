import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Layout() {
  const {video}= useSelector(state=>state)
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <video key={video?.video} className="absolute top-0 left-0 w-full h-full object-cover -z-10" autoPlay loop muted>
        <source src={video?.video} type="video/mp4" />
      </video>
      <div className=" h-full bg-transparent overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;