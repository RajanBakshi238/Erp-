import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Test from "./Pages/Test";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard";
import useAxiosPrivate from "./hooks/auth/useAxiosPrivate";

import DashboardLayout from "./Layouts/DashboardLayout";

function App() {
  // useAxiosPrivate();    // don't know why it was not working ... here but worked perfectly in dashboar layout

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="test" element={<Test />} />
      </Route>,
      // <Route path="/test" element={<Test />} />,
      <Route path="/login" element={<Login />} />,
    ])
  );

  return <RouterProvider router={router} />;
}

export default App;
