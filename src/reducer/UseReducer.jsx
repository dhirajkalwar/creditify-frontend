export  const initialState = {
    user: null,
    userType: null,
  };
export const reducer = (state,action) => {
    switch (action.type) {
        case "USER_LOGIN":
          return {
            ...state,
            user: action.payload.user,
            userType: action.payload.userType,
          };
    
        case "USER_LOGOUT":
          return {
            ...state,
            user: null,
            userType: null,
          };
    
        default:
          return state;
      }
}
export default reducer;