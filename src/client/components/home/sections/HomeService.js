import React from 'react';
import {
  Box, Grid, useMediaQuery, useTheme
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const serviceCards = [
  {
    id: 1,
    icon: 'pencil',
    ratio: '1.8',
    text1: '인플루언서',
    text2: '직접모집',
    text3: '업계 최저비용으로 사장님이 직접 모집!',

    buttonText: '바로가기',
    bgColor1: 'rgba(46, 42, 62, 0.9)',
    bgColor2: '#3e3857',
    link: '/Campaign/Create'
  },
  {
    id: 2,
    icon: 'star',
    ratio: '1.8',
    text1: '마케팅',
    text2: '대행요청',
    text3: '사진, 영상, 홈페이지 견적까지!',
    buttonText: '바로가기',
    bgColor1: 'rgba(47, 58, 74, 0.9)',
    bgColor2: '#3b495e',
    link: '/Campaign/Request'
  },
  {
    id: 3,
    icon: 'cart',
    ratio: '1.8',
    text1: 'Ai',
    text2: '분석서비스',
    text3: '준비중입니다. 조금만 기다려주세요',
    buttonText: '준비중',
    bgColor1: 'rgba(42, 58, 62, 0.9)',
    bgColor2: '#394e54',
    link: '/'
  },
];

function HomeService(props) {
  const { isMD } = props;
  const history = useHistory();

  return (
    <Box padding={{ xs: '50px 16px', md: '100px 16px' }} className="service-cards" color="#fff">
      <Box textAlign="center" mb={2} fontSize={{ xs: '7vw', md: '48px' }} fontWeight="700">나에게 딱 맞는 인플루언서를 지금 만나보세요!</Box>
      <Box marginBottom="50px" textAlign="center" fontSize={{ xs: '4vw', md: '20px' }} fontWeight="300">똑똑한 인플루언서 마케팅 inflai</Box>
      <Box maxWidth="1200px" margin="0 auto">
        {isMD ? (
          <Grid container justify={isMD ? 'space-between' : 'center'} spacing={isMD ? 0 : 2}>
            {serviceCards.map(item => (
              <Grid item key={item.id} xs={12} md="auto">
                <Box width="300px" margin={{ xs: '0 auto', md: '0' }} css={{ background: item.bgColor1, cursor: 'pointer' }} onClick={() => history.push(item.link)}>
                  <Box p={5}>
                    <Box>
                      <span uk-icon={`icon: ${item.icon}; ratio: ${item.ratio}`} />
                    </Box>
                    <Box mt={2} fontSize="28px">{item.text1}</Box>
                    <Box fontSize="28px" fontWeight="600">{item.text2}</Box>
                    <Box mt={5} fontSize="14px" fontWeight="300">{item.text3}</Box>
                  </Box>
                  <Box css={{ background: item.bgColor2 }} py={2} textAlign="center" fontSize="16px" fontWeight="500">{item.buttonText}</Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container justify={isMD ? 'space-between' : 'center'} spacing={isMD ? 0 : 2}>
            {serviceCards.map(item => (
              <Grid item key={item.id} xs={12} md="auto">
                <Box margin={{ xs: '0 auto', md: '0' }} css={{ background: item.bgColor1, cursor: 'pointer' }} onClick={() => history.push(item.link)}>
                  <Box p="4vw">
                    <Grid container alignItems="center">
                      <Grid item>
                        <Box padding="0 4vw">
                          <span uk-icon={`icon: ${item.icon}; ratio: 1.5`} />
                        </Box>
                      </Grid>
                      <Grid item xs>
                        <Box fontSize="5.5vw" fontWeight="200">
                          {item.text1}
                          <Box fontWeight="400" component="span">{` ${item.text2}`}</Box>
                        </Box>
                        <Box fontSize="3.5vw" fontWeight="300">{item.text3}</Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box css={{ background: item.bgColor2 }} py={{ xs: 1, sm: 2 }} textAlign="center" fontSize="3.5vw" fontWeight="500">{item.buttonText}</Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        /* <Box margin="0 -20px" className="scrolling-wrapper-flexbox">
            {serviceCards.map(item => (
              <Box className="card" width="80%">
                <Box margin="0 20px" css={{ background: item.bgColor1, cursor: 'pointer' }} onClick={() => history.push(item.link)}>
                  <Box p={{ xs: 2, sm: 5 }}>
                    <Box>
                      <span uk-icon={item.icon} />
                    </Box>
                    <Box mt={2} fontSize={{ xs: '20px', sm: '28px' }}>{item.text1}</Box>
                    <Box fontSize={{ xs: '20px', sm: '28px' }} fontWeight="600">{item.text2}</Box>
                    <Box mt={5} fontSize="14px" fontWeight="300">{item.text3}</Box>
                  </Box>
                  <Box css={{ background: item.bgColor2 }} py={2} textAlign="center" fontSize="16px" fontWeight="500">바로가기</Box>
                </Box>
              </Box>
            ))}
          </Box> */
        )}
      </Box>
    </Box>
  );
}

export default HomeService;
