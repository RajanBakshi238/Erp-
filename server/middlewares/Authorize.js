const AssignedFeature = require("./../models/assignedFeaturesModel");

exports.verifyRoles = (check_name) => {
  return async (req, res, next) => {
    const featureDetail = await AssignedFeature.findOne({ featureKey: check_name });
    console.log(featureDetail, "featureDetials.......")

    if (!featureDetail) {
      // i.e open for all

      return res.status(403).json({
        status: 403,
        error: "No record found for this feature in backend!",
      });
    }

    console.log(req.user, ">>>>>>>>>>>USER ON REQUEST OBJECT");
    if (!req?.user) {
      return res.status(401).json({
        status: "fail",
        error: "User not login!",
      });
    }

    // const userRoles = Object.values(req.user.roles)

    // const result = userRoles.map(role => allowedRoles.includes(role)).find(val => val === true);
    // console.log(result, '>>>>>>>>>>>>ROLESSSSS')
    if (!featureDetail.allowedTo.includes(req.user.role)) {
      return res.status(403).json({
        status: 403,
        error: "You don't have permission to perform this action",
      });
    }
    next();
  };
};

exports.verifyPerissionRoles = (check_name, permissionType) => {
  return async (req, res, next) => {
    const featureDetail = await AssignedFeature.findOne({ featureKey: check_name });
    console.log(featureDetail, "featureDetials.......")

    if (!featureDetail) {
      // i.e open for all

      return res.status(403).json({
        status: 403,
        error: "No record found for this feature in backend!",
      });
    }

    console.log(req.user, ">>>>>>>>>>>USER ON REQUEST OBJECT");
    if (!req?.user) {
      return res.status(401).json({
        status: "fail",
        error: "User not login!",
      });
    }

    if (!req.user.permissions?.[check_name]?.includes(permissionType)) {
      return res.status(403).json({
        status: 403,
        error: "You don't have permission to perform this action",
      });
    }
    next();
  };
};

// exports.verifyRoles = (...allowedRoles) => {
//     return async (req, res, next) => {
//         console.log(req.user, '>>>>>>>>>>>USER ON REQUEST OBJECT')
//         if(!req?.user){
//             return res.status(401).json({
//                 status: "fail",
//                 error: "User not login!"
//             })
//         }

//         // const userRoles = Object.values(req.user.roles)

//         // const result = userRoles.map(role => allowedRoles.includes(role)).find(val => val === true);
//         // console.log(result, '>>>>>>>>>>>>ROLESSSSS')
//         if(!allowedRoles.includes(req.user.role)){
//             return res.status(403).json({
//                 status: 403,
//                 error: "You don't have permission to perform this action"
//             })
//         }
//         next();
//     }
// }

// exports.verifyRoles = (...allowedRoles) => {
//     return (req, res, next) => {
//         console.log(req.user, '>>>>>>>>>>>USER ON REQUEST OBJECT')
//         if(!req?.user){
//             return res.status(401).json({
//                 status: "fail",
//                 error: "User not login!"
//             })
//         }
//         // console.log(req.user.roles, '>>>>>>>>>>>>>>>>>>ROLES OBJECT');
//         const userRoles = Object.values(req.user.roles)
//         // console.log(userRoles, 'User roles from roles side')
//         const result = userRoles.map(role => allowedRoles.includes(role)).find(val => val === true);
//         console.log(result, '>>>>>>>>>>>>ROLESSSSS')
//         if(!result){
//             return res.status(403).json({
//                 status: "fail",
//                 error: "You don't have permission to perform this action"
//             })
//         }
//         next()
//     }
// }
