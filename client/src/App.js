import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import Login from "./Pages/Login/Login";

function App() {
  const router = createBrowserRouter(createRoutesFromElements([
    <Route path="/" element={<Login />} />,
    <Route path="/login" element={<Login />} />
  ]));
  //  [
  //   {
  //     path: "/",
  //     element: <Login />,
  //   },
  // ]
  return <RouterProvider router={router} />;
}

export default App;
