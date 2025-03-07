const INITIAL_STATES = {
  user: null,
  SAVE_POST: [],
  Followers: [],
  loader: false,
  socket: null,
  fanclub: [],
};

export default function (state = INITIAL_STATES, action) {
  switch (action.type) {
    case "SAVE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "USER_PROFILE":
      return {
        ...state,
        user: action.payload,
      };
    case "SAVE_POST":
      return {
        ...state,
        SAVE_POST: [...state.SAVE_POST, action.payload],
      };
    case "Followers":
      return {
        ...state,
        Followers: action.payload,
      };
    case "LOGOUT":
      return {
        // ...state,
        user: null,
        loader: false,
      };
    case "LOADER_START":
      return {
        ...state,
        loader: true,
      };
    case "LOADER_STOP":
      return {
        ...state,
        loader: false,
      };
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.payload,
      };
    case "FANCLUB":
    return {
      ...state,
      fanclub: action.payload,
    };  
    default:
      return state;
  }
}
