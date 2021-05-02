import axios from 'axios';

// action types
export const SET_IMAGE = 'SET_IMAGE';
export const SET_PDF = 'SET_PDF';

// action creators
const _updateHeadshot = (imageUrl) => {
    return {
      type: SET_IMAGE,
      imageUrl,
    };
  };

  const _updateResume = (pdfUrl) => {
    return {
      type: SET_PDF,
      pdfUrl,
    };
  };

//   add following thunks: setProfileImage, setProfilePdf --> **needs to go to a singleDetailReducer??
  export const setProfileImage = (userId) => {
     return async (dispatch) => {
        try {
            // need to strip image endpoint off data sent back by this route
            const { data: imageUrl } = await axios.put(`/api/users/${userId}/edit/image-upload`);
            dispatch(_updateHeadshot(imageUrl));
        } catch (er) {
            next (err)
        }
     }
 };

 export const setProfilePdf = (userId) => {
    return async (dispatch) => {
       try {
           // need to strip image endpoint off data sent back by this route
           const { data: pdfUrl } = await axios.put(`/api/users/${userId}/edit/pdf-upload`);
           dispatch(_updateResume(pdfUrl));
       } catch (er) {
           next (err)
       }
    }
};

// singleDetailReducer
export default function singleDetailReducer(state = {...state.details}, action) {
    switch (action.type) {
      case SET_IMAGE:
        return {...state, headshot: action.imageUrl};
      case SET_PDF:
        return {...state, resume: action.pdfUrl};
      default:
        return state;
    }
  };

