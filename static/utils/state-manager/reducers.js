export const initialState = {
    auth: { isLogged: false, user: null },
    resources: [],
  };

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// action:{ type: string, payload: object}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        auth: { user: action.payload.user, isLoggedIn: true },
      };
    case LOGOUT:
      return { ...state, auth: { isLoggedIn: false } };
    default:
      return state;
  }
};