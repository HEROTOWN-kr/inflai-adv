import React, { Fragment, useEffect, useState } from 'react';
import {
  Backdrop, Box, CircularProgress, Grid, IconButton, Typography
} from '@material-ui/core';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import {
  Cancel, NotificationsNone, RemoveRedEyeOutlined, ThumbUpOutlined
} from '@material-ui/icons';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import defaultAccountImage from '../../../img/default_account_image.png';
import CategoryPieChart from '../CategoryPieChart';
import BarComponent from '../BarComponent';
import LocationPart from './LocationPart';
import GenderAgePart from './GenderAgePart';

const useStyles = makeStyles(theme => ({
  box: {
    padding: '15px 25px',
    color: '#fff',
    borderRadius: '5px',
    boxSizing: 'border-box',
    height: '100%',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 0 25px -5px #9e9c9e',
    }
  },
  boxTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '25px'
    // overflow: 'hidden',
    // whiteSpace: 'nowrap',
    // textOverflow: 'ellipsis',
  },
  circular: {
    color: '#fff',
  },
  youtubeLink: {
    cursor: 'pointer'
  },
  bgBlue: { background: 'linear-gradient(45deg, #4099ff, #73b4ff)' },
  bgGreen: { background: 'linear-gradient(45deg, #2ed8b6, #59e0c5)' },
  bgOrange: { background: 'linear-gradient(45deg, #FFB64D, #ffcb80)' },
  bgRed: { background: 'linear-gradient(45deg, #FF5370, #ff869a)' },
  avatar: { borderRadius: '50%' }
}));

const defaultValues = {
  comment_prediction: [],
  title_prediction: [],
  content_primary_prediction: [],
  content_second_prediction: [],
  videos_info: {
    Channel_id: {},
    Sequence: {},
    Name: {},
    Video_link: {},
    Number_of_comments: {},
    View_count: [],
    Comment_count: [],
    viewCountSum: 0,
    likeCounts: [],
    likeCountSum: 0,
    dislikeCounts: [],
    Youtube_average_rating: {},
    Upload_date: {},
    Upload_datetime: []
  },
  channel_info: {
    Name: '',
    Number_of_subscribe: '0'
  }
};

const defaultAnalyticsValues = {
  basicStats: {
    views: 0,
    comments: 0,
    likes: 0,
    dislikes: 0,
    estimatedMinutesWatched: 0,
    averageViewDuration: 0
  },
  mostWatchedVideos: {
  },
  timeBasedStats: {
    day: [],
    views: [],
    estimatedMinutesWatched: [],
    averageViewDuration: [],
    averageViewPercentage: [],
    subscribersGained: []
  },
  ageDemographic: {
    labels: [],
    count: []
  },
  watchTimeByCountry: {
    countryData: [],
    countryLineData: {
      labels: [],
      data: [],
      backgroundColor: [],
      borderColor: []
    }
  },
  genderDemographic: {}
};

const green = 'rgba(24, 219, 168, 1)';
const greenBg = 'rgba(231, 251, 246, 0.6)';
const violet = 'rgba(144, 71, 255, 1)';
const violetBg = 'rgba(244, 236, 255, 0.6)';
const testText = 'test';

function createDataSet(props) {
  const {
    color, label, data, fill, ...rest
  } = props;

  return {
    label: label || 'label',
    data: data || [12, 19, 22, 20, 15, 18],
    borderColor: color || green,
    pointBackgroundColor: color || green,
    pointHoverBackgroundColor: color || green,
    pointHoverBorderColor: color || green,
    fill: fill || false,
    lineTension: 0,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderWidth: 5,
    borderJoinStyle: 'miter',
    pointBorderColor: 'white',
    pointBorderWidth: 1,
    pointHoverRadius: 10,
    pointHoverBorderWidth: 2,
    pointRadius: 7,
    pointHitRadius: 10,
    ...rest
  };
}

const barOptions = {
  legend: {
    // display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: { display: false }
      }
    ],
    yAxes: [
      {
        gridLines: {
          drawBorder: false,
          drawTicks: false
        },
      }
    ]
  }
};

function LoadingPage() {
  const classes = useStyles();
  return (
    <Box bgcolor="#3CBFFC" height="calc(100vh - 32px)">
      <Grid container justify="center" alignItems="center" style={{ height: '100%', maxWidth: 'inherit' }}>
        <Grid item>
          <CircularProgress classes={{ colorPrimary: classes.circular }} />
        </Grid>
      </Grid>
    </Box>
  );
}

