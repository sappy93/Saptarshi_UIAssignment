export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      // Simulating an API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
            // This should be dynamically manageable in future with actual login API with token.
          if (credentials.username === 'C001' && credentials.password === 'password1') {
            resolve({ username: 'C001' });
            dispatch({ type: LOGIN_SUCCESS, payload: { username: 'C001' } });
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('customerToken', 'C001');
          }else if (credentials.username === 'C002' && credentials.password === 'password2') {
                resolve({ username: 'C002' });
                dispatch({ type: LOGIN_SUCCESS, payload: { username: 'C002' } });
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('customerToken', 'C002');
          } else {
            reject('Invalid credentials');
          }
        }, 1000);
      });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error });
    }
  };
};

export const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('customerToken');
  return { type: LOGOUT };
};