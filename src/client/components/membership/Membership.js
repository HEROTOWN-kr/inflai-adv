import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Grid, Paper, useTheme, useMediaQuery
} from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import StyledText from '../../containers/StyledText';
import { Colors } from '../../lib/Сonstants';
import StyledButton from '../../containers/StyledButton';
import PlanSuccessDialog from './PlanSuccessDialog';
import AuthContext from '../../context/AuthContext';

const myStyles = [
  {
    backgroundColor: 'rgb(251,253,254)',
    background: 'linear-gradient(349deg, rgba(237,242,245,1) 0%, rgba(251,253,254,1) 100%)',
    color: '#334155',
    color2: '#888888'
  },
  {
    backgroundColor: 'rgb(34,155,242)',
    background: 'linear-gradient(349deg, rgba(34,155,242,1) 0%, rgba(35,218,219,1) 100%)',
    color: '#ffffff',
    color2: '#888888'
  },
  {
    backgroundColor: 'rgb(35,197,117)',
    background: 'linear-gradient(349deg, rgba(35,197,117,1) 0%, rgba(45,240,151,1) 100%)',
    color: '#ffffff',
    color2: '#888888'
  },
  {
    backgroundColor: 'rgb(35,197,117)',
    background: 'linear-gradient(349deg, rgba(187,35,197,1) 0%, rgba(118,230,179,1) 100%)',
    color: '#ffffff',
    color2: '#888888'
  }
];

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const testPlans = [
  {
    PLN_ID: 1,
    PLN_NAME: '1개월 이용',
    PLN_DETAIL: '1개월 무료 플랜입니다',
    PLN_DETAIL2: '•1개월 간 총 5명의 인플루언서를 인공지능으로 선택할수 있습니다.',
    PLN_MONTH: 1,
    PLN_INF_MONTH: 5,
    PLN_PRICE_MONTH: 0,
    PLN_DSCNT: null
  },
  {
    PLN_ID: 2,
    PLN_NAME: '2개월 이용',
    PLN_DETAIL: '2개월 플랜입니다',
    PLN_DETAIL2: '•2개월 간 총 30명의 인플루언서를 인공지능으로 선택할수 있습니다.',
    PLN_MONTH: 2,
    PLN_INF_MONTH: 15,
    PLN_PRICE_MONTH: 30000,
    PLN_DSCNT: null
  },
  {
    PLN_ID: 3,
    PLN_NAME: '3개월 이용',
    PLN_DETAIL: '3개월 플랜입니다',
    PLN_DETAIL2: '•3개월 간 총 300명의 인플루언서를 인공지능으로 선택할수 있습니다.',
    PLN_MONTH: 3,
    PLN_INF_MONTH: 100,
    PLN_PRICE_MONTH: 100000,
    PLN_DSCNT: null
  },
  {
    PLN_ID: 4,
    PLN_NAME: '4개월 이용',
    PLN_DETAIL: '4개월 플랜입니다',
    PLN_DETAIL2: '•4개월 간 총 2000명의 인플루언서를 인공지능으로 선택할수 있습니다.',
    PLN_MONTH: 4,
    PLN_INF_MONTH: 500,
    PLN_PRICE_MONTH: 150000,
    PLN_DSCNT: null
  },
];

