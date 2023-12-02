import {
  AiOutlineDashboard,
  AiOutlineFundProjectionScreen,
} from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { GrTransaction } from "react-icons/gr";
import { GrTest } from "react-icons/gr";
import { FiTrello } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";

import permissionConstants from "./permission";
import paths from "./paths";

const { CREATE, READ, UPDATE, DELETE } = permissionConstants;

const _nav = [
  {
    type: "title",
    name: "Menu",
  },
  {
    type: "side_item",
    name: "Dashboard",
    path: paths.getDashboard(),
    Icon: AiOutlineDashboard,
    checkName: "dashboard",
  },
  {
    type: "side_item",
    name: "Profile",
    path: paths.getProfile(),
    Icon: ImProfile,
    checkName: "profile",
  },
  {
    type: "side_item",
    name: "Transaction",
    path: paths.getTransaction(),
    Icon: GrTransaction,
    checkName: "transaction",
  },
  {
    type: "side_item",
    name: "Task",
    path: paths.getTask(),
    Icon: BiTask,
    checkName: "task",
  },
  {
    type: "side_item",
    name: "Test",
    path: paths.getTestPage(),
    Icon: GrTest,
    checkName: "test_page",
  },
  {
    type: "side_item",
    name: "Feature Assign",
    path: paths.getAssignFeature(),
    Icon: MdOutlineFeaturedPlayList,
    checkName: "assign_feature",
  },
  {
    type: "side_item",
    name: "Attendance",
    path: paths.getAttendance(),
    Icon: MdOutlineFeaturedPlayList,
    checkName: "attendance",
  },
  {
    type: "side_group",
    name: "Manage Task",
    Icon: GoTasklist,
    subItem: [
      {
        name: "Add Task",
        checkName: "manage_task",
        path: paths.getAddTask(),
      },
    ],
  },
  {
    type: "side_group",
    name: "Manage Project",
    Icon: AiOutlineFundProjectionScreen,
    subItem: [
      {
        name: "Add Project",
        checkName: "manage_project",
        path: paths.getAddProject(),
        permissionType: CREATE,
      },
      {
        name: "All Project",
        checkName: "manage_project",
        path: paths.getAllProject(),
        permissionType: READ,
      },
    ],
  },
  {
    type: "side_group",
    name: "Leave",
    Icon: FiTrello,
    subItem: [
      {
        name: "User Leave Management",
        checkName: "user_leave_management",
        path: paths.getLeaveManagement(),
      },
      {
        name: "Apply Leave",
        checkName: "apply_leave",
        path: paths.getApplyLeave(),
      },
      {
        name: "Leave Records",
        checkName: "leave_records",
        path: paths.getLeaveRecords(),
      },
    ],
  },
  {
    type: "side_group",
    name: "Employees",
    Icon: FaRegUser,
    subItem: [
      {
        name: "All Employees",
        checkName: "all_employees",
        path: paths.getAllEmployee(),
      },
      {
        name: "Edit Employee",
        checkName: "edit_employee",
        path: paths.getEditEmployee(),
      },
    ],
  },
];

export default _nav;
