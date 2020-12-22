import axios from "axios";
import * as types from "../constants/userConstants";
import {redirect} from '../common/Redirect'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    
    dispatch({
        type: types.USER_LOGIN_SUCCESS,
        payload: data,
    });
    
    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch(redirect('/'))


  } catch (error) {
    dispatch({
        type: types.USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
  }
};


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: types.USER_LOGOUT})
    dispatch(redirect('/auth'))
}