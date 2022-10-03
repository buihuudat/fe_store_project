import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Box } from '@mui/material';
import './content.css'
import CardProduct from '../../CardProduct'

const Content = ({props, delay=4000}) => {
  return (
    <Box>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Autoplay]}
        autoplay={{
          delay: delay
        }}
        className="mySwiper"
      >
        {props.map((data, index) => (
          <SwiperSlide key={index}>
            <CardProduct {...data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default Content