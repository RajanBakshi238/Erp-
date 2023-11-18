const {
  CREATE,
  READ,
  UPDATE,
  DELETE,
} = require("../constants/permissionsConstants");

const permissions = {
  user_leave_management: [CREATE, READ, UPDATE, DELETE],
  leave_records: [CREATE, READ, UPDATE, DELETE],
  all_employees: [CREATE, READ, UPDATE, DELETE],
  edit_employee: [CREATE, READ, UPDATE, DELETE],
  assign_feature: [CREATE, READ, UPDATE, DELETE],
  attendance: [CREATE, READ, UPDATE, DELETE],
  profile: [CREATE, READ, UPDATE, DELETE],
  dashboard: [CREATE, READ, UPDATE, DELETE],
  transaction: [CREATE, READ, UPDATE, DELETE],
  test_page: [CREATE, READ, UPDATE, DELETE],
  apply_leave: [CREATE, READ, UPDATE, DELETE],
  test_1: [CREATE, READ, UPDATE, DELETE],
  test_2: [CREATE, READ, UPDATE, DELETE],
  task: [CREATE, READ, UPDATE, DELETE],
  manage_task: [CREATE, READ, UPDATE, DELETE],
  test_page: [CREATE, READ, UPDATE, DELETE],
  manage_project: [CREATE, READ, UPDATE, DELETE],
};

module.exports = {
    permissions
}


