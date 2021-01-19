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
  }
];

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function Membership() {
  const [plans, setPlans] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedData, setSelectedData] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const [dragging, setDragging] = useState(false);

  const theme = useTheme();

  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const is1600 = useMediaQuery('(min-width:1600px)');
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  function getPlans() {
    axios.get('/api/TB_PLAN/').then((res) => {
      const { data } = res.data;
      setPlans(data);
    }).catch(err => alert(err.response.data.message));
  }

  useEffect(() => {
    getPlans();
  }, []);

  useEffect(() => {
    const filteredArray = plans.filter(plan => plan.PLN_ID === selected);
    if (filteredArray.length > 0) {
      const {
        PLN_ID, PLN_PRICE_MONTH, PLN_NAME, PLN_MONTH
      } = filteredArray[0];
      const finalPrice = Math.round(PLN_PRICE_MONTH * PLN_MONTH * 1.1);

      const pricePerMonth = `${formatNumber(PLN_PRICE_MONTH)}원`;
      const price = `${formatNumber(finalPrice)}원`;
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
      if (res.status === 201) {
        alert('이미 등록 된 구독이 있습니다!');
        toggleSuccessDialog();
      } else {
        toggleSuccessDialog();
        history.push('/Profile/MembershipInfo');
      }
    }).catch(error => alert(error.response.data.message));
  }

  return (
    <Box maxWidth="1160px" margin="0 auto" my={6} px={2} className="membership">
      <StyledText fontSize={isMD ? '35' : '20'} textAlign="center">
          인플라이
        <span style={{ color: Colors.pink }}> 멤버십</span>
을
            시작하세요
      </StyledText>
      {/* <Box my={3}>
        <StyledText fontSize={isMD ? '35' : '20'} textAlign="center">
          지금 가입 시,
          <span style={{ color: Colors.pink }}> 3개월 '0원'</span>
        </StyledText>
      </Box> */}
      <Box py={3}>
        {isMD ? (
          <Grid container spacing={6}>
            {plans.map((item, index) => (
              <Grid item key={item.PLN_ID} xs={12} md={4}>
                <Box
                  mx={{ xs: 2, md: 0 }}
                  component={Paper}
                  css={{
                    height: '100%', borderRadius: '15px', overflow: 'hidden', cursor: 'pointer'
                  }}
                  className={`membership-card ${selected ? ` ${selected === item.PLN_ID ? 'selected' : 'notSelected'}` : ''}`}
                  onClick={() => selectPlan(item.PLN_ID)}
                >
                  <Box p={3} style={myStyles[index]}>
                    <StyledText fontSize={21} fontWeight="bold" color={myStyles[index].color}>{item.PLN_NAME}</StyledText>
                    <Box mt={8}>
                      <StyledText fontSize={21} color={myStyles[index].color} textAlign="right">월 부담 비용</StyledText>
                      <StyledText fontSize={42} color={myStyles[index].color} textAlign="right" fontWeight="bold" lineHeight="2em">{`₩ ${formatNumber(item.PLN_PRICE_MONTH)}`}</StyledText>
                      <StyledText fontSize={21} color={myStyles[index].color} textAlign="right">{`VAT 미포함${item.PLN_DSCNT ? `, ${item.PLN_DSCNT}% 할인적용` : ''}` }</StyledText>
                    </Box>
                  </Box>
                  <Box px={3} pt={3} pb={8}>
                    <StyledText fontSize={21} lineHeight="1.5em" color={myStyles[index].color2}>{item.PLN_DETAIL}</StyledText>
                    <Box mt={2}>
                      <StyledText fontSize={21} lineHeight="1.5em" color={myStyles[index].color2}>{item.PLN_DETAIL2}</StyledText>
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
        <Grid container justify="center">
          <Grid item>
            <Box width="300px">
              <StyledButton disabled={!selected} onClick={openInfoDialog}>구독하기</StyledButton>
            </Box>
          </Grid>
        </Grid>
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
