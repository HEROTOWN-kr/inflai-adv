import { createContext } from 'react';

function noop() {}

const AuthContext = createContext({
  token: null,
  login: noop,
  logout: noop,
  userDataUpdate: noop,
  userName: null,
  userPhoto: null,
  socialType: null,
  isAuthenticated: false,
  isLoading: false,
  setLoading: noop
});

export default AuthContext;
