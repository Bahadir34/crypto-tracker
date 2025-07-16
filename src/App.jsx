import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Detail from "./pages/details";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/coin/:id", element: <Detail /> },
      ],
    },
  ]);
  return <RouterProvider router={router}> </RouterProvider>;
}

export default App;
