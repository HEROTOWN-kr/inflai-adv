import React from 'react';
import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as Scroll from 'react-scroll';

const { animateScroll, scroller } = Scroll;

function HomeVideoTitle() {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  function scrollTo() {
    const h = window.innerHeight;
    const toTarget = isMD ? h : h - 73;
    animateScroll.scrollTo(toTarget, {
      duration: 700,
      delay: 0,
      smooth: 'easeInOutQuart',
      ignoreCancelEvents: true
    });
    /* Scroller.scrollTo('target', {
      duration: 600,
      delay: 0,
      smooth: 'easeInOutQuart',
      ignoreCancelEvents: true
    }); */
  }

  return (
    <Box
      position="relative"
      style={{
        height: 'calc(100vh - 74px)',
        backgroundColor: 'rgba(0,0,0,0.25)'
      }}
    >
      <Box
        textAlign="center"
        color="#fff"
        position="absolute"
        top="35%"
        width="100%"
      >
        {/* <Box fontSize={isMD ? '40px' : '4.8vw'}>내가 찾던 브랜드협찬. 당신만의 협찬 파트너</Box>
        <Box fontSize={isMD ? '70px' : '9vw'}>#인플라이</Box> */}
        {/* <Box
          border="2px solid #fff"
          borderRadius="20px"
          width="150px"
          py={1}
          margin="0 auto"
          mt={3}
          style={{ cursor: 'pointer' }}
          onClick={scrollTo}
        >
        캠페인 보기
        </Box> */}
      </Box>
      <Box>
        <video
          style={{
            width: '100vw',
            height: 'calc(100vh - 74px)',
            objectFit: 'cover',
            position: 'absolute',
            left: '0px',
            top: '0px',
            zIndex: '-1',
          }}
          id="videoBG"
          // objectFit="cover"
          poster="/attach/video/bgImage2.jpg"
          autoPlay
          muted
          // loop
          onEnded={() => console.log('ended')}
          playsInline
        >
          <source src="/attach/video/bgVideo2.mov" type="video/mp4" />
        </video>
      </Box>
    </Box>
  );
}

export default HomeVideoTitle;
