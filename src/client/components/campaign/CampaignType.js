import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../lib/Сonstants';
import AuthContext from '../../context/AuthContext';
import StyledButton from '../../containers/StyledButton';

const cards = [
  {
    id: 1,
    title: '내가 직접 모집하기',
    text1: '2분 만에 올리고',
    text2: '딱 맞는 인플루언서를 만나보자',
    url: '/Campaign/Create'
  },
  {
    id: 2,
    title: '맞춤형 마케팅 요청',
    text1: '사진, 영상, 상세페이지, 홈페이지',
    text2: '지금 견적 받아보기',
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
          alert('멤버십 구독을 신청해주세요!');
          history.push('/Membership');
        } else if (res.status === 202) {
          alert(res.data.message);
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
      <Box p={2} mb={3} border="1px solid green" color="green">
        지금 진행중인 서브스크립션은 비기너 플랜입니다. 서브스크립션 만료 기간은 2021-07-30 입니다.
      </Box>
      <Box p={1} mb={3} border="1px solid red" color="red">
        <Grid container alignItems="center">
          <Grid item>진행중인 서브스크립션은 없습니다. 서브스크립션 구독하실까요? </Grid>
          <Grid item>
            <StyledButton height="38px" padding="0 22px">
              구독하기
            </StyledButton>
          </Grid>
        </Grid>

      </Box>
      <Box mb={1} fontSize="24px">
            인공지능 인플루언서 마케팅
      </Box>
      <Box fontSize="45px">
          쉽고 빠른 인플루언서 매칭
      </Box>
      <Box mt={4} mb={8} fontSize="16px">
            내 사업홍보에 딱 맞는 인플루언서를 만나다!
      </Box>
      <Grid container spacing={4}>
        { cards.map(item => (
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
        )) }
      </Grid>
    </Box>
  );
}

export default CampaignType;
