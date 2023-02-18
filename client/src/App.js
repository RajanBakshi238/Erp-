import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import Test from "./Pages/Test";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard";

import DashboardLayout from "./Layouts/DashboardLayout";

function App() {
  const router = createBrowserRouter(createRoutesFromElements([
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
    </Route>,
    <Route path="/test" element={<Test />}/>,
    <Route path="/login" element={<Login />} />
  ]));


  
  return <RouterProvider router={router} />;
}

export default App;
