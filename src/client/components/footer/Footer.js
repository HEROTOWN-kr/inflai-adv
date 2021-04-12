import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import Logo from '../../img/logo_color.png';
import StyledImage from '../../containers/StyledImage';

function Footer() {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box py={isMD ? 6 : 2} className="footer">
      <Box px={2} className="footer-container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} className="footer-logo">
            <StyledImage width={isMD ? '80px' : '65px'} src={Logo} />
          </Grid>
          <Grid item xs={12} sm={9} className="footer-text">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className="rules">
                  <Link
                    className="footer-link"
                    to="/Policy/Service"
                  >
                    이용약관
                  </Link>
                  {' | '}
                  <Link
                    className="footer-link"
                    to="/Policy/Privacy"
                  >
                    개인정보 처리방침
                  </Link>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="info">
                  <Box color="#000">(주)대가들이사는마을</Box>
                  <div>대표 : 김무성 | 주소 : 경기도 고양시 일산동구 백마로 195 엠시티 섹션동 4층 4003호</div>
                  <div>대표전화 : 1522-7947  | Mail : myfna@naver.com</div>
                  <div>사업자번호 : 695-81-00452</div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>Copyright © INFLAi. All Rights Reserved.</div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Footer;
