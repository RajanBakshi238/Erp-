import Dashboard from "../Pages/Dashboard";
import Profile from "../Pages/Profile";
import Transaction from "../Pages/Transaction";
import Test from "../Pages/Test";
import ApplyLeave from "../Pages/Leave/ApplyLeave";
import LeaveRecords from "../Pages/Leave/LeaveRecords";
import UserLeaveManagement from "../Pages/Leave/UserLeaveManagement";
import AllEmployees from "../Pages/Employees/AllEmployees";
import EditEmployee from "../Pages/Employees/EditEmployee";
import FeatureAssign from "../Pages/FeatureAssign";

import paths from "./paths";

//  in upcoming  time we will improve the structure of these routes i.e nesting of routing in common group name....

// we will add sub group name for bread-crumbs
const routes = [
  { path: paths.getDashboard(), name: "Dashboard", checkName: "dashboard", element: Dashboard },
  { path: paths.getProfile(), name: "Profile", checkName: "profile", element: Profile },
  { path: paths.getTransaction(), name: "Transaction", checkName: "transaction", element: Transaction },
  { path: paths.getTestPage(), name: "Test Page", checkName: "test_page", element: Test },
  { path: paths.getApplyLeave(), name: "Apply Leave", checkName: "apply_leave", element: ApplyLeave},
  { path: paths.getLeaveManagement(), name: "User Leave Management", checkName: "user_leave_management", element: UserLeaveManagement},
  { path: paths.getLeaveRecords(), name: "Leave Records", checkName: "leave_records", element: LeaveRecords},
  { path: paths.getAllEmployee(), name: "All Employees", checkName: "all_employees", element: AllEmployees},
  { path: paths.getEditEmployee(), name: "Edit Employee", checkName: "edit_employee", element: EditEmployee},
  { path: paths.getAssignFeature(), name: "Feature Assign", checkName: "assign_feature", element: FeatureAssign},




  
];

export default routes;
