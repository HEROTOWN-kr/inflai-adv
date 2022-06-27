import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Button, colors, Grid, InputAdornment, makeStyles, OutlinedInput, Typography, useMediaQuery, useTheme,
} from '@material-ui/core';
import {
  Assessment, ChatBubbleOutline,
  CheckBoxOutlined, FavoriteBorder,
  ImageOutlined,
  Instagram,
  PieChartOutlined,
  VisibilityOutlined
} from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Slider from 'react-slick';
import { Line } from 'react-chartjs-2';
import commonStyles from '../../../lib/commonStyles';
import defaultAccountImage from '../../../img/default_account_image.png';
import defaultImage from '../../../img/notFound400_316.png';
import PieChartApex from '../PieChartApex';
import WordCloud from '../WordCloud';
import AuthContext from '../../../context/AuthContext';

const useStyles = makeStyles(theme => ({
  imgFile: {
    width: '100%',
    height: '210px',
    objectFit: 'cover',
    objectPosition: '50% 50%',
  },
  imgFileMedia: {
    width: '200px',
    height: '200px',
    borderRadius: '7px',
    objectFit: 'cover',
    objectPosition: '50% 50%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 'auto',
    }
  },
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical'
  },
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
    position: 'relative',
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
  boxIcon: {
    position: 'absolute',
    top: 17,
    right: 15
  },
  bgBlue: { background: 'linear-gradient(45deg, #4099ff, #73b4ff)' },
  bgGreen: { background: 'linear-gradient(45deg, #2ed8b6, #59e0c5)' },
  bgOrange: { background: 'linear-gradient(45deg, #FFB64D, #ffcb80)' },
  bgRed: { background: 'linear-gradient(45deg, #FF5370, #ff869a)' },
  bgGreenBlue: { background: 'linear-gradient(45deg, #2e65d8, #59e0c5)' },
  avatar: { borderRadius: '50%' },
  imgSlider: {
    position: 'relative',
    '&::before': {
      zIndex: '1',
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0px',
      display: 'block',
      width: '40px',
      height: '100%',
      background:
          'linear-gradient(90deg,rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)'
    },
    '&::after': {
      zIndex: '1',
      content: '""',
      position: 'absolute',
      top: '0',
      right: '0px',
      display: 'block',
      width: '40px',
      height: '100%',
      background:
          'linear-gradient(90deg,rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)'
    }
  },
}));

const settings = {
  arrows: false,
  infinite: true,
  speed: 15000,
  slidesToShow: 5,
  slidesToScroll: 10,
  autoplay: true,
  autoplaySpeed: 0,
  focusOnSelect: false,
  pauseOnHover: false,
  pauseOnDotsHover: false,
  pauseOnFocus: false,
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2, slidesToScroll: 1, arrows: false, dots: true
      }
    }
  ]
};

const instaDefaultValues = {
  pic: '',
  lastPosts: [],
  analyzeInfo: {
    labelInfo: {
      labels: [],
      scores: [],
      detectColors: [],
      categoryMax: {}
    },
    objectInfo: {
      labels: [],
      scores: [],
      detectColors: [],
    },
  },
  likes: [],
  comments: [],
  ability: '',
  abilityType: '',
};

const defaultDataSet = {
  label: '좋아요수',
  fill: true,
  lineTension: 0.5,
  backgroundColor: 'rgba(231, 251, 246, 0.6)',
  borderColor: 'rgba(24, 219, 168, 1)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderWidth: 4,
  borderJoinStyle: 'miter',
  pointBorderColor: 'white',
  pointBackgroundColor: 'rgba(24, 219, 168, 1)',
  pointBorderWidth: 1,
  pointHoverRadius: 10,
  pointHoverBackgroundColor: 'rgba(24, 219, 168, 1)',
  pointHoverBorderColor: 'rgba(24, 219, 168, 1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
};

const defaultOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};

const commentsDataSet = {
  ...defaultDataSet,
  label: '댓글수',
  backgroundColor: 'rgba(244, 236, 255, 0.6)',
  borderColor: 'rgba(144, 71, 255, 1)',
  pointBackgroundColor: 'rgba(144, 71, 255, 1)',
  pointHoverBackgroundColor: 'rgba(144, 71, 255, 1)',
  pointHoverBorderColor: 'rgba(144, 71, 255, 1)',
};

