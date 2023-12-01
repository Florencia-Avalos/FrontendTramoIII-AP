import "./App.css";

import Error404 from "./components/pages/Error404/Error404";
import Home from "./components/pages/Home/Home";

import LayoutMain from "./components/pages/layouts/LayoutMain";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signInToken } from "./redux/actions/userAction";
import PostForm from "./components/Post/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path:"/post",
        element: <PostForm />
      },
    
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(signInToken());
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
