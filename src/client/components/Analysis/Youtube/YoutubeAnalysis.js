import React, { Fragment, useEffect, useState } from 'react';
import {
  Backdrop, Box, CircularProgress, Grid, IconButton, Tooltip, Typography
} from '@material-ui/core';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import {
  Cancel, HelpOutline, NotificationsNone, RemoveRedEyeOutlined, ThumbUpOutlined
} from '@material-ui/icons';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import defaultAccountImage from '../../../img/default_account_image.png';
import CategoryPieChart from '../CategoryPieChart';
import BarComponent from '../BarComponent';
import LocationPart from './LocationPart';
import GenderAgePart from './GenderAgePart';
import PieChartApex from '../PieChartApex';
import HelpTooltip from '../HelpTooltip';

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
  avatar: { borderRadius: '50%' },
  reportText: {
    color: '#000',
    fontSize: '16px',
    fontFamily: 'Noto Sans KR, sans-serif',
    fontWeight: 500,
    lineHeight: 1.57
  },
  textAndIcon: {
    display: 'flex',
    // alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: '14px',
    color: '#000'
  },
  tooltipIcon: {
    color: '#8C3FFF',
    marginLeft: '5px',
    marginTop: '5px'
  },
  tooltip: {
    fontSize: 12
  },
}));

const tooltipContent = {
  content_primary: '유튜브 채널 최근 10개의 동영상을 인공지능으로 분석하여 3862개의 카테고리로 분류한 결과',
  content_second: '유튜브 채널 최근 10개의 동영상을 인공지능으로 분석하여 26개의 카테고리로 분류한 결과',
  title_prediction: '유튜브 채널 최근 10개의 동영상의 제목을 인공지능으로 분석하여 26개의 카테고리로 분류한 결과',
  comment_prediction: '유튜브 채널 최근 10개의 동영상의 댓글을 인공지능으로 분석하여 긍정적와 부정적 카테고리로 분류한 결과',
};

