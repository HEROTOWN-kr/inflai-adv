import React from 'react';
import {
  Box, Grid, useMediaQuery, useTheme
} from '@material-ui/core';
import HomeCategory from './sections/HomeCategory';
import HomeSpeciality from './sections/HomeSpeciality';
import HomeService from './sections/HomeService';


function home() {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box className="home">
      {/* <Box my={10} textAlign="center" fontSize="30px" fontWeight="500">
          광고주 페이지는 개발중입니다
      </Box> */}
      <HomeService isMD={isMD} />
      <HomeCategory />
      <Box padding="100px 0" color="#fff" css={{ background: '#97DCE3' }}>
        <Box textAlign="center" mb={2} fontSize="36px" fontWeight="700">간편하게 진행되는 인플라이 프로세스</Box>
        <Box marginBottom="50px" textAlign="center" fontSize="16px" fontWeight="300">인플루언서 메칭부터 실시간 캠페인진행까지, 원스톱으로 인플라이하세요.</Box>
      </Box>
      <HomeSpeciality />
    </Box>
  );
}

export default home;
