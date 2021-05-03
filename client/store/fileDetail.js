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

  export const setProfileImage = (userId) => {
     return async (dispatch) => {
        try {
            // need to strip image endpoint off data sent back by this route
            const { data: imagePath } = await axios.post(`/api/image-upload`);
            dispatch(_updateHeadshot(imagePath));
        } catch (er) {
            next (err)
        }
     }
 };

 export const setProfilePdf = (userId) => {
    return async (dispatch) => {
       try {
           // need to strip pdf endpoint off data sent back by this route
           const { data: pdfPath } = await axios.post(`/api/pdf-upload`);
           dispatch(_updateResume(pdfPath));
       } catch (er) {
           next (err)
       }
    }
};


// reducer
export default function singleDetailReducer(state = {}, action) {
    switch (action.type) {
      case SET_IMAGE:
        return {...state, headshot: action.imagePath};
      case SET_PDF:
        return {...state, resume: action.pdfPath};
      default:
        return state;
    }
  };

