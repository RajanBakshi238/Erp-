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
import Attendance from "../Pages/Attendance";
import Task from "../Pages/Task"
import AddTask from "../Pages/ManageTask/AddTask";

import paths from "./paths";

//  in upcoming  time we will improve the structure of these routes i.e nesting of routing in common group name....

// we will add sub group name for bread-crumbs
const routes = [
  {
    path: paths.getDashboard(),
    name: "Dashboard",
    breadName: "Dashboard",
    checkName: "dashboard",
    element: Dashboard,
  },
  {
    path: paths.getProfile(),
    name: "Profile",
    breadName: "Profile",
    checkName: "profile",
    element: Profile,
  },
  {
    path: paths.getTransaction(),
    name: "Transaction",
    breadName: "Transaction",
    checkName: "transaction",
    element: Transaction,
  },
  {
    path: paths.getTestPage(),
    name: "Test Page",
    breadName: "Test Page",
    checkName: "test_page",
    element: Test,
  },
  {
    path: paths.getApplyLeave(),
    name: "Apply Leave",
    breadName: "ApplyLeave",
    breadSubName: "Leave",
    checkName: "apply_leave",
    element: ApplyLeave,
  },
  {
    path: paths.getLeaveManagement(),
    name: "User Leave Management",
    breadName: "Leave Management",
    breadSubName: "Leave",
    checkName: "user_leave_management",
    element: UserLeaveManagement,
  },
  {
    path: paths.getLeaveRecords(),
    name: "Leave Records",
    breadName: "Records",
    breadSubName: "Leave",
    checkName: "leave_records",
    element: LeaveRecords,
  },
  {
    path: paths.getAllEmployee(),
    name: "All Employees",
    breadName: "All Employees",
    breadSubName: "Employee",
    checkName: "all_employees",
    element: AllEmployees,
  },
  {
    path: paths.getEditEmployee(),
    name: "Edit Employee",
    breadName: "Edit Employee",
    breadSubName: "Employee",
    checkName: "edit_employee",
    element: EditEmployee,
  },
  {
    path: paths.getAssignFeature(),
    name: "Assign Feature",
    breadName: "Feature",
    checkName: "assign_feature",
    element: FeatureAssign,
  },
  {
    path: paths.getAttendance(),
    name: "Attendance",
    breadName: "Attendance",
    checkName: "attendance",
    element: Attendance,
  },
  {
    path: paths.getTask(),
    name: "Task",
    breadName: "Task",
    checkName: "task",
    element: Task,
  },
  {
    path: paths.getAddTask(),
    name: "Add Task",
    breadName: "Add",
    breadSubName: "Manage Task",
    checkName: "manage_task",
    element: AddTask,
  },


];

export default routes;
