import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../lib/Сonstants';
import AuthContext from '../../context/AuthContext';

const cards = [
  {
    id: 1,
    title: '직접 모집',
    text1: '처음부터 끝까지',
    text2: '사장님이 직접 만듭니다.',
    url: '/Campaign/Create'
  },
  {
    id: 2,
    title: '홍보 대행 요청',
    text1: '전략 기획부터 마케팅의 과정을 인플라이',
    text2: '마케팅 전문가들과 함께 진행하세요.',
    url: '/Campaign/Request'
  }
];

function CampaignType() {
  const history = useHistory();
  const [hoverCard, setHoverCard] = useState(null);
  const { token, isAuthenticated } = useContext(AuthContext);

  function checkSubscription(id, url) {
    if (id === 1) {
      axios.get('/api/TB_SUBSCRIPTION/check', {
        params: { token }
      }).then((res) => {
        if (res.status === 201) {
          alert('진행중 서브스크립션이 없습니다!');
          history.push('/Membership');
        } else if (res.status === 200) {
          history.push(url);
        }
      }).catch(err => alert(err));
    } else {
      history.push(url);
    }
  }

  function createCampaign(id, url) {
    if (!isAuthenticated && id === 1) {
      history.push('/Login');
    } else {
      checkSubscription(id, url);
    }
  }

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
            맞춤형 인플루언서 마케팅
      </Box>
      <Box fontSize="45px">
          쉽고 빠른 인플루언서 매칭
      </Box>
      <Box mt={4} mb={8} fontSize="16px">
        사장님 사업에 맞는, 바로 그 인풀루언서를 고르실 수 있습니다
      </Box>
      <Grid container spacing={4}>
        {
          cards.map(item => (
            <Grid key={item.id} item xs={12} sm={6}>
              <Box
                onClick={() => createCampaign(item.id, item.url)}
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
