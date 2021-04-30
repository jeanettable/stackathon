import axios from "axios";

// action types:
export const SET_EVENTS = "SET_EVENTS";
export const CREATE_EVENT = "CREATE_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

// action creators:
const setEvents = (events) => {
  return {
    type: SET_EVENTS,
    events,
  };
};

export const _createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    event,
  };
};

export const _updateEvent = (event) => {
    return {
      type: UPDATE_EVENT,
      event,
    };
  };

export const _deleteEvent = (event) => {
    return {
      type: DELETE_EVENT,
      event,
    };
  };


// thunks:
export const fetchEvents = () => {
  return async (dispatch) => {
    try {
      const { data: events } = await axios.get("/api/events");
      dispatch(setEvents(events));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createEvent = (event, history) => {
  return async (dispatch) => {
    try {
      const { data: createdEvent } = await axios.post(
        "/api/production/events",
        product,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      dispatch(_createEvent(createdEvent));
      history.push("/events");
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateEvent = (event, history, id) => {
    return async (dispatch) => {
      try {
        const { data: updatedEvent } = await axios.put(`/api/production/events/${id}`, event, {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        dispatch(_updateEvent(updatedEvent));
        history.push(`/production/events/${id}`);
      } catch (error) {
        console.error(error);
      }
    };
  };

  export const deleteEvent = (id, history) => {
    return async (dispatch) => {
      try {
        await axios.delete(`/api/production/events/${id}`, {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        dispatch(_deleteEvent(id));
        history.push('/events');
      } catch (error) {
        console.error(error);
      }
    };
  }; 

// events reducer
export default function eventsReducer(state = [], action) {
    switch (action.type) {
      case SET_EVENTS:
        return action.events;
      case CREATE_EVENT:
        return [...state, action.event];
      case UPDATE_EVENT:
        return state.map((event) => (event.id === action.event.id ? action.event : event));
      case DELETE_EVENT:
        return state.filter((event) => event.id !== action.event);
      default:
        return state;
    }
  }
  