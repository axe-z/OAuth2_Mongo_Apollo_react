//destructurer action
export default function monReducer(state, { type, payload }) {
  switch (
    type //au lieu de action.type
  ) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: payload //au lieu de action.payload
      };
    case "IS_LOGGED_IN":
      return {
        ...state,
        isAuth: payload //au lieu de action.payload
      };
    default:
      return state;
  }
}
