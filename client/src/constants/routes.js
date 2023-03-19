import Dashboard from "../Pages/Dashboard";
import Profile from "../Pages/Profile";
import Transaction from "../Pages/Transaction";
import Test from "../Pages/Test";
import ApplyLeave from "../Pages/Leave/ApplyLeave";
import LeaveRecords from "../Pages/Leave/LeaveRecords";
import UserLeaveManagement from "../Pages/Leave/UserLeaveManagement";
import paths from "./paths";


const routes = [
  { path: paths.getDashboard(), name: "Dashboard", checkName: "dashboard", element: Dashboard },
  { path: paths.getProfile(), name: "Profile", checkName: "profile", element: Profile },
  { path: paths.getTransaction(), name: "Transaction", checkName: "transaction", element: Transaction },
  { path: paths.getTestPage(), name: "Test Page", checkName: "test_page", element: Test },
  { path: paths.getApplyLeave(), name: "Apply Leave", checkName: "apply_leave", element: ApplyLeave},
  { path: paths.getLeaveManagement(), name: "User Leave Management", checkName: "user_leave_management", element: UserLeaveManagement},
  { path: paths.getLeaveRecords(), name: "Leave Records", checkName: "leave_records", element: LeaveRecords},
];

export default routes;
