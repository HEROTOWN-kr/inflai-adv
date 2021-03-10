import React from 'react';
import { Box, Button } from '@material-ui/core';
import axios from 'axios';

function Payment(props) {
  const { item_data, getCampaign, bgColor } = props;
  const userCode = 'imp16565297';

  const dataKCP = {
    pg: 'kcp',
    pay_method: 'card',
    // merchant_uid: item_data.AD_UID,
    merchant_uid: `merchant_${new Date().getTime()}`,
    name: '1월 구독',
    // name: item_data.AD_PROD_NAME,
    amount: '500',
    // amount: item_data.AD_PRICE,
    currency: 'KRW',
    buyer_name: 'Andrian',
    // buyer_name: item_data.TB_ADVERTISER.ADV_COM_NAME,
    buyer_tel: '01026763937',
    // buyer_tel: item_data.TB_ADVERTISER.ADV_TEL,
    buyer_email: 'andriantsoy@gmail.com',
    // buyer_email: item_data.TB_ADVERTISER.ADV_EMAIL,
    escrow: undefined,
    request_id: 'req_1585878201926',
    tier_code: undefined,
    // data: item_data
  };

  /* const data = {
    pg: 'danal_tpay',
    pay_method: 'card',
    merchant_uid: item_data.AD_UID,
    name: item_data.AD_PROD_NAME,
    // amount: item_data.AD_PRICE,
    amount: '100',
    currency: 'KRW',
    buyer_name: item_data.TB_ADVERTISER.ADV_COM_NAME,
    buyer_tel: item_data.TB_ADVERTISER.ADV_TEL,
    buyer_email: item_data.TB_ADVERTISER.ADV_EMAIL,
    escrow: undefined,
    request_id: 'req_1585878201926',
    tier_code: undefined,
  }; */

  function callback(response) {
    /* const query = queryString.stringify(response);
    history.push(`/payment/result?${query}`); */
    console.log(response);
    if (response.success) {
      const obj = {
        payment_res: response,
        id: item_data.AD_ID
      };
      console.log(response);
      /* axios.post('/api/TB_PAYMENT/', obj).then((res) => {
        getCampaign();
        if (res.data.code === 200) {
          axios.post('/api/TB_NOTIFICATION/sendKakaoNotification', item_data).then((res2) => {
            if (res2.data.code === 200) {
              console.log(res2);
            } else if (res2.data.code === 401) {
              console.log(res2);
            }
          });
        } else if (res.data.code === 401) {
          console.log(res);
        } else {
          console.log(res);
        }
      }).catch(error => (error)); */
    }
  }

  function paymentStart() {
    const { IMP } = window;
    IMP.init(userCode);
    IMP.request_pay(dataKCP, callback);
  }

  function testButton() {
    axios.post('/api/TB_NOTIFICATION/sendNotification', item_data).then((res2) => {
      if (res2.data.code === 200) {
        console.log(res2);
      } else if (res2.data.code === 401) {
        console.log(res2);
      }
    });
  }

  return (
    <Box my="35px" m="0 auto" p="11px 27px" width="100px" fontSize="18px" color="#ffffff" bgcolor={bgColor} borderRadius="30px" css={{ cursor: 'pointer' }} onClick={paymentStart}>결제</Box>
  );
}

export default Payment;
