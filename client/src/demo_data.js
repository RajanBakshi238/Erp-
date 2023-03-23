// export const userRoutesData = [
//     {
//         name: 'Dashboard',
//         checkName: 'dashboard',
//         allowedTo: ['user']
//     },
//     {
//         name: 'Profile',
//         checkName: 'profile',
//         allowedTo: ['user']
//     },
//     {
//         name: 'Transaction',
//         checkName: 'transaction',
//         allowedTo: ['user']
//     },
//     {
//         name: 'Test',
//         checkName: 'test_page',
//         allowedTo: ['user']
//     },
// ]
export const userRoutesData = {
  dashboard: {
    allowedTo: ["user", "hr", "admin"],
  },
  profile: {
    allowedTo: ["user"],
  },
  transaction: {
    allowedTo: ["user"],
  },
  test_page: {
    allowedTo: ["user"],
  },
  apply_leave: {
    allowedTo: ["user"],
  },
  user_leave_management: {
    allowedTo: ["user"],
  },
  leave_records: {
    allowedTo: ["user"],
  },
  all_employees: {
    allowedTo: ["user"],
  },
  edit_employee: {
    allowedTo: ["user"],
  },
};
