import axios from "axios";
import "./App.css";
// import Auth from "./components/Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useAppSelector } from "./redux/store";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./LayOut/Layout";
// import { Profiler } from "react";

function App() {
  const { token } = useAppSelector((state) => state.auth);
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;

  const router = createBrowserRouter(
    createRoutesFromElements(
   <Route path='/' element={<Layout/>}>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    {/* <Route path='/contact' element={<Profile/>} /> */}
   </Route>
    )
  )

  return (
    <>
    <RouterProvider router={router}/>
      {/* <Auth role={["admin"]}>
        {" "}
        <Home />{" "}
      </Auth>
      <Login /> */}
    </>
  );
}

export default App;