const defaultValues = {
  comment_prediction: [],
  comment_prediction_labels: [],
  comment_prediction_series: [],
  comment_prediction_colors: [],
  title_prediction: [],
  title_prediction_labels: [],
  title_prediction_series: [],
  title_prediction_colors: [],
  content_primary_prediction: [],
  content_primary_labels: [],
  content_primary_series: [],
  content_primary_colors: [],
  content_second_prediction: [],
  content_second_labels: [],
  content_second_series: [],
  content_second_colors: [],
  maxTypeCategory: '',
  maxTypeCategoryValue: 0,
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
    likesToComments: '',
    abilityType: '',
    dislikes: 0,
    estimatedMinutesWatched: 0,
    averageViewDuration: 0
  },
  mostWatchedVideos: {
  },
  timeBasedStats: {
    day: [],
    views: [],
    viewsMax: 0,
    subscribersGainedSum: 0,
    estimatedMinutesWatched: [],
    averageViewDuration: [],
    averageViewPercentage: [],
    subscribersGained: []
  },
  ageDemographic: {
    labels: [],
    count: [],
    maxAgeValue: 0,
    maxAgeType: ''
  },
  watchTimeByCountry: {
    countryData: [],
    countryLineData: {
      labels: [],
      data: [],
      backgroundColor: [],
      borderColor: []
    },
    maxCountry: {
      id: '',
      name: '',
      value: 0,
      color: '#ff5252'
    }
  },
  genderDemographic: {
    chart: [],
    maxGenderValue: 0,
    maxGender: ''
  }
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
      setProcess(false);
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
    getYoutubeInfo();
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
            <Box mt={3} p={3} bgcolor="#F2F2F2">
              <Box className={classes.reportText}>
                { `${youtubeInfo.channel_info.Name}는 ${youtubeInfo.channel_info.Number_of_subscribe}명의 구독자를 보유하고 있으며 이는 ${youtubeInfo.channel_info.influencerType} 입니다.
                인플루언서 영향력을 나타내는 인플라이지수는 105점이며 최근 30일간 채널 영상 최대 조회수는 ${youtubeAnalytics.timeBasedStats.viewsMax}이고 신규 구독자 수는 ${youtubeAnalytics.timeBasedStats.subscribersGainedSum}입니다.
                ${youtubeAnalytics.basicStats.likes}건의 좋아요수와 ${youtubeAnalytics.basicStats.comments}건의 댓글을 받아 공감능력은 ${youtubeAnalytics.basicStats.likesToComments}%(${youtubeAnalytics.basicStats.abilityType}) 상태입니다.
                보유팔로워의 ${youtubeAnalytics.watchTimeByCountry.maxCountry.value}명은 ${youtubeAnalytics.watchTimeByCountry.maxCountry.name}인으로 구성되어있으며
                ${youtubeAnalytics.ageDemographic.maxAgeType}대(${youtubeAnalytics.ageDemographic.maxAgeValue}%) ${youtubeAnalytics.genderDemographic.maxGender}(${youtubeAnalytics.genderDemographic.maxGenderValue}%)걸쳐서 가장 큰 영향력을 발휘하게 됩니다.
                게시물 인공지능분석 결과 가장 높은 비율인 ${youtubeInfo.maxTypeCategoryValue}%를 ${youtubeInfo.maxTypeCategory}가 차지하고 있어서
                ${youtubeInfo.maxTypeCategory} 쪽에 영향력 지수가 크다고 보여집니다.
                (제일 높은 이미지의 %가 30% 이하이면 ... 특별한 카테고리에 영향력이 없다고 보여집니다.)` }
              </Box>
            </Box>
            <Box my={3}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box p={3} bgcolor="#FFF">
                    <Box className={classes.textAndIcon}>
                      <span className={classes.boxTitle}>상위 카테고리 분석 결과</span>
                      <Tooltip title={tooltipContent.content_second} placement="top-start" classes={{ tooltip: classes.tooltip }}>
                        <HelpOutline fontSize="small" classes={{ root: classes.tooltipIcon }} />
                      </Tooltip>
                    </Box>
                    {/* <CategoryPieChart detectData={youtubeInfo.content_second_prediction} process={process} /> */}
                    <PieChartApex series={youtubeInfo.content_second_series} colors={youtubeInfo.content_second_colors} labels={youtubeInfo.content_second_labels} />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box p={3} bgcolor="#FFF">
                    <Box className={classes.textAndIcon}>
                      <span className={classes.boxTitle}>하위 카테고리 분석 결과</span>
                      <Tooltip title={tooltipContent.content_primary} placement="top-start" classes={{ tooltip: classes.tooltip }}>
                        <HelpOutline fontSize="small" classes={{ root: classes.tooltipIcon }} />
                      </Tooltip>
                    </Box>
                    {/* <Box className={classes.boxTitle}>하위 카테고리 분석 결과</Box> */}
                    {/* <CategoryPieChart detectData={youtubeInfo.content_primary_prediction} process={process} /> */}
                    <PieChartApex series={youtubeInfo.content_primary_series} colors={youtubeInfo.content_primary_colors} labels={youtubeInfo.content_primary_labels} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box p={3} bgcolor="#FFF">
                  <Box className={classes.textAndIcon}>
                    <span className={classes.boxTitle}>비디오 제목 분석 결과</span>
                    <Tooltip title={tooltipContent.title_prediction} placement="top-start" classes={{ tooltip: classes.tooltip }}>
                      <HelpOutline fontSize="small" classes={{ root: classes.tooltipIcon }} />
                    </Tooltip>
                  </Box>
                  {/* <CategoryPieChart detectData={youtubeInfo.title_prediction} process={process} /> */}
                  <PieChartApex series={youtubeInfo.title_prediction_series} colors={youtubeInfo.title_prediction_colors} labels={youtubeInfo.title_prediction_labels} />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box p={3} bgcolor="#FFF">
                  <Box className={classes.textAndIcon}>
                    <span className={classes.boxTitle}>비디오 댓글 평가</span>
                    <Tooltip title={tooltipContent.comment_prediction} placement="top-start" classes={{ tooltip: classes.tooltip }}>
                      <HelpOutline fontSize="small" classes={{ root: classes.tooltipIcon }} />
                    </Tooltip>
                  </Box>
                  {/* <CategoryPieChart detectData={youtubeInfo.comment_prediction} process={process} /> */}
                  <PieChartApex series={youtubeInfo.comment_prediction_series} colors={youtubeInfo.comment_prediction_colors} labels={youtubeInfo.comment_prediction_labels} />
                </Box>
              </Grid>
            </Grid>
            <Box my={3}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box p={3} bgcolor="#FFF">
                    <Box className={classes.boxTitle}>조회수와 댓글수 비교</Box>
                    <Line height={150} data={lineData} />
                  </Box>
                  <Box p={2} bgcolor="#F2F2F2">
                    <Box className={classes.reportText}>
                      최근 10개의 동영상의 데이터를 가지고 조회수와 댓글수 업로드 날짜에 맞아서 출력된 데이터입니다
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box p={3} bgcolor="#FFF">
                    <Box className={classes.boxTitle}>좋아요수와 싫어요수 비교</Box>
                    <BarComponent height={150} data={likeDislikeData} options={barOptions} />
                  </Box>
                  <Box p={2} bgcolor="#F2F2F2">
                    <Box className={classes.reportText}>
                      최근 10개의 동영상의 데이터를 가지고 좋아요수와 싫어요수 업로드 날짜에 맞아서 출력된 데이터입니다
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box p={3} bgcolor="#FFF">
                  <Box className={classes.boxTitle}>신규 구독자 수</Box>
                  <BarComponent height={150} data={subscribersGainedData} options={barOptions} />
                </Box>
                <Box p={2} bgcolor="#F2F2F2">
                  <Box className={classes.reportText}>
                    최근 30일 동안 유튜브 채널의 신규 구독자수를 날짜 별로 보실 수 있습니다.
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box p={3} bgcolor="#FFF">
                  <Box className={classes.boxTitle}>영상 조회수</Box>
                  <Line height={150} data={viewsData} />
                </Box>
                <Box p={2} bgcolor="#F2F2F2">
                  <Box className={classes.reportText}>
                    최근 30일 동안 유튜브 채널의 모두 영상의 조회수를 날짜 별로 보실 수 있습니다.
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box my={3}>
              <LocationPart classes={classes} data={youtubeAnalytics.watchTimeByCountry} process={process} />
            </Box>
            <GenderAgePart classes={classes} genderDemographic={youtubeAnalytics.genderDemographic.chart} ageDemographic={youtubeAnalytics.ageDemographic} process={process} />
          </Box>
        </Box>
      )}

    </Fragment>
  );
}

export default YoutubeAnalysis;
