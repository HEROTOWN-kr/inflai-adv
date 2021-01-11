import React from 'react';
import {
  Box, Grid, useMediaQuery, useTheme
} from '@material-ui/core';
import HomeCategory from './sections/HomeCategory';
import HomeSpeciality from './sections/HomeSpeciality';
import HomeService from './sections/HomeService';
import HomePartners from './sections/HomePartners';
import Membership from '../membership/Membership';
import HomeProcess from './sections/HomeProcess';


function home() {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box className="home">
      {/* <Box my={10} textAlign="center" fontSize="30px" fontWeight="500">
          광고주 페이지는 개발중입니다
      </Box> */}
      <Membership />
      <HomeService isMD={isMD} />
      <HomeCategory />
      {/* <HomeProcess /> */}
      <HomeSpeciality isMD={isMD} />
      <HomePartners isMD={isMD} />
    </Box>
  );
}

export default home;
