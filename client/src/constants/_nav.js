import { AiOutlineDashboard } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { GrTransaction } from "react-icons/gr";
import { GrTest } from "react-icons/gr";
import { FiTrello } from "react-icons/fi";

import paths from "./paths";

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
    checkName: "dashboard"
  },
  {
    type: "side_item",
    name: "Profile",
    path: paths.getProfile(),
    Icon: ImProfile,
    checkName: "profile"
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
    name: "Test",
    path: paths.getTestPage(),
    Icon: GrTest,
    checkName: "test_page"
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
        path: paths.getApplyLeave()
      },
      {
        name: "Leave Records",
        checkName: "leave_records",
        path: paths.getLeaveRecords()
      },
    ],
  },
];

export default _nav;
