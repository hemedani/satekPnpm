import React from "react";

interface Props {
  imageURL: string;
  fullName: string;
  level: string;
}

export const Avatar: React.FC<Props> = ({ imageURL, fullName, level }) => {
  return (
    <div className="avatar-cnt">
      <img className="avatar-pic" src={imageURL} alt="NotFound" />
      <div className="avtar-details">
        <div className="fullname">{fullName}</div>
        <div className="level">{level}</div>
      </div>
    </div>
  );
};
