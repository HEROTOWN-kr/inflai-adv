import React, {
  useContext, useEffect, useRef, useState
} from 'react';
import {
  Box, Grid, Paper, useTheme, useMediaQuery, Button, Dialog, makeStyles, IconButton
} from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Clear, Description } from '@material-ui/icons';
import { Colors } from '../../lib/Сonstants';
import AuthContext from '../../context/AuthContext';
import StyledButton from '../../containers/StyledButton';
import CouponDialog from './CouponDialog';

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
  plan: {
    textAlign: 'center',
    padding: '35px',
    marginBottom: '50px',
    boxSizing: 'border-box',
    borderRadius: '13px',
    maxWidth: '325px',
    color: '#7f7f7f',
    backgroundColor: '#ffffff',
    '& .plan-name': {
      margin: '0 auto',
      fontSize: '35px',
      color: '#142b65',
      fontWeight: '600'
    },
    '& .divider': {
      margin: '0 auto',
      marginTop: '20px',
      borderRadius: '13px',
      width: '95px',
      height: '3px'
    },
    '& .plan-detail': {
      margin: '35px 0',
      fontSize: '15px',
      letterSpacing: '0.01em',
      lineHeight: '24px'
    },
    '& .plan-price': {
      fontSize: '35px',
      fontWeight: '600',
      color: '#142b65'
    },
    '& .pay-button': {
      margin: '26px auto',
      padding: '11px 27px',
      width: '100px',
      fontSize: '18px',
      color: '#ffffff',
      cursor: 'pointer',
      borderRadius: '30px'
    },
    '& .add-info': {
      marginBottom: '10px',
      fontSize: '15px',
      letterSpacing: '0.01em',
      lineHeight: '24px'
    },
  }
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
      history.push('/Campaign');
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
  const [couponDialog, setCouponDialog] = useState(false);
  const [springDialog, setSpringDialog] = useState(false);
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const classes = useStyles();

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

  function toggleCouponDialog() {
    setCouponDialog(!couponDialog);
  }

  function openCouponDialog() {
    if (!token) {
      history.push('/Login');
      return;
    }
    toggleCouponDialog();
  }

  function selectPlan(plan) {
    if (!token) {
      history.push('/Login');
      return;
    }

    const { PLN_ID, PLN_PRICE_MONTH } = plan;

    if (PLN_PRICE_MONTH > 0) {
      axios.get('/api/TB_ADVERTISER/getInfo', { params: { token } }).then((res) => {
        const { ADV_ID } = res.data.data;
        const planData = { ADV_ID, PLN_ID };
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
          history.push('/Campaign');
        }
      }).catch(error => alert(error.response.data.message));
    }
  }

  return (
    <Box bgcolor="#142b65" color="#ffffff" height="100%">
      <Box maxWidth="1500px" margin="0 auto" py={6} px={2}>
        <Box fontSize={{ xs: '20px', md: '38px' }} textAlign="center">
            인플라이
          <span style={{ color: Colors.pink }}> 멤버십</span>
            을 시작하세요
        </Box>
        <Box mt="55px" ml="auto" width={120}>
          <StyledButton
            height={40}
            padding="0 20px"
            background={Colors.green}
            hoverBackground={Colors.greenHover}
            onClick={openCouponDialog}
            startIcon={<Description />}
          >
              쿠폰
          </StyledButton>
        </Box>
        <Box mt="20px" mb="90px">
          <Grid container spacing={2} justify="space-between" style={{ marginBottom: '-50px' }}>
            {/* {plans.map((item, index) => (
              <Grid item key={item.PLN_ID}>
                <Box border={`3px solid ${PlanColors[index]}`} className={classes.plan}>
                  <Box className="plan-name">{item.PLN_NAME}</Box>
                  <Box className="divider" bgcolor={PlanColors[index]} component="hr" />
                  <Box className="plan-detail">{item.PLN_DETAIL2}</Box>
                  <Box className="plan-price">{`${(item.PLN_PRICE_MONTH).toLocaleString('en')}원` || '무료'}</Box>
                  <Box mt="6px">VAT 포함</Box>
                  <Box className="pay-button" bgcolor={PlanColors[index]} onClick={() => selectPlan(item)}>
                    { item.PLN_PRICE_MONTH > 0 ? '결제' : '시작' }
                  </Box>
                  <Box className="add-info">{item.PLN_DETAIL}</Box>
                </Box>
              </Grid>
            ))} */}
            <Grid item>
              <Box border={`3px solid ${PlanColors[0]}`} className={classes.plan}>
                <Box className="plan-name">무료사용자</Box>
                <Box className="divider" bgcolor={PlanColors[0]} component="hr" />
                <Box className="plan-detail">• 1개월 간 총 10명의 인플루언서를 인공지능으로 선택할수 있습니다.</Box>
                <Box className="plan-price">0원</Box>
                <Box mt="6px">VAT 포함</Box>
                <Box
                  className="pay-button"
                  bgcolor={PlanColors[0]}
                  onClick={() => selectPlan({ PLN_ID: 4, PLN_PRICE_MONTH: 0 })}
                >
                  시작
                </Box>
                <Box className="add-info">1개월 무료 플랜입니다</Box>
              </Box>
            </Grid>
            <Grid item>
              <Box border={`3px solid ${PlanColors[1]}`} className={classes.plan}>
                <Box className="plan-name">교육생</Box>
                <Box className="divider" bgcolor={PlanColors[1]} component="hr" />
                <Box className="plan-detail">• 1개월 간 총 20명의 인플루언서를 인공지능으로 선택할수 있습니다.</Box>
                <Box className="plan-price">0원</Box>
                <Box mt="6px">VAT 포함</Box>
                <Box
                  className="pay-button"
                  bgcolor={PlanColors[1]}
                  onClick={() => selectPlan({ PLN_ID: 8, PLN_PRICE_MONTH: 0 })}
                >
                  신청
                </Box>
                <Box className="add-info">1개월 무료 플랜입니다</Box>
              </Box>
            </Grid>
            <Grid item>
              <Box border={`3px solid ${PlanColors[2]}`} className={classes.plan}>
                <Box className="plan-name">일반</Box>
                <Box className="divider" bgcolor={PlanColors[2]} component="hr" />
                <Box className="plan-detail" style={{ margin: '20px 0 26px 0' }}>
                  • 1개월 간 총 50명의 인플루언서를 인공지능으로 선택할수 있습니다.
                  <br />
                  (SNS, 블로그 인플라이 대해서 글 쓰기)
                </Box>
                <Box className="plan-price">0원</Box>
                <Box mt="6px">VAT 포함</Box>
                <Box
                  className="pay-button"
                  bgcolor={PlanColors[2]}
                  onClick={() => selectPlan({ PLN_ID: 9, PLN_PRICE_MONTH: 0 })}
                >
                  신청
                </Box>
                <Box className="add-info">1개월 무료 플랜입니다</Box>
              </Box>
            </Grid>
            <Grid item>
              <Box border={`3px solid ${PlanColors[3]}`} className={classes.plan}>
                <Box className="plan-name">프로</Box>
                <Box className="divider" bgcolor={PlanColors[3]} component="hr" />
                <Box className="plan-detail">• 1개월 간 무제한 인플루언서를 인공지능으로 선택할수 있습니다.</Box>
                <Box className="plan-price">100,000원</Box>
                <Box mt="6px">VAT 포함</Box>
                <Box
                  className="pay-button"
                  bgcolor={PlanColors[3]}
                  onClick={() => selectPlan({ PLN_ID: 10, PLN_PRICE_MONTH: 100000 })}
                >
                  결제
                </Box>
                <Box className="add-info">1개월 무료 플랜입니다</Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* <Box my="26px" p="11px 40px" fontSize="18px" color="#ffffff" bgcolor={Colors.greenHover} borderRadius="30px" css={{ cursor: 'pointer' }} onClick={toggleCouponDialog}>
          쿠폰 사용하기
        </Box> */}
        <SpringDialog
          open={springDialog}
          closeDialog={toggleSpringDialog}
          planData={selected}
        />
        <CouponDialog
          open={couponDialog}
          closeDialog={toggleCouponDialog}
        />
      </Box>
    </Box>
  );
}

export default MembershipNew;
