export const SAVE_ME_INFO = "SAVE_ME_INFO";
export const SAVE_OTHER_INFO = "SAVE_OTHER_INFO";
export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1YTFkOTE2MjdjNjAwMTVmOGM1NmMiLCJpYXQiOjE3NTY3MzM5MTMsImV4cCI6MTc1Nzk0MzUxM30.SOLseepU4Ysb0KnFQYR3yWP1jikhGc89-HCynCKAhuY";

export const saveMeInfoAction = (data) => {
  return {
    type: SAVE_ME_INFO,
    payload: data,
  };
};

export const saveOtherInfoAction = (data) => {
  return {
    type: SAVE_OTHER_INFO,
    payload: data,
  };
};

export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";

export const fetchProfileRequest = () => ({
  type: FETCH_PROFILE_REQUEST,
});

export const fetchProfileSuccess = (profile) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: profile,
});

export const fetchProfileFailure = (error) => ({
  type: FETCH_PROFILE_FAILURE,
  payload: error,
});

export const fetchProfile = () => {
  return async (dispatch) => {
    dispatch(fetchProfileRequest());
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/me",
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const profile = await response.json();
      dispatch(fetchProfileSuccess(profile));
      dispatch(saveMeInfoAction(profile));
    } catch (error) {
      dispatch(fetchProfileFailure(error.message));
    }
  };
};

// Nuova action per fetchare profili altrui
export const fetchOtherProfile = (profileId) => {
  return async (dispatch) => {
    dispatch(fetchProfileRequest());
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${profileId}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const profile = await response.json();
      dispatch(fetchProfileSuccess(profile));
      dispatch(saveOtherInfoAction(profile));
    } catch (error) {
      dispatch(fetchProfileFailure(error.message));
    }
  };
};

export const FETCH_EXPERIENCES_REQUEST = "FETCH_EXPERIENCES_REQUEST";
export const FETCH_EXPERIENCES_SUCCESS = "FETCH_EXPERIENCES_SUCCESS";
export const FETCH_EXPERIENCES_FAILURE = "FETCH_EXPERIENCES_FAILURE";

export const CREATE_EXPERIENCE_REQUEST = "CREATE_EXPERIENCE_REQUEST";
export const CREATE_EXPERIENCE_SUCCESS = "CREATE_EXPERIENCE_SUCCESS";
export const CREATE_EXPERIENCE_FAILURE = "CREATE_EXPERIENCE_FAILURE";

export const UPDATE_EXPERIENCE_REQUEST = "UPDATE_EXPERIENCE_REQUEST";
export const UPDATE_EXPERIENCE_SUCCESS = "UPDATE_EXPERIENCE_SUCCESS";
export const UPDATE_EXPERIENCE_FAILURE = "UPDATE_EXPERIENCE_FAILURE";

export const DELETE_EXPERIENCE_REQUEST = "DELETE_EXPERIENCE_REQUEST";
export const DELETE_EXPERIENCE_SUCCESS = "DELETE_EXPERIENCE_SUCCESS";
export const DELETE_EXPERIENCE_FAILURE = "DELETE_EXPERIENCE_FAILURE";

export const UPLOAD_EXPERIENCE_IMAGE_REQUEST =
  "UPLOAD_EXPERIENCE_IMAGE_REQUEST";
export const UPLOAD_EXPERIENCE_IMAGE_SUCCESS =
  "UPLOAD_EXPERIENCE_IMAGE_SUCCESS";
export const UPLOAD_EXPERIENCE_IMAGE_FAILURE =
  "UPLOAD_EXPERIENCE_IMAGE_FAILURE";

export const fetchExperiencesRequest = () => ({
  type: FETCH_EXPERIENCES_REQUEST,
});

export const fetchExperiencesSuccess = (experiences) => ({
  type: FETCH_EXPERIENCES_SUCCESS,
  payload: experiences,
});

export const fetchExperiencesFailure = (error) => ({
  type: FETCH_EXPERIENCES_FAILURE,
  payload: error,
});

export const createExperienceRequest = () => ({
  type: CREATE_EXPERIENCE_REQUEST,
});

export const createExperienceSuccess = (experience) => ({
  type: CREATE_EXPERIENCE_SUCCESS,
  payload: experience,
});

export const createExperienceFailure = (error) => ({
  type: CREATE_EXPERIENCE_FAILURE,
  payload: error,
});

export const updateExperienceRequest = () => ({
  type: UPDATE_EXPERIENCE_REQUEST,
});