function YoutubeAnalysis(props) {
  const { id, closeDialog } = props;
  const [process, setProcess] = useState(false);
  const [youtubeInfo, setYoutubeInfo] = useState(defaultValues);
  const [youtubeAnalytics, setYoutubeAnalytics] = useState(defaultAnalyticsValues);
  const classes = useStyles();

  const viewLine = createDataSet({ color: green, label: '조회수', data: youtubeInfo.videos_info.View_count });
  const commentLine = createDataSet({ color: violet, label: '댓끌수', data: youtubeInfo.videos_info.Comment_count });
  const views = createDataSet({
    color: violet,
    label: '구독자수',
    data: youtubeAnalytics.timeBasedStats.views,
    fill: true,
    backgroundColor: violetBg,
    lineTension: 0.5,
    borderCapStyle: 'butt',
    pointRadius: 1,
    borderWidth: 4,
  });


  const lineData = {
    labels: youtubeInfo.videos_info.Upload_datetime,
    datasets: [viewLine, commentLine]
  };

  const likeDislikeData = {
    labels: youtubeInfo.videos_info.Upload_datetime,
    datasets: [{
      label: '좋아요수',
      data: youtubeInfo.videos_info.likeCounts,
      backgroundColor: green,
    },
    {
      label: '싫어요수',
      data: youtubeInfo.videos_info.dislikeCounts,
      backgroundColor: violet,
    }]
  };

  const subscribersGainedData = {
    labels: youtubeAnalytics.timeBasedStats.day,
    datasets: [{
      label: '새 구독자',
      data: youtubeAnalytics.timeBasedStats.subscribersGained,
      backgroundColor: green,
    }]
  };

  const viewsData = {
    labels: youtubeAnalytics.timeBasedStats.day,
    datasets: [views]
  };


  function getYoutubeInfo() {
    setProcess(true);
    axios.get('/api/TB_YOUTUBE/getYoutubeFile', {
      params: { id }
    }).then((res) => {
      const { data } = res.data;
      setYoutubeInfo(data);
    }).catch((err) => {
      setProcess(false);
      // alert(err.response.data.message);
    });
  }

  function getYoutubeAnalytics() {
    axios.get('/api/TB_YOUTUBE/getYoutubeAnalytics', {
      params: { id }
    }).then((res) => {
      const { data } = res;
      setYoutubeAnalytics(data);
      setProcess(false);
    }).catch((err) => {
      setProcess(false);
      // alert(err.response.data.message);
    });
  }

  useEffect(() => {
    // getYoutubeInfo();
    // getYoutubeAnalytics();
  }, []);

  return (
    <Fragment>
      { process ? (
        <LoadingPage />
      ) : (
        <Box bgcolor="#f6f7fb" p={2} position="relative">
          <Box position="absolute" top="0" right="0">
            <IconButton style={{ position: 'fixed', color: '#fff' }} onClick={closeDialog}>
              <Cancel />
            </IconButton>
          </Box>
          <Box maxWidth={1500} m="0 auto">
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Box
                  className={`${classes.box} ${classes.bgBlue} ${classes.youtubeLink}`}
                  onClick={() => window.open(`https://www.youtube.com/channel/${youtubeInfo.channel_info.Channel_id}`, '_blank')}
                >
                  <Grid container alignItems="center" style={{ height: '100%' }}>
                    <Grid item>
                      <img width={70} height={70} className={classes.avatar} src={youtubeInfo.channel_info.Avatar_url || defaultAccountImage} alt="noImage" />
                    </Grid>
                    <Grid item xs>
                      <Box
                        maxWidth="300px"
                        ml={2}
                        fontSize={25}
                        fontWeight="bold"
                      >
                        {youtubeInfo.channel_info.Name}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box className={`${classes.box} ${classes.bgGreen}`}>
                  <Box mb={1}>
                        구독자수
                  </Box>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <NotificationsNone fontSize="large" />
                    </Grid>
                    <Grid item>
                      <Box fontSize={28} fontWeight="bold">
                        {youtubeInfo.channel_info.Number_of_subscribe}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box className={`${classes.box} ${classes.bgOrange}`}>
                  <Box mb={1}>
                        최근 조회수(누적)
                  </Box>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <RemoveRedEyeOutlined fontSize="large" />
                    </Grid>
                    <Grid item>
                      <Box fontSize={28} fontWeight="bold">
                        {youtubeInfo.videos_info.viewCountSum}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box className={`${classes.box} ${classes.bgRed}`}>
                  <Box mb={1}>
                        최근 좋아요 수(누적)
                  </Box>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <ThumbUpOutlined fontSize="large" />
                    </Grid>
                    <Grid item>
                      <Box fontSize={28} fontWeight="bold">
                        {youtubeInfo.videos_info.likeCountSum}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Box mt={3} p={3} bgcolor="#FFF">
              <Typography variant="subtitle2">
                { `우당탕으니는 3120명의 구독자를 보유하고 있으며 이는 /influencerType/ 입니다.
                인플루언서 영향력을 나타내는 인플라이니수는 /influencerScore/
                점이며 최근 30일간 채널 영상 최대 조회수는 /maxWatchTime/이고 신규 구독자 수는 /newFollowersSum/입니다.
                /likeSum/건의 좋아요수와 /commentSum/건의 댓글을 받아 공감능력은 /likeToComment/%(/likeToCommentType/) 상태입니다.
                보유팔로워의 /countryMaxPercent/%가 /countryMaxName/인으로 구성되어있으며
                /influencerAgeMax/대 /influencerGenderMax/(/influencerGenderMaxPercent/)걸쳐서 가장 큰 영향력을 발휘하게 됩니다.
                게시물 인공지능분석 결과 가장 높은 비율인 /CategoryTypeMaxPercent/%를 (/CategoryTypeMaxName/)가 차지하고 있어서
                (/CategoryTypeMaxName/) 쪽에 영향력 지수가 크다고 보여집니다.
                (제일 높은 이미지의 %가 30% 이하이면 ... 특별한 카테고리에 영향력이 없다고 보여집니다.)
                ${testText}님은 ${testText}요일, 오후 ${testText}시 주로 게시물을 업로드 하고 있습니다.` }
              </Typography>
            </Box>
            <Box my={3}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box p={3} bgcolor="#FFF">
                    <Box className={classes.boxTitle}>하위 카테고리 분석 결과</Box>
                    <CategoryPieChart detectData={youtubeInfo.content_primary_prediction} process={process} />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box p={3} bgcolor="#FFF">
                    <Box className={classes.boxTitle}>상위 카테고리 분석 결과</Box>
                    <CategoryPieChart detectData={youtubeInfo.content_second_prediction} process={process} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box p={3} bgcolor="#FFF">
                  <Box className={classes.boxTitle}>비디오 제목 분석 결과</Box>
                  <CategoryPieChart detectData={youtubeInfo.title_prediction} process={process} />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box p={3} bgcolor="#FFF">
                  <Box className={classes.boxTitle}>비디오 댓글 평가</Box>
                  <CategoryPieChart detectData={youtubeInfo.comment_prediction} process={process} />
                </Box>
              </Grid>
            </Grid>
            <Box my={3}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box p={3} bgcolor="#FFF">
                    <Box className={classes.boxTitle}>최근 10개의 동영상 조회수</Box>
                    <Line height={150} data={lineData} />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box p={3} bgcolor="#FFF">
                    <Box className={classes.boxTitle}>최근 10개의 동영상 좋아요-싫어요 수</Box>
                    <BarComponent height={150} data={likeDislikeData} options={barOptions} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box p={3} bgcolor="#FFF">
                  <Box className={classes.boxTitle}>최근 30일 신규 구독자 수</Box>
                  <BarComponent height={150} data={subscribersGainedData} options={barOptions} />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box p={3} bgcolor="#FFF">
                  <Box className={classes.boxTitle}>최근 30일 채널 영상 조회수</Box>
                  <Line height={150} data={viewsData} />
                </Box>
              </Grid>
            </Grid>
            <Box my={3}>
              <LocationPart classes={classes} data={youtubeAnalytics.watchTimeByCountry} process={process} />
            </Box>
            <GenderAgePart classes={classes} genderDemographic={youtubeAnalytics.genderDemographic} ageDemographic={youtubeAnalytics.ageDemographic} process={process} />
          </Box>
        </Box>
      )}

    </Fragment>
  );
}

export default YoutubeAnalysis;
