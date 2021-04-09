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
import HomeBanners from './sections/HomeBanners';
import HomeVideoTitle from './sections/HomeVideoTitle';
import MembershipNew from "../membership/MembershipNew";


function home(props) {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const { isMember } = props;

  return (
    <Box className="home">
      <HomeVideoTitle />
      {isMember ? null : (
        <MembershipNew />
      )}
      <HomeService isMD={isMD} />
      <HomeCategory />
      <HomeBanners />
      {/* <HomeProcess /> */}
      <HomeSpeciality isMD={isMD} />
      {/* <HomePartners isMD={isMD} /> */}
    </Box>
  );
}

export default home;
