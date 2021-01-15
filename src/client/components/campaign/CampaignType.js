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
    title: '대행 요청',
    text1: '사장님에게 필요한 마케팅을 제안합니다',
    text2: '사진, 영상, 상세페이지, 홈페이지까지!',
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
          alert('멤버십을 신청해주세요! (3개월 무료진행중));
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
        사장님 사업에 딱맞는, 바로 그 인풀루언서를 연결해드립니다
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