const commentsLikesDataSet = [
  {
    ...defaultDataSet,
    label: '좋아요수',
    fill: false,
    lineTension: 0,
    borderWidth: 5,
    pointRadius: 7,
  },
  {
    ...defaultDataSet,
    label: '댓글수',
    fill: false,
    backgroundColor: 'rgba(144, 71, 255, 1)',
    borderColor: 'rgba(144, 71, 255, 1)',
    pointBackgroundColor: 'rgba(144, 71, 255, 1)',
    pointHoverBackgroundColor: 'rgba(144, 71, 255, 1)',
    pointHoverBorderColor: 'rgba(144, 71, 255, 1)',
    lineTension: 0,
    borderWidth: 5,
    pointRadius: 7,
  },
];

const likes = { datasets: [defaultDataSet] };
const likesOpt = { ...defaultOptions };

const comments = { datasets: [commentsDataSet] };
const commentsOpt = { ...defaultOptions };

const commentsLikes = { datasets: [...commentsLikesDataSet] };

function InstagramAnalytics(props) {
  const [inputValue, setInputValue] = useState('timatiofficial');
  const [userName, setUserName] = useState('');
  const [instaData, setInstaData] = useState(instaDefaultValues);
  const classes = useStyles();
  const { setLoading } = useContext(AuthContext);

  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  function callServerApi() {
    setLoading(true);
    axios.get('/api/testRoute/test', {
      params: { username: userName }
    }).then((res) => {
      const { data } = res;
      setInstaData(data);
      setLoading(false);
    }).catch((err) => {
      alert(err.response.data.message);
      setLoading(false);
    });
  }

  function getInstaData() {
    if (!inputValue) {
      enqueueSnackbar('계정 이름을 입력해주세요', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
      return;
    }
    setUserName(inputValue);
    setInputValue('');
  }

  useEffect(() => {
    if (userName) callServerApi();
  }, [userName]);

  const lastMedia = instaData.lastPosts.slice(0, 4);

  // line.labels = Array.from({ length: likes.length }, (_, i) => i + 1);

  likes.datasets[0].data = instaData.likes;
  likes.labels = Array.from({ length: instaData.likes.length }, (_, i) => i + 1);

  comments.datasets[0].data = instaData.comments;
  comments.labels = Array.from({ length: instaData.comments.length }, (_, i) => i + 1);

  console.log(commentsLikes.datasets);
  commentsLikes.datasets[0].data = instaData.likes;
  commentsLikes.datasets[1].data = instaData.comments;
  commentsLikes.labels = Array.from({ length: instaData.likes.length }, (_, i) => i + 1);


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
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
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
                  <img width={70} height={70} className={classes.avatar} src={instaData.mainPicUrl || defaultAccountImage} alt="noImage" />
                </Grid>
                <Grid item xs>
                  <Box
                    maxWidth="300px"
                    ml={2}
                    fontSize={23}
                    fontWeight="bold"
                  >
                    <Box>{instaData.name}</Box>
                    <Box>{userName}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box className={`${classes.box} ${classes.bgGreen}`}>
              <Box mb={{ xs: '2px', md: 1 }}>
                        게시물
              </Box>
              <Grid container justify="space-between" alignItems="center">
                {/* {isMD ? (
                  <Grid item>
                    <ImageOutlined fontSize="large" />
                  </Grid>
                ) : null} */}
                <Grid item>
                  <Box fontSize={{ xs: 23, md: 28 }} fontWeight="bold">
                    {instaData?.posts?.toLocaleString('en')}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box className={`${classes.box} ${classes.bgOrange}`}>
              <Box mb={{ xs: '2px', md: 1 }}>
                        팔로워
              </Box>
              <Box fontSize={{ xs: 23, md: 28 }} fontWeight="bold">
                {instaData?.followers?.toLocaleString('en')}
              </Box>
              {/* <VisibilityOutlined fontSize="large" className={classes.boxIcon} /> */}

              {/* <Grid container justify="space-between" alignItems="center">
                {isMD ? (
                  <Grid item>
                    <VisibilityOutlined fontSize="large" />
                  </Grid>
                ) : null}
                <Grid item />
              </Grid> */}
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box className={`${classes.box} ${classes.bgRed}`}>
              <Box mb={1}>
                        팔로잉
              </Box>
              <Grid container justify="space-between" alignItems="center">
                {/* {isMD ? (
                  <Grid item>
                    <CheckBoxOutlined fontSize="large" />
                  </Grid>
                ) : null} */}
                <Grid item>
                  <Box fontSize={{ xs: 23, md: 28 }} fontWeight="bold">
                    {instaData?.following?.toLocaleString('en')}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Box className={`${classes.box} ${classes.bgGreenBlue}`}>
              <Box mb={1}>
                카테고리
              </Box>
              <Grid container justify="space-between" alignItems="center">
                {/* {isMD ? (
                  <Grid item>
                    <PieChartOutlined fontSize="large" />
                  </Grid>
                ) : null} */}
                <Grid item>
                  <Box fontSize={{ xs: 23, md: 28 }} fontWeight="bold">
                    {/* {imgDetectMax.description} */}
                    {instaData?.analyzeInfo?.labelInfo?.categoryMax?.description || ''}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box className={`${classes.box} ${classes.bgRed}`}>
              <Box mb={{ xs: '2px', md: 1 }}>
                소통고감 지수
              </Box>
              <Box fontSize={{ xs: 23, md: 28 }} fontWeight="bold">
                {`${instaData.ability}%(${instaData.abilityType})`}
              </Box>
            </Box>

          </Grid>

          <Grid item xs={6} md={3}>
            <Box className={`${classes.box} ${classes.bgOrange}`}>
              <Box mb={{ xs: '2px', md: 1 }}>
                인플루언서 카테고리
              </Box>
              <Box fontSize={{ xs: 23, md: 28 }} fontWeight="bold">
                {instaData.influencerType}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        {...commonStyles.whiteBlock}
        mt={2}
        p={2}
      >
        <Typography variant="h6">
          포스팅 분석
          <span>{`(${instaData.name}님은 주로 이런 포스팅을 최근에 하고 있습니다)`}</span>
        </Typography>

        <Box className={classes.imgSlider}>
          <Box mt={2}>
            <Slider {...settings}>
              {instaData.lastPosts.map((item, index) => (
                <Box key={index} width="100%">
                  <Box margin="0 8px">
                    <img className={classes.imgFile} src={item.s3Url || defaultImage} />
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>

      </Box>

      <Box
        {...commonStyles.whiteBlock}
        mt={2}
        p={2}
      >
        <Typography variant="h6" paragraph>계정 이미지 인공지능 분석</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <PieChartApex series={instaData.analyzeInfo?.labelInfo?.scores} colors={instaData.analyzeInfo?.labelInfo?.colors} labels={instaData.analyzeInfo?.labelInfo?.labels} />
          </Grid>
          <Grid item xs={12} md={6}>
            <PieChartApex series={instaData.analyzeInfo?.objectInfo?.scores} colors={instaData.analyzeInfo?.objectInfo?.colors} labels={instaData.analyzeInfo?.objectInfo?.labels} />
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}>
        <Grid container spacing={2} alignItems="center">
          {lastMedia.map(item => (
            <Grid item xs={12} md={6}>
              <Box {...commonStyles.whiteBlock} p={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md="auto">
                    <img className={classes.imgFileMedia} src={item?.s3Url || defaultImage} />
                  </Grid>
                  <Grid item xs={12} md zeroMinWidth>
                    <Grid
                      container
                      direction="column"
                      style={{ height: '100%', boxSizing: 'border-box' }}
                    >
                      <Grid item xs>
                        <Typography variant="body1" className={classes.multiLineEllipsis}>
                          {item?.caption}
                        </Typography>
                      </Grid>

                      <Grid item xs="auto">
                        <Grid container justifyContent="center" spacing={2}>
                          <Grid item>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                              }}
                            >
                              <FavoriteBorder />
                              <span style={{ marginLeft: '6px' }}>{item?.likes?.toLocaleString('en')}</span>
                            </div>
                          </Grid>
                          <Grid item>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                              }}
                            >
                              <ChatBubbleOutline />
                              <span style={{ marginLeft: '6px' }}>{item?.comments?.toLocaleString('en')}</span>
                            </div>
                          </Grid>
                        </Grid>

                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}

        </Grid>
      </Box>


      <Box mt={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box {...commonStyles.whiteBlock} p={2}>
              <Line height={150} data={likes} options={likesOpt} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box {...commonStyles.whiteBlock} p={2}>
              <Line height={150} data={comments} options={commentsOpt} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box {...commonStyles.whiteBlock} p={2}>
              <Line height={150} data={commentsLikes} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box {...commonStyles.whiteBlock} height="250px" p={2}>
              <WordCloud instaData={instaData} />
            </Box>
          </Grid>
        </Grid>
      </Box>


      {/* <Box
        {...commonStyles.whiteBlock}
        mt={2}
        p={2}
      >
        <pre>
          {JSON.stringify(instaData, null, 2)}
        </pre>
      </Box> */}
    </Box>
  );
}

export default InstagramAnalytics;
