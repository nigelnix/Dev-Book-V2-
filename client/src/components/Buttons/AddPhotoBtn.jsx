import React, { useState } from "react";
import "./SendBtn.scss";
import addPhotoIcon from "../../assets/img/addPhoto.png";
import addPhotoIconLight from "../../assets/img/addPhotoLight.png";

function AddPhotoBtn({ theme, setTheme, fileChange }) {
  return (
    <>
      <label className="btn text backgroundInner box-shadow border button-TextInput" htmlFor="addImg">
        <img
          className="btn-icon"
          src={theme === "dark" ? addPhotoIconLight : addPhotoIcon}
          alt=""
        />
        <input
          className="addImg-button"
          onChange={fileChange}
          type="file"
          id="addImg"
          name="addImg"
        />
        Photo!
      </label>
    </>
  );
}

export default AddPhotoBtn;
