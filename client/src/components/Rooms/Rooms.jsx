import React from "react";
import "./Rooms.scss";
import randomImg from "../../assets/img/random.png";
import randomImgLight from "../../assets/img/randomLight.png";
import backendImg from "../../assets/img/coding.png";
import backendImgLight from "../../assets/img/codingLight.png";
import frontendImg from "../../assets/img/design.png";
import frontendImgLight from "../../assets/img/designLight.png";
import designImg from "../../assets/img/webDesign.png";
import designImgLight from "../../assets/img/webDesignLight.png";
import jokesImg from "../../assets/img/joking.png";
import jokesImgLight from "../../assets/img/jokingLight.png";

function Rooms({ theme, setTheme }) {
  return (
    <div className="rooms-container backgroundInner box-shadow">
      <h3 className="card-title text">Communities</h3>
      <div className="border-line "></div>
      <div className="rooms-wraper">
        <div className="room">
          <img  src={theme === "dark" ? frontendImgLight : frontendImg} alt="" />
          <h3 className="room-title text ">#Frontend</h3>
        </div>
        <div className="room">
          <img src={theme === "dark" ? backendImgLight : backendImg} alt="" />
          <h3 className="room-title text">#Backend</h3>
        </div>
        <div className="room">
          <img src={theme === "dark" ? designImgLight : designImg} alt="" />
          <h3 className="room-title text">#UI/UX</h3>
        </div>
        <div className="room">
          <img src={theme === "dark" ? randomImgLight : randomImg} alt="" />
          <h3 className="room-title text">#Random</h3>
        </div>
        <div className="room">
          <img src={theme === "dark" ? jokesImgLight : jokesImg} alt="" />
          <h3 className="room-title text">#Jokes</h3>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
