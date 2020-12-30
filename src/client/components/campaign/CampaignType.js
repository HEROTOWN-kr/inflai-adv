import React, { useState } from 'react';
import { Grid, Paper, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../lib/Сonstants';

const cards = [
  {
    id: 1,
    title: '다이렉트 마케팅',
    text1: '합리적인 가격으로 신속하게!',
    text2: '직접 인플루언서 마케팅을 진행하세요.',
    url: '/Campaign/Create'
  },
  {
    id: 2,
    title: '마케팅 대행 요청',
    text1: '전략 기획부터 마케팅의 과정을 인플라이',
    text2: '마케팅 전문가들과 함께 진행하세요.',
    url: '/Campaign/Request'
  }
];

function CampaignType() {
  const history = useHistory();
  const [hoverCard, setHoverCard] = useState(null);

  return (
    <Box
      mt={4}
      px={{ xs: 3, md: 6 }}
      py={{ xs: 5, md: 8 }}
      maxWidth="780px"
      boxSizing="border-box"
      textAlign="center"
      fontWeight="700"
      border={`1px solid ${Colors.grey}`}
      margin="0 auto"
    >
      <Box mb={1} fontSize="24px">
            매칭형 인플루언서 마케팅
      </Box>
      <Box fontSize="45px">
          쉽고 빠른 인플루언서 매칭
      </Box>
      <Box mt={4} mb={8} fontSize="16px">
            브랜드의 마케팅 목적에 맞춰 최적의 인플루언서를 매칭하고 캠페인을 설계해보세요!
      </Box>
      <Grid container spacing={4}>
        {
          cards.map(item => (
            <Grid key={item.id} item xs={12} sm={6}>
              <Box
                onClick={() => history.push(item.url)}
                onMouseOver={() => setHoverCard(item.id)}
                onMouseOut={() => setHoverCard(null)}
                p={4}
                border={item.id === hoverCard ? `2px solid ${Colors.pink3}` : `1px solid ${Colors.grey}`}
                css={{
                  cursor: 'pointer'
                }}
              >
                <Box fontSize="28px">
                  {item.title}
                </Box>
                <Box mt={4}>
                  {item.text1}
                  <br />
                  {item.text2}
                </Box>
              </Box>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
}

export default CampaignType;
