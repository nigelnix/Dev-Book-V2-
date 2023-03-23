import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import axios from 'axios'
import leftArrow from '../../assets/img/leftArrow.png'
import rightArrow from '../../assets/img/rightArrow.png'
import leftArrowBlack from '../../assets/img/arrowLeftBlack.png'
import rightArrowBlack from '../../assets/img/arrowRightBlack.png'
import 'swiper/css'
import './Swiper.scss'
import 'swiper/css/navigation'
import { useNavigate } from 'react-router-dom'

export default function SwiperComponent({ theme, users }) {
  const navigate = useNavigate()

  const handleClick = (id) => () => {
    navigate(`/profile/${id}`)
  }

  return (
    <div className='swiper-container '>
      <img
        className='swiper-button image-swiper-button-prev'
        src={theme === 'dark' ? leftArrow : leftArrowBlack}
        alt=''
      />
      <img
        className='swiper-button image-swiper-button-next'
        src={theme === 'dark' ? rightArrow : rightArrowBlack}
        alt=''
      />
      <Swiper
        className='swiper'
        modules={[Navigation]}
        breakpoints={{
          340: {
            width: 340,
            slidesPerView: 4,
          },

          640: {
            width: 640,
            slidesPerView: 4,
          },

          768: {
            width: 768,
            slidesPerView: 5,
          },
          1220: {
            width: 768,
            slidesPerView: 10,
          },
        }}
        spaceBetween={3}
        navigation={{
          nextEl: '.image-swiper-button-next',
          prevEl: '.image-swiper-button-prev',
          disabledClass: 'swiper-button-disabled',
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {users.map((user) => (
          <SwiperSlide key={`swipper_${user._id}`}>
            <img
              onClick={handleClick(user._id)}
              className='user-img-swiper borderImg'
              src={user.userPic}
              alt=''
            />{' '}
            <p className='text'>{user.username}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
