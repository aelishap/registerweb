import { LOGIN, LOGOUT, REGISTER } from "../actionType";

const initialState = {
  isAuthenticated: false,
  user: null,
  registeredUsers: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
      case REGISTER:
      return {
        ...state,
        registeredUsers: [...state.registeredUsers, action.payload],
      };
    default:
      return state;
  }
};

export default authReducer;