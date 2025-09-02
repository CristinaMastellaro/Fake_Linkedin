import { SAVE_ME_INFO } from "../actions";

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
};

const saveProfileMe = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ME_INFO:
      return {
        ...state,
        myProfile: action.payload,
      };
    default:
      return state;
  }
};

export default saveProfileMe;
