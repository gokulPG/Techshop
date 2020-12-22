
import {REDIRECT} from '../common/Redirect.js'

export const utilReducer = (state = {}, action) => {
    switch (action.type) {
      case REDIRECT:
        return { redirectTo: action.payload };
      default:
        return state;
    }
  };
  
