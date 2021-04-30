import axios from 'axios';

// action type
const GET_ONE_EVENT = 'GET_ONE_EVENT';

// action creator

const getSingleEvent = (event) => {
  return {
    type: GET_ONE_EVENT,
    event,
  };
};

// thunk
export const fetchSingleEvent = (id) => {
  return async (dispatch) => {
    try {
      const { data: singleEvent } = await axios.get(`/api/events/${id}`);
      console.log('inside thunk, singleEvent>>>', singleEvent);
      dispatch(getSingleEvent(singleEvent));
    } catch (error) {
      console.error(error);
    }
  };
};

// reducer
export default function singleEventReducer(state = {}, action) {
  switch (action.type) {
    case GET_ONE_EVENT:
      return action.event;
    default:
      return state;
  }
}
