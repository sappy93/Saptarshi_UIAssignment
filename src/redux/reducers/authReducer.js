import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/authActions';

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: null,
  status: 'idle',
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, status: 'loading' };
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload, status: 'succeeded', error: null };
    case LOGIN_FAILURE:
      return { ...state, status: 'failed', error: action.payload };
    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export default authReducer;