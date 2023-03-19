import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Transaction from "./Pages/Transaction";
import Test from "./Pages/Test";

const routes = [
  { path: "/", name: "Dashboard", checkName: "dashboard", element: Dashboard },
  { path: "/profile", name: "Profile", checkName: "profile", element: Profile },
  { path: "/transaction", name: "Transaction", checkName: "transaction", element: Transaction },
  { path: "/test_page", name: "Test Page", checkName: "test_page", element: Test },
];

export default routes;
