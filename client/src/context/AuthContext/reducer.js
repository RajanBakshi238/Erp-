export const authReducer = (state, action) => {
    console.log(action, ">>>>>>>action....")
  
    switch (action.type) {
    case "AUTH":
      return {
        ...state,
        auth: action.auth,
      };

    case "FEATURE":
      return {
        ...state,
        assignedFeatures: action.assignedFeatures,
      };

    default:
      return state;
  }
};
