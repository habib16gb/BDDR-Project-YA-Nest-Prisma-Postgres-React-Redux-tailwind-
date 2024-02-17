import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import Employees from "./pages/Employees.jsx";
import Products from "./pages/Products.jsx";
import Stores from "./pages/Stores.jsx";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category";
import StoreProduct from "./pages/StoreProduct.jsx";
import StoreDetails from "./components/store/StoreDetails.jsx";
import ProductDetails from "./components/product/ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      { path: "/employees", element: <Employees /> },
      { path: "/home", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/stores", element: <Stores /> },
      { path: "/categories", element: <Category /> },
      { path: "/store_products", element: <StoreProduct /> },
      { path: "/home/stores/:storeId", element: <StoreDetails /> },
      { path: "/home/products/:productId", element: <ProductDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
