const updateProjectReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_UPDATE_PROJECT":
      return {
        ...state,
        updateProject: action.updateProject,
      };
    case "SET_UPDATE_PROJECT_EMPTY":
      return {
        ...state,
        updateProject: null,
      };

    default:
      return state;
  }
};

export default updateProjectReducer;
