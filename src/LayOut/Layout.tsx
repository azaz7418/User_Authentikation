import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useAppSelector } from "../redux/store";

function Layout() {
  const { image } = useAppSelector((state) => state.image);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* <video key={video?.video} className="absolute top-0 left-0 w-full h-full object-cover -z-10" autoPlay loop muted>
        <source src={video?.video} type="video/mp4" />
      </video> */}
      <img className="absolute top-0 left-0 w-full h-full object-cover -z-10" src={image} alt="" />
      <div className=" h-full bg-transparent overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
