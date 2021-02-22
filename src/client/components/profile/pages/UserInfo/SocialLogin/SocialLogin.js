import React from 'react';
import { Box, Grid } from '@material-ui/core';
import StyledText from '../../../../../containers/StyledText';
import LabelComponent from '../LabelComponent';
import SocialNaver from './SocialNaver';
import SocialKakao from './SocialKakao';

function SocialLogin() {
  return (
    <Box py={4}>
      <Box mb={4}>
        <StyledText fontSize="19px" fontWeight="600">간편 로그인</StyledText>
      </Box>
      <Box mb={2}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <LabelComponent labelName="네이버" />
          </Grid>
          <Grid item xs={12} md>
            <SocialNaver />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <LabelComponent labelName="카카오" />
          </Grid>
          <Grid item xs={12} md>
            <SocialKakao />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SocialLogin;
