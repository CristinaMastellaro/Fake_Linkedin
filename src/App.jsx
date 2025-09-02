import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./features/profile/profileSlice";
import "./App.css";
import Navbar from "./components/Navbar";
import ProfileHeader from "./components/ProfileHeader";
import ProfileActions from "./components/ProfileActions";
import ProfileAbout from "./components/ProfileAbout";
import ProfileAnalytics from "./components/ProfileAnalytics";
import ProfileRecommendations from "./components/ProfileRecommendations";
import ProfileExperience from "./components/ProfileExperience";
import ProfileEducation from "./components/ProfileEducation";
import ProfileSkills from "./components/ProfileSkills";
import ProfileInterests from "./components/ProfileInterests";
import ProfileSidebar from "./components/ProfileSidebar";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profileData);
  const status = useSelector((state) => state.profile.status);
  const error = useSelector((state) => state.profile.error);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI2NDlkMTE2MjdjNjAwMTVmOGM1NzAiLCJpYXQiOjE3NTY3NzY5MTMsImV4cCI6MTc1Nzk4NjUxM30.HkA9rBBN9XGrDoIjTRpuOWYxOdKUBZFfJOq0kPpR8k4";

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile(token));
    }
  }, [dispatch, token]);

  if (status === "loading") {
    return <div>Loading profile...</div>;
  }

  if (status === "failed") {
    return <div>Error loading profile: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="App profile-page">
        <div className="profile-main">
          <ProfileHeader profile={profile} />
          <ProfileActions />
          <ProfileAbout bio={profile?.bio} />
          <ProfileRecommendations />
          <ProfileAnalytics />
          <ProfileExperience experiences={profile?.experiences} />
          <ProfileEducation education={profile?.education} />
          <ProfileSkills skills={profile?.skills} />
          <ProfileInterests interests={profile?.interests} />
        </div>
        <ProfileSidebar />
        <Footer />
      </div>
    </>
  );
}

export default App;
