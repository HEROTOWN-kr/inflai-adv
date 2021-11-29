import React, { useEffect, useState } from 'react';
import {
  Box, CircularProgress, Grid, makeStyles, Typography
} from '@material-ui/core';
import Slider from 'react-slick';
import axios from 'axios';
import defaultImage from '../../../img/notFound400_316.png';
import BarComponent from '../BarComponent';
import { DAY_OF_WEEK, HOURS } from '../../../lib/Сonstants';
import CategoryPieChart from '../CategoryPieChart';
import PieChartApex from '../PieChartApex';

const useStyles = makeStyles(theme => ({
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical'
  },
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
}));

const hourData = {
  labels: HOURS,
  datasets: [
    {
      label: '포스트수',
      backgroundColor: [
        '#EAEAEA', '#18DBA8', '#EAEAEA', '#EAEAEA', '#EAEAEA', '#EAEAEA'
      ],
      categoryPercentage: 0.5
    },
  ],
};
const hourOpt = {
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        categoryPercentage: 0.5,
        barPercentage: 0.6,
        gridLines: { display: false }
      }
    ],
    yAxes: [
      {
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        gridLines: {
          drawBorder: false,
          drawTicks: false
        },
      }
    ]
  }
};
const dayData = {
  labels: DAY_OF_WEEK,
  datasets: [
    {
      label: '포스트수',
      backgroundColor: [
        '#EAEAEA', '#18DBA8', '#EAEAEA', '#EAEAEA', '#EAEAEA', '#EAEAEA'
      ],
      categoryPercentage: 0.5
    },
  ],
};
const dayOpt = {
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        categoryPercentage: 0.5,
        barPercentage: 0.6,
        gridLines: { display: false }
      }
    ],
    yAxes: [
      {
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        gridLines: {
          drawBorder: false,
          drawTicks: false
        },
      }
    ]
  }
};

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true
      }
    }
  ]
};

function MediaCard(props) {
  const { post } = props;
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} md="auto">
        <img className={classes.imgFileMedia} src={post.media_url || defaultImage} />
        {/* <StyledImage borderRadius="7px" width="200px" height="200px" src={post.media_url || testImage} /> */}
      </Grid>
      <Grid item xs={12} md zeroMinWidth>
        <Box ml={{ xs: 0, md: 2 }} mt={{ xs: 2, md: 0 }} p={2} position="relative" boxSizing="border-box" height="100%" bgcolor="#FFF" borderRadius="7px">
          <Grid container style={{ height: '100%' }}>
            <Grid item xs={12}>
              <Typography variant="body1" className={classes.multiLineEllipsis}>
                {post.caption}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box bgcolor="#fafafa" p="14px" borderRadius="7px">
                <Grid container justify="space-between">
                  <Grid item xs={6}>
                    <Typography variant="body1" style={{ textAlign: 'center' }}>
                      {'좋아요수: '}
                      <span style={{ color: 'blue' }}>
                        {post.like_count}
                            개
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" style={{ textAlign: 'center' }}>
                      {'댓끌수: '}
                      <span style={{ color: 'blue' }}>
                        {post.comments_count}
                            개
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

