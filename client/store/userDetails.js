import axios from 'axios';

// action types
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS';

// action creators
const setUserDetails = (details) => {
    return {
      type: SET_USER_DETAILS,
      details,
    };
  };

  const _updateUserDetails = (details) => {
    return {
      type: UPDATE_USER_DETAILS,
      details,
    };
  }; 

  // thunks
  export const getUserDetails = (userId) => {
    return async (dispatch) => {
      try {
        const { data: details } = await axios.get(`/api/users/${userId}`);
        dispatch(setUserDetails(details));
      } catch (error) {
        console.error(error);
      }
    };
  };

  export const updateUserDetails = (details, history) => {
    return async (dispatch) => {
      try {
        const userId = req.params.userId;
        const { data: updatedDetails } = await axios.put(`/api/users/${userId}/edit`, details, {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        dispatch(_updateUserDetails(updatedDetails));
        history.push(`/api/users/${userId}`);
      } catch (error) {
        console.error(error);
      }
    };
  };

  // reducer
  export default function detailsReducer(state = {}, action) {
    switch (action.type) {
      case SET_USER_DETAILS:
        return action.details;
      case UPDATE_USER_DETAILS:
        return {...state, details: action.details};
      default:
        return state;
    }
  };
