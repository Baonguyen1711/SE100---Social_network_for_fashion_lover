import React from "react";
import ProfileContainer from "./ProfileContainer";
import style from "./css/MainProfileForm.module.css";
const MainProfile = () => {
  return (
    <div className={style.coverContainer}>
      <div className={style.bodyContainer}>
        <ProfileContainer />
      </div>
    </div>
  );
};

export default MainProfile;