export const updateExperienceSuccess = (experience) => ({
  type: UPDATE_EXPERIENCE_SUCCESS,
  payload: experience,
});

export const updateExperienceFailure = (error) => ({
  type: UPDATE_EXPERIENCE_FAILURE,
  payload: error,
});

export const deleteExperienceRequest = () => ({
  type: DELETE_EXPERIENCE_REQUEST,
});

export const deleteExperienceSuccess = (experienceId) => ({
  type: DELETE_EXPERIENCE_SUCCESS,
  payload: experienceId,
});

export const deleteExperienceFailure = (error) => ({
  type: DELETE_EXPERIENCE_FAILURE,
  payload: error,
});

export const uploadExperienceImageRequest = () => ({
  type: UPLOAD_EXPERIENCE_IMAGE_REQUEST,
});

export const uploadExperienceImageSuccess = (experienceId, imageUrl) => ({
  type: UPLOAD_EXPERIENCE_IMAGE_SUCCESS,
  payload: { experienceId, imageUrl },
});

export const uploadExperienceImageFailure = (error) => ({
  type: UPLOAD_EXPERIENCE_IMAGE_FAILURE,
  payload: error,
});

// Thunk actions for experiences
export const fetchExperiences = (userId) => {
  return async (dispatch) => {
    dispatch(fetchExperiencesRequest());
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch experiences");
      }
      const experiences = await response.json();
      dispatch(fetchExperiencesSuccess(experiences));
    } catch (error) {
      dispatch(fetchExperiencesFailure(error.message));
    }
  };
};

export const createExperience = (userId, experienceData) => {
  return async (dispatch) => {
    dispatch(createExperienceRequest());
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(experienceData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create experience");
      }
      const newExperience = await response.json();
      dispatch(createExperienceSuccess(newExperience));
    } catch (error) {
      dispatch(createExperienceFailure(error.message));
    }
  };
};

export const updateExperience = (userId, expId, experienceData) => {
  return async (dispatch) => {
    dispatch(updateExperienceRequest());
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(experienceData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update experience");
      }
      const updatedExperience = await response.json();
      dispatch(updateExperienceSuccess(updatedExperience));
    } catch (error) {
      dispatch(updateExperienceFailure(error.message));
    }
  };
};

export const deleteExperience = (userId, expId) => {
  return async (dispatch) => {
    dispatch(deleteExperienceRequest());
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete experience");
      }
      dispatch(deleteExperienceSuccess(expId));
    } catch (error) {
      dispatch(deleteExperienceFailure(error.message));
    }
  };
};

export const uploadExperienceImage = (userId, expId, imageFile) => {
  return async (dispatch) => {
    dispatch(uploadExperienceImageRequest());
    try {
      const formData = new FormData();
      formData.append("experience", imageFile);

      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}/picture`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upload experience image");
      }
      const result = await response.json();
      dispatch(uploadExperienceImageSuccess(expId, result.image));
    } catch (error) {
      dispatch(uploadExperienceImageFailure(error.message));
    }
  };
};

export const UPLOAD_PROFILE_IMAGE_REQUEST = "UPLOAD_PROFILE_IMAGE_REQUEST";
export const UPLOAD_PROFILE_IMAGE_SUCCESS = "UPLOAD_PROFILE_IMAGE_SUCCESS";
export const UPLOAD_PROFILE_IMAGE_FAILURE = "UPLOAD_PROFILE_IMAGE_FAILURE";

export const uploadProfileImageRequest = () => ({
  type: UPLOAD_PROFILE_IMAGE_REQUEST,
});

export const uploadProfileImageSuccess = (imageUrl) => ({
  type: UPLOAD_PROFILE_IMAGE_SUCCESS,
  payload: imageUrl,
});

export const uploadProfileImageFailure = (error) => ({
  type: UPLOAD_PROFILE_IMAGE_FAILURE,
  payload: error,
});

export const uploadProfileImage = (userId, imageFile) => {
  return async (dispatch) => {
    dispatch(uploadProfileImageRequest());
    try {
      const formData = new FormData();
      formData.append("profile", imageFile);

      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/picture`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upload profile image");
      }
      const result = await response.json();
      dispatch(uploadProfileImageSuccess(result.image));
    } catch (error) {
      dispatch(uploadProfileImageFailure(error.message));
    }
  };
};

export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

export const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

export const UPLOAD_POST_IMAGE_REQUEST = "UPLOAD_POST_IMAGE_REQUEST";
export const UPLOAD_POST_IMAGE_SUCCESS = "UPLOAD_POST_IMAGE_SUCCESS";
export const UPLOAD_POST_IMAGE_FAILURE = "UPLOAD_POST_IMAGE_FAILURE";

