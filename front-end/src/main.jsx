import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App.jsx";
import "./index.css";
import Auth from "./pages/Auth.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import Upload from "./pages/Upload.jsx";
import Stream from "./pages/Stream.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/upload",
    element: <Upload />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/stream",
    element: <Stream />,
    errorElement: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
