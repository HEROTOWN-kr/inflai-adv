import React, {
  useContext, useEffect, useRef, useState
} from 'react';
import {
  Box, Grid, Paper, useTheme, useMediaQuery, Button, Dialog, makeStyles, IconButton
} from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import { Clear } from '@material-ui/icons';
import StyledText from '../../containers/StyledText';
import { Colors } from '../../lib/Сonstants';
import PlanSuccessDialog from './PlanSuccessDialog';
import AuthContext from '../../context/AuthContext';
import Payment from './Payment';
import StyledButton from '../../containers/StyledButton';

const PlanColors = ['#f3953f', '#1a9eda', '#eb5888', '#3adc46'];

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#b9b9b9de'
  },
  paper: {
    maxWidth: '763px',
    width: '100%',
    margin: '12px',
    borderRadius: '2px'
  },
  button: {
    padding: 0,
    minWidth: 0
  },
});

function SpringDialog(props) {
  const [payUrl, setPayUrl] = useState('');
  const history = useHistory();
  const { open, closeDialog, planData } = props;
  const {
    ADV_ID, PLN_ID
  } = planData;
  const classes = useStyles();
  const iframeRef = useRef(null);

  function onDialogEntered() {
    const url = 'https://biz.inflai.com/payment/order?'
    // + `money=${finalPrice}`
    // + `&plan=${PLN_NAME}`
    + `planId=${PLN_ID}`
    // + `&name=${ADV_NAME}`
    // + `&email=${ADV_EMAIL}`
    // + `&phone=${ADV_TEL}`
    + `&advId=${ADV_ID}`;
    setPayUrl(url);
  }

  function onDialogClose() {
    closeDialog();
  }

  function handleIframe() {
    const iframeItem = iframeRef.current;
    const url = iframeItem.contentWindow.location.href;
    const success = url.indexOf('success');
    const failed = url.indexOf('failed');
    if (success > -1) {
      history.push('/Profile/MembershipInfo');
      onDialogClose();
    }
    if (failed > -1) {
      onDialogClose();
    }
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      maxWidth="sm"
      onClose={onDialogClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      onEntered={onDialogEntered}
    >
      <Box p="15px" fontSize="21px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
        인플라이
        <IconButton size="medium" classes={{ root: classes.root }} onClick={onDialogClose}>
          <Clear />
        </IconButton>
      </Box>
      <Box>
        <iframe
          title="spring"
          ref={iframeRef}
          src={payUrl}
          // src="http://localhost:8081"
          name="thumbnails"
          frameBorder="0"
          onLoad={handleIframe}
          style={{ width: '100%', height: '573px' }}
        />
      </Box>
    </Dialog>
  );
}

function MembershipNew() {
  const [plans, setPlans] = useState([]);
  const [selected, setSelected] = useState({});
  const [springDialog, setSpringDialog] = useState(false);
  const history = useHistory();
  const { token } = useContext(AuthContext);

  function getPlans() {
    axios.get('/api/TB_PLAN/').then((res) => {
      const { data } = res.data;
      setPlans(data);
    }).catch(err => alert(err.response.data.message));
  }

  useEffect(() => {
    getPlans();
  }, []);

  function toggleSpringDialog() {
    setSpringDialog(!springDialog);
  }

  function selectPlan(plan) {
    if (token) {
      const {
        PLN_ID, PLN_PRICE_MONTH, PLN_NAME, PLN_MONTH
      } = plan;

      if (PLN_PRICE_MONTH > 0) {
        axios.get('/api/TB_ADVERTISER/getInfo', { params: { token, } }).then((res) => {
          const {
            ADV_ID, ADV_COM_NAME, ADV_NAME, ADV_EMAIL, ADV_TEL
          } = res.data.data;


          const finalPrice = Math.round(PLN_PRICE_MONTH * PLN_MONTH * 1.1);

          const planData = {
            ADV_ID,
            ADV_COM_NAME,
            ADV_NAME,
            ADV_EMAIL,
            ADV_TEL,
            PLN_ID,
            PLN_NAME: `${PLN_NAME} 멤버십 구독`,
            finalPrice: finalPrice.toString()
          };

          setSelected(planData);
          toggleSpringDialog();
        }).catch((err) => {
          alert(err.response.data.message);
        });
      } else {
        axios.post('/api/TB_SUBSCRIPTION/save', {
          token,
          PLN_ID
        }).then((res) => {
          if (res.status === 202) {
            alert(res.data.message);
            history.push('/Profile/UserInfo');
          } else if (res.status === 201) {
            alert(res.data.message);
          } else {
            history.push('/Profile/MembershipInfo');
          }
        }).catch(error => alert(error.response.data.message));
      }
    } else {
      history.push('/Login');
    }
    // toggleSpringDialog();
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
                  <Box mt="6px">VAT 포함</Box>
                  {/* <Box my="35px" m="0 auto" p="11px 27px" width="100px" fontSize="18px" color="#ffffff" bgcolor={PlanColors[index]} borderRadius="30px" css={{ cursor: 'pointer' }}>구독하기</Box> */}
                  {/* <Payment bgColor={PlanColors[index]} /> */}
                  <Box my="26px" m="0 auto" p="11px 27px" width="100px" fontSize="18px" color="#ffffff" bgcolor={PlanColors[index]} borderRadius="30px" css={{ cursor: 'pointer' }} onClick={() => selectPlan(item)}>
                    {item.PLN_PRICE_MONTH > 0 ? '결제' : '시작'}
                  </Box>
                  <Box mb="10px" fontSize="15px" letterSpacing="0.01em" lineHeight="24px">{item.PLN_DETAIL}</Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <SpringDialog
          open={springDialog}
          closeDialog={toggleSpringDialog}
          planData={selected}
        />
      </Box>
    </Box>
  );
}

export default MembershipNew;