function PostPart(props) {
  const [process, setProcess] = useState(false);
  const [labelData, setLabelData] = useState([]);
  const [objectData, setObjectData] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const { testImage, instaData, setImgDetectMac } = props;
  const {
    mediaData, postStats, lastPosts, maxLikesMedia, maxCmntMedia, INS_ID
  } = instaData;
  const {
    hourStats, dayStats, dayMaxIdx, hourMaxIdx, dayAvg, weekAvg
  } = postStats;
  const classes = useStyles();

  hourData.datasets[0].data = hourStats;
  hourData.datasets[0].backgroundColor = Array(hourStats.length).fill('#EAEAEA');
  hourData.datasets[0].backgroundColor[hourMaxIdx] = '#18DBA8';

  dayData.datasets[0].data = dayStats;
  dayData.datasets[0].backgroundColor = Array(dayStats.length).fill('#EAEAEA');
  dayData.datasets[0].backgroundColor[dayMaxIdx] = '#18DBA8';

  function getGoogleVisionData(INS_ID) {
    setProcess(true);
    const { host } = window.location;

    axios.get('/api/TB_INSTA/getGoogleDataCommon', {
      params: { INS_ID, host }
    }).then((res) => {
      const { labelInfo, objectInfo } = res.data;
      setLabelData(labelInfo);
      setObjectData(objectInfo);
      setImgDetectMac(labelInfo[0]);
      setProcess(false);
    }).catch((e) => {

    });
  }

  function getChartData(INS_ID) {
    setProcess(true);
    /* setProcess(true);
    const res = {
      labels: ['Food', 'Green', 'Happy', 'Font', '기타'],
      scores: [21, 1, 1, 1, 1],
      detectColors: ['#F0B27A', '#82E0AA', '#85C1E9', '#BB8FCE', '#D7DBDD']
    };

    const { labels, scores, detectColors } = res;

    setLabelData(labels);
    setScoreData(scores);
    setColorData(detectColors);
    setImgDetectMac(labels[0]);
    setProcess(false); */

    // const { host } = window.location;

    axios.get('/api/TB_INSTA/getGoogleDataApex', {
      params: { INS_ID }
    }).then((res) => {
      const { labels, scores, detectColors } = res.data;
      setLabelData(labels);
      setScoreData(scores);
      setColorData(detectColors);
      setImgDetectMac(labels[0]);
      setProcess(false);
    }).catch((e) => {

    });
  }

  useEffect(() => {
    getChartData(239);
  }, []);

  useEffect(() => {
    if (INS_ID) {
      getGoogleVisionData(INS_ID);
    }
  }, [INS_ID]);

  return (
    <React.Fragment>
      <Box mt="80px" mb="24px" pl="10px" borderLeft="4px solid #6E0FFF">
        <Typography variant="h6">
포스팅 분석
          <span>{`(${instaData.INS_NAME}님은 주로 이런 포스팅을 최근에 하고 있습니다)`}</span>
        </Typography>

      </Box>
      <Box margin="0 -8px">
        <Slider {...settings}>
          {mediaData.urls.map((item, index) => (
            <Box key={index} width="100%">
              <Box margin="0 8px">
                <img className={classes.imgFile} src={item || defaultImage} />
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
      <Box my="50px">
        <Typography variant="h6" paragraph>계정 이미지 인공지능 분석</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            {/* <Typography variant="subtitle2" paragraph>Label 분석</Typography> */}
            {/* <Box boxSizing="border-box" width="100%" height="390px" p="20px" bgcolor="#FFF" borderRadius="7px">
             <CategoryPieChart detectData={labelData} process={process} />
             </Box> */}
            <Box boxSizing="border-box" width="100%" p="20px" bgcolor="#FFF" borderRadius="7px" height={process ? '358px' : 'auto'}>
              {process ? (
                <Grid container height="100%" alignItems="center" justify="center">
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                </Grid>
              ) : (
                <PieChartApex series={scoreData} colors={colorData} labels={labelData} />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <Typography variant="subtitle2" paragraph>Object 분석</Typography> */}
            {/* <Box boxSizing="border-box" width="100%" height="390px" p="20px" bgcolor="#FFF" borderRadius="7px"> */}
            <Box boxSizing="border-box" width="100%" p="20px" bgcolor="#FFF" borderRadius="7px">
              {/* <CategoryPieChart detectData={objectData} process={process} /> */}
              <PieChartApex series={scoreData} colors={colorData} labels={labelData} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mb="50px">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" paragraph>인기포스트(좋아요수 1위)</Typography>
            <MediaCard post={maxLikesMedia} testImage={testImage} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" paragraph>관심도1위(댓글 1위)</Typography>
            <MediaCard post={maxCmntMedia} testImage={testImage} />
          </Grid>
        </Grid>
      </Box>
      <Box mb="50px">
        <Typography variant="subtitle2" paragraph>최근게시물</Typography>
        <Grid container spacing={2}>
          {lastPosts.map(post => (
            <Grid item xs={6} key={post.id}>
              <MediaCard post={post} testImage={testImage} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" paragraph>요일별 포스팅 성향</Typography>
          <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
            <BarComponent data={dayData} options={dayOpt} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" paragraph>시간별 포스팅 성향</Typography>
          <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
            <BarComponent data={hourData} options={hourOpt} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box mt="41px" mb="20px" p="20px" pb="40px" bgcolor="#FFF" borderRadius="7px">
            <Box width="fit-content" mb="15px" px="12px" pt="4px" pb="7px" fontSize="16px" borderRadius="7px" bgcolor="#9047FF" color="#FFF" component="div">Total</Box>
            <Typography variant="body1">
              {`${instaData.INS_NAME}님은 ${DAY_OF_WEEK[dayMaxIdx]}요일, 오후 ${HOURS[hourMaxIdx]}시 주로 게시물을 업로드 하고 있습니다.`}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box p="20px" pb="40px" bgcolor="#FFF" borderRadius="7px">
                <Box width="fit-content" mb="15px" px="12px" pt="4px" pb="7px" fontSize="16px" borderRadius="7px" bgcolor="#9047FF" color="#FFF" component="div">Day</Box>
                <Typography variant="body1">
                  {`일 평균 ${dayAvg}개 게시물을 업로드 합니다.`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box p="20px" pb="40px" bgcolor="#FFF" borderRadius="7px">
                <Box width="fit-content" mb="15px" px="12px" pt="4px" pb="7px" fontSize="16px" borderRadius="7px" bgcolor="#9047FF" color="#FFF" component="div">Week</Box>
                <Typography variant="body1">
                  {`주 평균 ${weekAvg}개 게시물을 업로드 합니다.`}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default PostPart;
