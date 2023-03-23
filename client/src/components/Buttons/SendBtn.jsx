import React, { useState } from "react";
import "./SendBtn.scss";
import sendImg from "../../assets/img/send.png";
import sendImgLight from "../../assets/img/sendLight.png";

function SendBtn({ theme, setTheme,  handlerSubmit }) {
  return (
    <>
      <button onClick={handlerSubmit} type="submit" className="btn text box-shadow  border button-TextInput">
        {" "}
        <img
          className="btn-icon"
          src={theme === "dark" ? sendImgLight : sendImg}
          alt=""
        />{" "}
        Send!
      </button>
    </>
  );
}

export default SendBtn;
