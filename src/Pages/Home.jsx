import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import HomeSwiper from '../components/home/Swiper'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Content from '../components/home/Swiper/content';
import _ from 'lodash'
import { useSelector } from 'react-redux';

const Home = () => {
  const products = useSelector(state => state.product.data)
  const man = _.filter(products, {
    'category': "men's clothing"
  })
  const women = _.filter(products, {
    'category': "women's clothing"
  })
  const electronics = _.filter(products, {
    'category': "electronics"
  })

  return (
    <Box>
      <HomeSwiper />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        pt: 2
      }}>
        <Typography>Scroll down</Typography>
        <ArrowDropDownIcon sx={{m: '0 auto'}} />
      </Box>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Content props={man} />
        <Content props={women} delay={5000} />
        <Content props={electronics} />
      </Box>
    </Box>
  )
}

export default Home