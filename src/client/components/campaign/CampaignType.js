import React, { useContext, useState } from 'react';
import axios from 'axios';
import {
  Grid, Paper, Box, makeStyles
} from '@material-ui/core';
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
  },
  {
    id: 3,
    title: '지난 모집캠페인 복사',
    text1: '기전 만들었던 캠페인',
    text2: '지금 바로 복사하기',
    url: '/Campaign/Copy'
  }
];

const cards2 = [
  {
    id: 1,
    title: '내가 직접 모집하기',
    content: '2분 만에 올리고 딱 맞는 인플루언서를 만나보자',
    url: '/Campaign/Create'
  },
  {
    id: 2,
    title: '지난 모집캠페인 복사',
    content: '기전 만들었던 캠페인 지금 바로 복사하기',
    url: '/Campaign/Copy'
  },
  {
    id: 3,
    title: '맞춤형 마케팅 요청',
    content: '사진, 영상, 상세페이지, 홈페이지 지금 견적 받아보기',
    url: '/Campaign/Request'
  }
];

const useStyles = makeStyles({
  card: {
    cursor: 'pointer',
    border: `2px solid ${Colors.grey}`,
    '&:hover': {
      border: `2px solid ${Colors.pink3}`
    }
  },
  typeCard: {
    textAlign: 'left',
    padding: '36px',
    boxSizing: 'border-box',
    height: '310px',
    width: '310px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '20px',
    position: 'relative',
    '&:hover': {
      cursor: 'pointer',
      border: `1px solid ${Colors.pink3}`,
    },
    '&:after': {
      content: '',
      position: 'absolute',
      left: '35px',
      bottom: '49px',
      width: '30px',
      height: '10px',
      background: 'url(../../img/icons/arrow_icon.png) 0 0 no-repeat',
      backgroundSize: '100% 100%',
    }
  },
  cardTitle: {
    marginBottom: '20px',
    color: '#999',
  },
  cardContent: {
    marginBottom: '20px',
    color: '#222',
    letterSpacing: '-0.048em',
    lineHeight: '32px',
    overflow: 'hidden',
    wordBreak: 'break-all',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal'
  },
  main: {
    backgroundColor: '#f8f8f8',
    color: '#000',
    textAlign: 'center'
  }
});

function CampaignType() {
  const history = useHistory();
  const { token, isAuthenticated } = useContext(AuthContext);
  const classes = useStyles();

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
      className={classes.main}
      px={{ xs: 3, md: 6 }}
      py={{ xs: 5, md: 8 }}
    >
      <Box mb={1} fontSize="24px">
        인공지능 인플루언서 마케팅
      </Box>
      <Box fontSize="45px" fontWeight={700}>
        쉽고 빠른 인플루언서 매칭
      </Box>
      <Box mt={4} fontSize="18px">
        내 사업홍보에 딱 맞는 인플루언서를 만나다!
      </Box>
      <Box m="64px auto" maxWidth={1024}>
        <Grid container justify="space-between">
          { cards2.map(item => (
            <Grid key={item.id} item>
              <Box className={classes.typeCard} onClick={() => createCampaign(item.id, item.url)}>
                <Box fontSize="18px" fontWeight={500} className={classes.cardTitle}>{item.title}</Box>
                <Box fontSize="24px" className={classes.cardContent}>{item.content}</Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  /* <Box
      my={4}
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
              p={4}
              className={classes.card}
              onClick={() => createCampaign(item.id, item.url)}
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
      <Grid container justify="center">
        <Grid item xs={12} sm={6}>
          <Box
            mt={4}
            p={4}
            className={classes.card}
            onClick={() => createCampaign(3, '/Campaign/Copy')}
          >
            <Box fontSize="28px">지난 모집캠페인 복사</Box>
            <Box mt={4}>
              기전 만들었던 캠페인
              <br />
              지금 바로 복사하기
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box> */
  );
}

export default CampaignType;
