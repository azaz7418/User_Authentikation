// import axios from "axios";
import "./App.css";
import Home from "./pages/Home";
// import { useAppSelector } from "./redux/store";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./LayOut/Layout";

function App() {
  // const { token } = useAppSelector((state) => state.auth);
  // axios.defaults.headers["Authorization"] = `Bearer ${token}`;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/:city?" element={<Home />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      
    </>
  );
}

export default App;
