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
    case "SIGNOUT_USER":
      return {
        ...state,
        currentUser: null,
        isAuth: false
      };
    case "CREER_DRAFT":
      return {
        ...state,
        draft: {
          longitude: 0,
          latitude: 0
        }
      };
    case "UPDATE_DRAFT_LOCATION":
      return {
        ...state,
        draft: {
          longitude: payload.longitude,
          latitude: payload.latitude
        }
      };
    case "DELETE_DRAFT":
      return {
        ...state,
        draft: null
      };
    default:
      return state;
  }
}
