import axios from 'axios';

// action types
export const ADD_USER_TO_LIST = "ADD_USER_TO_LIST";
export const REMOVE_USER_FROM_LIST = "REMOVE_USER_FROM_LIST";

// action creators

export const _addUserToList = (userId, listId, newListEntry) => {
    return {
      type: ADD_USER_TO_LIST,
      user: userId,
      list: listId,
      newListEntry: newListEntry
    };
  };

  export const _removeUserFromList = (userId, listId) => {
      return {
          type: REMOVE_USER_FROM_LIST,
          user: userId,
          list: listId,
      };
  };

// thunks

export const createListEntry = (userId, eventId, history) => {
    return async (dispatch) => {
      try {
        const { data: newListEntry } = await axios.post(
          `/api/events/${eventId}/lists/`,
          userId,
          {
        //     headers: {  // ensures they are loggin in to have a valid userId
        //       authorization: localStorage.getItem("token"),
        //     },
          }
        );
        dispatch(_addUserToList(userId, listId, newListEntry));
        history.push(`/events/${eventId}`);
      } catch (error) {
        console.error(error);
      }
    };
  };

// reducer

export default function listReducer(state = {}, action) {
    switch (action.type) {
      case ADD_USER_TO_LIST:
        return action.event;
      default:
        return state;
    }
  }

