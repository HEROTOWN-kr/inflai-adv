import {
  Box, createMuiTheme, Grid, useMediaQuery, useTheme, ThemeProvider, Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import StyledImage from '../../containers/StyledImage';
import defaultAccountImage from '../../img/default_account_image.png';
import styleTheme from './AnalysisTheme';
import analysisStyles from './AnalysisStyle';

function AnalysisComponent() {
  const [instaData, setInstaData] = useState({});

  const classes = analysisStyles();
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <ThemeProvider theme={styleTheme}>
      <Box px={2} py={2} maxWidth="1263px" m="0 auto">
        <Grid container alignItems="center">
          <Grid item>
            <Box width="350px">
              <Grid container alignItems="center">
                <Grid item>
                  <Box>
                    <StyledImage width={isSM ? '110px' : '80px'} height={isSM ? '110px' : '80px'} borderRadius="100%" src={instaData.INS_PROFILE_IMG || defaultAccountImage} />
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box ml={2}>
                    <Typography variant="subtitle1">sal_gungli</Typography>
                    <Typography variant="subtitle2">상궁리</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs>
            <Grid container>
              <Grid item>
                <Box width="120px" textAlign="center">
                  <Typography variant="subtitle2">
                          게시물
                  </Typography>
                  <Typography variant="subtitle2">
                          1596
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box width="120px" textAlign="center">
                  <Typography variant="subtitle2">
                          팔로워
                  </Typography>
                  <Typography variant="subtitle2">
                          1596
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box width="120px" textAlign="center">
                  <Typography variant="subtitle2">
                          팔로잉
                  </Typography>
                  <Typography variant="subtitle2">
                          1596
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <Typography>계정 정보 간단 요약</Typography>
        </Box>
        <Box>
          인플라이 스코어
        </Box>
      </Box>

    </ThemeProvider>

  );
}

export default AnalysisComponent;
