import React, { useEffect, useState } from 'react';
import {
  Box, Grid, makeStyles, Typography
} from '@material-ui/core';
import Slider from 'react-slick';
import defaultImage from '../../../img/notFound400_316.png';
import BarComponent from '../BarComponent';
import GoogleVisionGraph from '../../campaign/Graphs/GoogleVisionGraph';
import { DAY_OF_WEEK, HOURS } from '../../../lib/Сonstants';
import CategoryPieChart from '../CategoryPieChart';

const useStyles = makeStyles({
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
  },
});

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
  const { post, testImage } = props;
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item>
        <img className={classes.imgFileMedia} src={post.media_url || defaultImage} />
        {/* <StyledImage borderRadius="7px" width="200px" height="200px" src={post.media_url || testImage} /> */}
      </Grid>
      <Grid item xs zeroMinWidth>
        <Box ml={2} p={2} position="relative" boxSizing="border-box" height="100%" bgcolor="#FFF" borderRadius="7px">
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
  const { testImage, instaData } = props;
  const [maxStatVal, setMaxStatVal] = useState(null);
  const {
    mediaData, postStats, lastPosts, maxLikesMedia, maxCmntMedia, recentPosts
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

  return (
    <React.Fragment>
      <Box mt="80px" mb="24px" pl="10px" borderLeft="4px solid #6E0FFF">
        <Typography variant="h6">포스팅 분석</Typography>
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
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="subtitle2" paragraph>Label 분석</Typography>
            <Box boxSizing="border-box" width="100%" height="390px" p="20px" bgcolor="#FFF" borderRadius="7px">
              <CategoryPieChart INS_ID={instaData.INS_ID} setMaxStatVal={setMaxStatVal} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" paragraph>Object 분석</Typography>
            <Box boxSizing="border-box" width="100%" height="390px" p="20px" bgcolor="#FFF" borderRadius="7px">
              <CategoryPieChart INS_ID={instaData.INS_ID} setMaxStatVal={setMaxStatVal} type="object" />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mb="50px">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" paragraph>인기포스트(좋아요수 1위)</Typography>
            <MediaCard post={maxLikesMedia} testImage={testImage} />
          </Grid>
          <Grid item xs={6}>
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
        <Grid item xs={4}>
          <Typography variant="subtitle2" paragraph>요일별 포스팅 성향</Typography>
          <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
            <BarComponent data={dayData} options={dayOpt} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2" paragraph>시간별 포스팅 성향</Typography>
          <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
            <BarComponent data={hourData} options={hourOpt} />
          </Box>
        </Grid>
        <Grid item xs={4}>
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
