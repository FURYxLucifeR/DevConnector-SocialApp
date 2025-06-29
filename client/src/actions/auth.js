import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utlis/setAuthToken';
// LOAD USER
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
// register user
export const register =
  ({ name, email, password }) =>
  async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      console.log('errs', errors);
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: REGISTER_FAIL
      });
    }
  };
// Login USer
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
// logout/clear profile

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
