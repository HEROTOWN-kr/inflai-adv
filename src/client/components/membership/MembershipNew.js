import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Grid, Paper, useTheme, useMediaQuery, Button
} from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import StyledText from '../../containers/StyledText';
import { Colors } from '../../lib/Сonstants';
import PlanSuccessDialog from './PlanSuccessDialog';
import AuthContext from '../../context/AuthContext';
import Payment from './Payment';

const PlanColors = ['#f3953f', '#1a9eda', '#eb5888', '#3adc46'];

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function MembershipNew() {
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
    <Box bgcolor="#142b65" color="#ffffff" height="100%">
      <Box maxWidth="1500px" margin="0 auto" py={6} px={2}>
        <Box fontSize={{ xs: '20px', md: '38px' }} textAlign="center">
            인플라이
          <span style={{ color: Colors.pink }}> 멤버십</span>
            을 시작하세요
        </Box>
        <Box mt="100px" mb="90px">
          <Grid container spacing={2} justify="space-between" style={{ marginBottom: '-50px' }}>
            {plans.map((item, index) => (
              <Grid item key={item.PLN_ID}>
                <Box
                  textAlign="center"
                  px="50px"
                  py="35px"
                  mb="50px"
                  boxSizing="border-box"
                  border={`3px solid ${PlanColors[index]}`}
                  borderRadius="13px"
                  maxWidth="325px"
                  color="#7f7f7f"
                  bgcolor="#ffffff"
                >
                  <Box m="0 auto" fontSize="35px" color="#142b65" fontWeight="600">{item.PLN_NAME}</Box>
                  <Box m="0 auto" mt="20px" bgcolor={PlanColors[index]} borderRadius="13px" width="95px" height="3px" component="hr" />
                  <Box my="35px" fontSize="15px" letterSpacing="0.01em" lineHeight="24px">{item.PLN_DETAIL2}</Box>
                  <Box fontSize="35px" fontWeight="600" color="#142b65">{`${(item.PLN_PRICE_MONTH).toLocaleString('en')}원` || '무료'}</Box>
                  {/* <Box my="35px" m="0 auto" p="11px 27px" width="100px" fontSize="18px" color="#ffffff" bgcolor={PlanColors[index]} borderRadius="30px" css={{ cursor: 'pointer' }}>구독하기</Box> */}
                  <Payment bgColor={PlanColors[index]} />
                  <Box mb="10px" fontSize="15px" letterSpacing="0.01em" lineHeight="24px">{item.PLN_DETAIL}</Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <PlanSuccessDialog
          open={successDialogOpen}
          handleClose={toggleSuccessDialog}
          onConfirm={subscribePlan}
          selectedData={selectedData}
        />
      </Box>
    </Box>
  );
}

export default MembershipNew;
