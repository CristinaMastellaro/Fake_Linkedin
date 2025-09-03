export const SAVE_ME_INFO = "SAVE_ME_INFO";
export const SAVE_OTHER_INFO = "SAVE_OTHER_INFO";

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
      const TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1NTJlZGQyOWE0OTAwMTUxZjIwODYiLCJpYXQiOjE3NTY3MTM3MDksImV4cCI6MTc1NzkyMzMwOX0.2QqwabOIJ4yHBhR_8VkIe6oenP3ri7nHieLQL9H5Tmw";
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
      const TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1NTJlZGQyOWE0OTAwMTUxZjIwODYiLCJpYXQiOjE3NTY3MTM3MDksImV4cCI6MTc1NzkyMzMwOX0.2QqwabOIJ4yHBhR_8VkIe6oenP3ri7nHieLQL9H5Tmw";
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