function Membership() {
  const [plans, setPlans] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedData, setSelectedData] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const [dragging, setDragging] = useState(false);

  const theme = useTheme();

  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  function getPlans() {
    axios.get('/api/TB_PLAN/').then((res) => {
      const { data } = res.data;
      setPlans(data);
    }).catch(err => alert(err.response.data.message));
  }

  useEffect(() => {
    getPlans();
    // setPlans(testPlans);
  }, []);

  useEffect(() => {
    const filteredArray = plans.filter(plan => plan.PLN_ID === selected);
    if (filteredArray.length > 0) {
      const {
        PLN_ID, PLN_PRICE_MONTH, PLN_NAME, PLN_MONTH
      } = filteredArray[0];
      const finalPrice = Math.round(PLN_PRICE_MONTH * PLN_MONTH * 1.1);

      const pricePerMonth = `${formatNumber(PLN_PRICE_MONTH)}원`;
      const price = `${formatNumber(finalPrice)}원(VAT포함)`;
      setSelectedData({
        PLN_ID,
        planName: PLN_NAME,
        pricePerMonth,
        price,
        bankName: '기업은행',
        bankAccount: '935-012238-01016',
        bankHost: '(주)대가들이사는마을'
      });
    }
  }, [selected]);

  function toggleSuccessDialog() {
    setSuccessDialogOpen(!successDialogOpen);
  }

  function openInfoDialog() {
    if (token) {
      toggleSuccessDialog();
    } else {
      history.push('/Login');
    }
  }

  function selectPlan(id) {
    if (id === selected) {
      setSelected(null);
    } else {
      setSelected(id);
    }
  }

  function subscribePlan() {
    axios.post('/api/TB_SUBSCRIPTION/save', {
      token,
      PLN_ID: selectedData.PLN_ID
    }).then((res) => {
      if (res.status === 202) {
        alert(res.data.message);
        toggleSuccessDialog();
        history.push('/Profile/UserInfo');
      } else if (res.status === 201) {
        alert(res.data.message);
        toggleSuccessDialog();
      } else {
        toggleSuccessDialog();
        history.push('/Profile/MembershipInfo');
      }
    }).catch(error => alert(error.response.data.message));
  }

  return (
    <Box maxWidth="1160px" margin="0 auto" my={6} px={2} className="membership">
      <Box fontSize={{ xs: '20px', md: '38px' }} textAlign="center">
          인플라이
        <span style={{ color: Colors.pink }}> 멤버십</span>
을
            시작하세요
      </Box>
      <Box mt="50px" mb="90px">
        {isMD ? (
          <Grid container justify="space-between">
            {plans.map((item, index) => (
              <Grid item key={item.PLN_ID} xs={12} md="auto">
                <Box
                  width={{ xs: '100%', md: '270px' }}
                  mx={{ xs: 2, md: 0 }}
                  component={Paper}
                  css={{
                    height: '100%', borderRadius: '15px', overflow: 'hidden', cursor: 'pointer'
                  }}
                  className={`membership-card ${selected ? ` ${selected === item.PLN_ID ? 'selected' : 'notSelected'}` : ''}`}
                  onClick={() => selectPlan(item.PLN_ID)}
                >
                  <Box p="20px" style={myStyles[index]}>
                    <Box mt="40px">
                      <StyledText fontSize={19} color={myStyles[index].color} textAlign="right">월 부담 비용</StyledText>
                      <StyledText fontSize={35} color={myStyles[index].color} textAlign="right" fontWeight="bold" lineHeight="2em">{`₩ ${formatNumber(item.PLN_PRICE_MONTH)}`}</StyledText>
                      <StyledText fontSize={19} color={myStyles[index].color} textAlign="right">{`VAT 미포함${item.PLN_DSCNT ? `, ${item.PLN_DSCNT}% 할인적용` : ''}` }</StyledText>
                    </Box>
                  </Box>
                  <Box p={3}>
                    <StyledText fontSize={19} lineHeight="1.5em" color={myStyles[index].color2}>{item.PLN_DETAIL}</StyledText>
                    <Box mt={2}>
                      <StyledText fontSize={19} lineHeight="1.5em" color={myStyles[index].color2}>{item.PLN_DETAIL2}</StyledText>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box margin="0 -20px" className="scrolling-wrapper-flexbox">
            {plans.map((item, index) => (
              <Box key={item.PLN_ID} className="card" width="70%" paddingBottom="1px">
                <Box
                  margin="0 20px"
                  component={Paper}
                  css={{
                    height: '100%', borderRadius: '15px', overflow: 'hidden', cursor: 'pointer'
                  }}
                  onClick={() => { selectPlan(item.PLN_ID); openInfoDialog(); }}
                >
                  <Box p={2} style={myStyles[index]}>
                    <StyledText fontSize={16} fontWeight="bold" color={myStyles[index].color}>{item.PLN_NAME}</StyledText>
                    <Box mt={3}>
                      <StyledText fontSize={16} color={myStyles[index].color} textAlign="right">월 부담 비용</StyledText>
                      <StyledText fontSize={22} color={myStyles[index].color} textAlign="right" fontWeight="bold" lineHeight="2em">{`₩ ${formatNumber(item.PLN_PRICE_MONTH)}`}</StyledText>
                      <StyledText fontSize={16} color={myStyles[index].color} textAlign="right">{`VAT 미포함${item.PLN_DSCNT ? `, ${item.PLN_DSCNT}% 할인적용` : ''}` }</StyledText>
                    </Box>
                  </Box>
                  <Box px={2} pt={2} pb={2}>
                    <StyledText fontSize={16} lineHeight="1.5em" color={myStyles[index].color2}>{item.PLN_DETAIL}</StyledText>
                    <Box mt={1}>
                      <StyledText fontSize={16} lineHeight="1.5em" color={myStyles[index].color2}>{item.PLN_DETAIL2}</StyledText>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      {isMD ? (
        <Box width="190px" m="0 auto">
          <StyledButton disabled={!selected} fontSize="16px" fontWeight="600" height="42px" onClick={openInfoDialog}>구독하기</StyledButton>
        </Box>
      ) : null}
      <PlanSuccessDialog
        open={successDialogOpen}
        handleClose={toggleSuccessDialog}
        onConfirm={subscribePlan}
        selectedData={selectedData}
      />
    </Box>
  );
}

export default Membership;
