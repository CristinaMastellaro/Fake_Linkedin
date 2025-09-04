import {
  SAVE_ME_INFO,
  SAVE_OTHER_INFO,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  FETCH_EXPERIENCES_REQUEST,
  FETCH_EXPERIENCES_SUCCESS,
  FETCH_EXPERIENCES_FAILURE,
  CREATE_EXPERIENCE_REQUEST,
  CREATE_EXPERIENCE_SUCCESS,
  CREATE_EXPERIENCE_FAILURE,
  UPDATE_EXPERIENCE_REQUEST,
  UPDATE_EXPERIENCE_SUCCESS,
  UPDATE_EXPERIENCE_FAILURE,
  DELETE_EXPERIENCE_REQUEST,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_FAILURE,
  UPLOAD_EXPERIENCE_IMAGE_REQUEST,
  UPLOAD_EXPERIENCE_IMAGE_SUCCESS,
  UPLOAD_EXPERIENCE_IMAGE_FAILURE,
  UPLOAD_PROFILE_IMAGE_REQUEST,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPLOAD_POST_IMAGE_REQUEST,
  UPLOAD_POST_IMAGE_SUCCESS,
  UPLOAD_POST_IMAGE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  DELETE_POST,
  MODIFY_POST,
} from '../actions'
const initialState = {
  myProfile: {
    area: '',
    bio: '',
    createdAt: '',
    email: '',
    image: '',
    name: '',
    surname: '',
    title: '',
    updatedAt: '',
    username: '',
  },
  otherProfile: null,
  experiences: [],
  experiencesLoading: false,
  experiencesError: null,
  posts: [],
  postsLoading: false,
  postsError: null,
  loading: false,
  error: null,
}
const saveProfileMe = (state = initialState, action) => {
  switch (action.type) {
    // PROFILE ACTIONS
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      }
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case SAVE_ME_INFO:
      return {
        ...state,
        loading: false,
        myProfile: action.payload,
        error: null,
      }
    case SAVE_OTHER_INFO:
      return {
        ...state,
        loading: false,
        otherProfile: action.payload,
        error: null,
      }
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        myProfile: action.payload,
        error: null,
      }
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case UPLOAD_PROFILE_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case UPLOAD_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        myProfile: {
          ...state.myProfile,
          image: action.payload,
        },
        error: null,
      }
    case UPLOAD_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    // EXPERIENCE ACTIONS
    case FETCH_EXPERIENCES_REQUEST:
      return {
        ...state,
        experiencesLoading: true,
        experiencesError: null,
      }
    case FETCH_EXPERIENCES_SUCCESS:
      return {
        ...state,
        experiencesLoading: false,
        experiences: action.payload,
        experiencesError: null,
      }
    case FETCH_EXPERIENCES_FAILURE:
      return {
        ...state,
        experiencesLoading: false,
        experiencesError: action.payload,
      }
    case CREATE_EXPERIENCE_REQUEST:
      return {
        ...state,
        experiencesLoading: true,
        experiencesError: null,
      }
    case CREATE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiencesLoading: false,
        experiences: [...state.experiences, action.payload],
        experiencesError: null,
      }
    case CREATE_EXPERIENCE_FAILURE:
      return {
        ...state,
        experiencesLoading: false,
        experiencesError: action.payload,
      }
    case UPDATE_EXPERIENCE_REQUEST:
      return {
        ...state,
        experiencesLoading: true,
        experiencesError: null,
      }
    case UPDATE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiencesLoading: false,
        experiences: state.experiences.map((exp) =>
          exp._id === action.payload._id ? action.payload : exp
        ),
        experiencesError: null,
      }
    case UPDATE_EXPERIENCE_FAILURE:
      return {
        ...state,
        experiencesLoading: false,
        experiencesError: action.payload,
      }
    case DELETE_EXPERIENCE_REQUEST:
      return {
        ...state,
        experiencesLoading: true,
        experiencesError: null,
      }
    case DELETE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiencesLoading: false,
        experiences: state.experiences.filter(
          (exp) => exp._id !== action.payload
        ),
        experiencesError: null,
      }
    case DELETE_EXPERIENCE_FAILURE:
      return {
        ...state,
        experiencesLoading: false,
        experiencesError: action.payload,
      }
    case UPLOAD_EXPERIENCE_IMAGE_REQUEST:
      return {
        ...state,
        experiencesLoading: true,
        experiencesError: null,
      }
    case UPLOAD_EXPERIENCE_IMAGE_SUCCESS:
      return {
        ...state,
        experiencesLoading: false,
        experiences: state.experiences.map((exp) =>
          exp._id === action.payload.experienceId
            ? {
                ...exp,
                image: action.payload.imageUrl,
              }
            : exp
        ),
        experiencesError: null,
      }
    case UPLOAD_EXPERIENCE_IMAGE_FAILURE:
      return {
        ...state,
        experiencesLoading: false,
        experiencesError: action.payload,
      }
    // POST ACTIONS
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        postsLoading: true,
        postsError: null,
      }
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        postsLoading: false,
        posts: action.payload,
        postsError: null,
      }
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        postsLoading: false,
        postsError: action.payload,
      }
    case CREATE_POST_REQUEST:
      return {
        ...state,
        postsLoading: true,
        postsError: null,
      }
    case CREATE_POST_SUCCESS:
      console.log('action.payload', action.payload)
      return {
        ...state,
        postsLoading: false,
        posts: [action.payload, ...state.posts],
        postsError: null,
      }
    case CREATE_POST_FAILURE:
      return {
        ...state,
        postsLoading: false,
        postsError: action.payload,
      }
    case UPLOAD_POST_IMAGE_REQUEST:
      return {
        ...state,
        postsLoading: true,
        postsError: null,
      }
    case UPLOAD_POST_IMAGE_SUCCESS:
      return {
        ...state,
        postsLoading: false,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                image: action.payload.imageUrl,
              }
            : post
        ),
        postsError: null,
      }
    case UPLOAD_POST_IMAGE_FAILURE:
      return {
        ...state,
        postsLoading: false,
        postsError: action.payload,
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }
    case MODIFY_POST:
      return {
        ...state,
      }
    default:
      return state
  }
}
export default saveProfileMe
