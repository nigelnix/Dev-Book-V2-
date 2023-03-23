import React from 'react'
import "./Chat.scss"
import closeIconDark from "../../assets/img/close.png"
import closeIconLight from "../../assets/img/closeLight.png"


function Chat({setOpen, close, theme}) {

    const closeModal = () => {
        setOpen(false);
      };

  return (
    <div className='chat-container backgroundInner box-shadow'>
        <img onClick={closeModal} src={theme === "dark" ? closeIconLight : closeIconDark} alt="" />
    </div>
  )
}

export default Chat