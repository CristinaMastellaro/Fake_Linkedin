import {
  SAVE_ME_INFO,
  SAVE_OTHER_INFO,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
} from "../actions";

const initialState = {
  myProfile: {
    area: "",
    bio: "",
    createdAt: "",
    email: "",
    image: "",
    name: "",
    surname: "",
    title: "",
    updatedAt: "",
    username: "",
  },
  otherProfile: null,
  loading: false,
  error: null,
};

const saveProfileMe = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SAVE_ME_INFO:
      return {
        ...state,
        loading: false,
        myProfile: action.payload,
        error: null,
      };
    case SAVE_OTHER_INFO:
      return {
        ...state,
        loading: false,
        otherProfile: action.payload,
        error: null,
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default saveProfileMe;
