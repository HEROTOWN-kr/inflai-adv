import React, { useState } from 'react';
import {
  Box, Button, colors, Grid, InputAdornment, makeStyles, OutlinedInput, useMediaQuery, useTheme,
} from '@material-ui/core';
import {
  Assessment,
  CheckBoxOutlined,
  ImageOutlined,
  Instagram,
  PieChartOutlined,
  VisibilityOutlined
} from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import commonStyles from '../../../lib/commonStyles';
import defaultAccountImage from '../../../img/default_account_image.png';

const useStyles = makeStyles(theme => ({
  input: {
    padding: '15px 14px 15px 0'
  },
  colorViolet: {
    color: '#6E0FFF'
  },
  colorGrey: {
    color: '#00000080'
  },
  colorGrey2: {
    color: '#00000033'
  },
  bold: {
    fontWeight: '500',
  },
  bold600: {
    fontWeight: '600',
  },
  generalStats: {
    fontWeight: '900',
    fontSize: '30px',
    textAlign: 'center'
  },
  hoverRed: {
    '&:hover': {
      cursor: 'pointer',
      color: 'red'
    }
  },
  textAndIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: '14px',
    color: '#000'
  },
  tooltip: {
    fontSize: 12
  },
  tooltipIcon: {
    color: 'grey',
    marginLeft: '5px'
  },
  orange: {
    backgroundColor: colors.orange[500]
  },
  lemon: {
    backgroundColor: 'rgb(180, 240, 70)'
  },
  purple: {
    backgroundColor: '#6E0FFF'
  },
  lightGreen: {
    backgroundColor: '#18DBA8'
  },
  yellow: {
    backgroundColor: '#FFE600'
  },
  grey: {
    backgroundColor: '#00000017'
  },
  box: {
    padding: '15px 25px',
    color: '#fff',
    borderRadius: '5px',
    boxSizing: 'border-box',
    height: '100%',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 0 25px -5px #9e9c9e',
    },
    [theme.breakpoints.down('md')]: {
      padding: '12px 16px',
    }
  },
  bgBlue: { background: 'linear-gradient(45deg, #4099ff, #73b4ff)' },
  bgGreen: { background: 'linear-gradient(45deg, #2ed8b6, #59e0c5)' },
  bgOrange: { background: 'linear-gradient(45deg, #FFB64D, #ffcb80)' },
  bgRed: { background: 'linear-gradient(45deg, #FF5370, #ff869a)' },
  bgGreenBlue: { background: 'linear-gradient(45deg, #2e65d8, #59e0c5)' },
  avatar: { borderRadius: '50%' },
}));

function InstagramAnalytics(props) {
  const [userName, setUserName] = useState(null);
  const [instaData, setInstaData] = useState({});
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  function getInstaData() {
    if (!userName) {
      enqueueSnackbar('계정 이름을 입력해주세요', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
      return;
    }

    axios.get('/api/testRoute/test', {
      params: { username: userName }
    }).then((res) => {
      const { profile } = res.data;
      setInstaData(profile);
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  return (
    <Box maxWidth={1200} py={5} mx="auto">
      <Box
        {...commonStyles.whiteBlock}
        mb={2}
        p={2}
      >
        <Grid container spacing={1} justify="center">
          <Grid item>
            <form noValidate autoComplete="off">
              <OutlinedInput
                placeholder="ex) herotown_kr"
                startAdornment={(
                  <InputAdornment position="start">
                    <Instagram />
                  </InputAdornment>
                )}
                endAdornment={(
                  <InputAdornment position="end">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={getInstaData}
                    >
                        분석
                    </Button>
                  </InputAdornment>
                )}
                onChange={e => setUserName(e.target.value)}
                classes={{ input: classes.input }}
              />
            </form>
          </Grid>
          <Grid item />
        </Grid>
      </Box>

      <Box {...commonStyles.whiteBlock} p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box
              className={`${classes.box} ${classes.bgBlue} ${classes.youtubeLink}`}
            >
              <Grid container alignItems="center" style={{ height: '100%' }}>
                <Grid item>
                  <img width={70} height={70} className={classes.avatar} src={instaData.INS_PROFILE_IMG || defaultAccountImage} alt="noImage" />
                </Grid>
                <Grid item xs>
                  <Box
                    maxWidth="300px"
                    ml={2}
                    fontSize={23}
                    fontWeight="bold"
                  >
                    <Box>{userName}</Box>
                    <Box>{instaData.INS_USERNAME}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Box className={`${classes.box} ${classes.bgGreen}`}>
              <Box mb={{ xs: '2px', md: 1 }}>
                        게시물
              </Box>
              <Grid container justify="space-between" alignItems="center">
                {isMD ? (
                  <Grid item>
                    <ImageOutlined fontSize="large" />
                  </Grid>
                ) : null}
                <Grid item>
                  <Box fontSize={{ xs: 23, md: 28 }} fontWeight="bold">
                    {instaData.INS_MEDIA_CNT}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Box className={`${classes.box} ${classes.bgOrange}`}>
              <Box mb={{ xs: '2px', md: 1 }}>
                        팔로워
              </Box>
              <Grid container justify="space-between" alignItems="center">
                {isMD ? (
                  <Grid item>
                    <VisibilityOutlined fontSize="large" />
                  </Grid>
                ) : null}
                <Grid item>
                  <Box fontSize={{ xs: 23, md: 28 }} fontWeight="bold">
                    {instaData.INS_FLWR}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Box className={`${classes.box} ${classes.bgRed}`}>
              <Box mb={1}>
                        팔로잉
              </Box>
              <Grid container justify="space-between" alignItems="center">
                {isMD ? (
                  <Grid item>
                    <CheckBoxOutlined fontSize="large" />
                  </Grid>
                ) : null}
                <Grid item>
                  <Box fontSize={{ xs: 23, md: 28 }} fontWeight="bold">
                    {instaData.INS_FLW}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box className={`${classes.box} ${classes.bgGreenBlue}`}>
              <Box mb={1}>
                        카테고리
              </Box>
              <Grid container justify="space-between" alignItems="center">
                {isMD ? (
                  <Grid item>
                    <PieChartOutlined fontSize="large" />
                  </Grid>
                ) : null}
                <Grid item>
                  <Box fontSize={{ xs: 23, md: 28 }} fontWeight="bold">
                    {/* {imgDetectMax.description} */}
                      test
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        {...commonStyles.whiteBlock}
        mt={2}
        p={2}
      >
        <pre>
          {JSON.stringify(instaData, null, 2)}
        </pre>
      </Box>

    </Box>
  );
}

export default InstagramAnalytics;
