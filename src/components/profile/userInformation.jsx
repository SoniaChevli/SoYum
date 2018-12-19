import React from "react";
import NoProfilePicture from "../../icons/no_profile.png";

const UserInformation = ({ profilePhoto, userName, userBio }) => {
  return (
    <header className="profileHeader">
      {profilePhoto ? (
        <img className="profilePhoto" src={profilePhoto} alt="" />
      ) : (
        <img className="profilePhoto" src={NoProfilePicture} alt="" />
      )}
      <div className="headerUserInfo">
        <div className="headerUserName">{userName} </div>
        <div className="headerBio">{userBio} </div>
      </div>
    </header>
  );
};

export default UserInformation;