export const DELETE_POST = "DELETE_POST";
export const MODIFY_POST = "MODIFY_POST";
// export const GET_ONE_POST = "GET_ONE_POST";

export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

export const createPostRequest = () => ({
  type: CREATE_POST_REQUEST,
});

export const createPostSuccess = (post) => ({
  type: CREATE_POST_SUCCESS,
  payload: post,
});

export const createPostFailure = (error) => ({
  type: CREATE_POST_FAILURE,
  payload: error,
});

export const uploadPostImageRequest = () => ({
  type: UPLOAD_POST_IMAGE_REQUEST,
});

export const uploadPostImageSuccess = (postId, imageUrl) => ({
  type: UPLOAD_POST_IMAGE_SUCCESS,
  payload: { postId, imageUrl },
});

export const uploadPostImageFailure = (error) => ({
  type: UPLOAD_POST_IMAGE_FAILURE,
  payload: error,
});

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/posts/",
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const posts = await response.json();
      posts.reverse();
      dispatch(fetchPostsSuccess(posts));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };
};

export const createPost = (postData, imageFile) => {
  return async (dispatch) => {
    dispatch(createPostRequest());
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/posts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      const newPost = await response.json();
      dispatch(createPostSuccess(newPost));
      if (imageFile && newPost && newPost._id) {
        await dispatch(uploadPostImage(newPost._id, imageFile));
      }
    } catch (error) {
      dispatch(createPostFailure(error.message));
    }
  };
};
export const uploadPostImage = (postId, imageFile) => {
  return async (dispatch) => {
    dispatch(uploadPostImageRequest());
    try {
      const formData = new FormData();
      formData.append("post", imageFile);

      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/posts/${postId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upload post image");
      }
      const result = await response.json();
      dispatch(uploadPostImageSuccess(postId, result.image));
    } catch (error) {
      dispatch(uploadPostImageFailure(error.message));
    }
  };
};

export const deletePostAction = (id, sentAlert) => {
  const bearer = TOKEN;
  console.log("id", id);
  fetch("https://striveschool-api.herokuapp.com/api/posts/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  })
    .then((res) => {
      if (res.ok && sentAlert) {
        alert("Post cancellato!");
      } else {
        throw new Error("Non siamo riusciti a cancellare il post");
      }
    })
    .catch((err) => console.log("Errore!", err));

  return {
    type: DELETE_POST,
    payload: id,
  };
};

export const modifyPostAction = (id, formData, image) => {
  console.log("formData", formData);
  console.log("image", image);
  return async (dispatch) => {
    // Modifica il testo del post
    fetch(`https://striveschool-api.herokuapp.com/api/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log("Sei entrato nel modificatore!");
        console.log("res", res);
        if (!res.ok) {
          throw new Error("Non siamo riusciti a modificare il testo del post");
        }
      })
      .catch((err) => console.log("Errore!", err));

    if (image) {
      await dispatch(uploadPostImage(id, image));
    } else {
      console.log("Non abbiamo modificato l'immagine");
    }
    dispatch(fetchPosts());
    return {
      type: MODIFY_POST,
    };
  };
};

// export const getOnePost = (id) => {
//   fetch(`https://striveschool-api.herokuapp.com/api/posts/${id}`, {
//     headers: { Authorization: `Bearer ${TOKEN}` },
//   })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error("Non siamo riusciti a caricare il post");
//       }
//     })
//     .then((data) => {
//       return {
//         type: GET_ONE_POST,
//         payload: data,
//       };
//     })
//     .catch((err) => console.log("Errore!", err));
// };

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

export const updateProfileRequest = () => ({
  type: UPDATE_PROFILE_REQUEST,
});

export const updateProfileSuccess = (profile) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: profile,
});

export const updateProfileFailure = (error) => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: error,
});

export const updateProfile = (profileData) => {
  return async (dispatch) => {
    dispatch(updateProfileRequest());
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(profileData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedProfile = await response.json();
      dispatch(updateProfileSuccess(updatedProfile));

      dispatch(fetchProfile());
    } catch (error) {
      dispatch(updateProfileFailure(error.message));
    }
  };
};

export const BACK_TO_HOME = "BACK_TO_HOME";
export const SET_PAGE = "SET_PAGE";

export const backToHomeAction = () => ({
  type: BACK_TO_HOME,
  payload: 1,
});

export const setPageAction = (page) => {
  return {
    type: SET_PAGE,
    payload: page,
  };
};
