import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation, Autoplay } from "swiper";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

export default function HomeSwiper() {
  const products = useSelector(state => state.product.data)
  return (
    <Box sx={{color: '#000'}}>
      <Swiper 
        navigation={true} 
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay= {{
          delay: 3000,
          disableOnInteraction: false   
        }}
        className="mySwiper"
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <img src={product.image} alt={product.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
