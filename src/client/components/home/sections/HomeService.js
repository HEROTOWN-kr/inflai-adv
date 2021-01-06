import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const serviceCards = [
  {
    id: 1,
    icon: 'icon: pencil; ratio: 1.8',
    text1: '인플루언서',
    text2: '바로매칭',
    text3: '둘 중 나에게 맞는 티입은',
    bgColor1: 'rgba(46, 42, 62, 0.9)',
    bgColor2: '#3e3857',
    link: '/Campaign'
  },
  {
    id: 2,
    icon: 'icon: star; ratio: 1.8',
    text1: '인플루언서',
    text2: '멤버십',
    text3: '메가급부터 마이크로, 나노급까지!',
    bgColor1: 'rgba(47, 58, 74, 0.9)',
    bgColor2: '#3b495e',
    link: '/Membership'
  },
  {
    id: 3,
    icon: 'icon: cart; ratio: 1.8',
    text1: '인플루언서',
    text2: 'Mall',
    text3: '인플루언서에게 판매도하고 진성후기도 얻는방법\n',
    bgColor1: 'rgba(42, 58, 62, 0.9)',
    bgColor2: '#394e54',
    link: '/'
  },
];

function HomeService() {
  const history = useHistory();

  return (
    <Box padding="100px 0" className="service-cards" color="#fff">
      <Box textAlign="center" mb={2} fontSize="48px" fontWeight="700">아직도 페이크 인플루언서에게 비용을 쓰고계세요?</Box>
      <Box marginBottom="50px" textAlign="center" fontSize="20px" fontWeight="300">똑똑한 인플루언서 마케팅 inflai</Box>
      <Box maxWidth="1200px" margin="0 auto">
        <Grid container justify="space-between">
          {serviceCards.map(item => (
            <Grid item key={item.id}>
              <Box width="300px" css={{ background: item.bgColor1, cursor: 'pointer' }} onClick={() => history.push(item.link)}>
                <Box p={5}>
                  <Box>
                    <span uk-icon={item.icon} />
                  </Box>
                  <Box mt={2} fontSize="28px">{item.text1}</Box>
                  <Box fontSize="28px" fontWeight="600">{item.text2}</Box>
                  <Box mt={5} fontSize="14px" fontWeight="300">{item.text3}</Box>
                </Box>
                <Box css={{ background: item.bgColor2 }} py={2} textAlign="center" fontSize="16px" fontWeight="500">바로가기</Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default HomeService;
