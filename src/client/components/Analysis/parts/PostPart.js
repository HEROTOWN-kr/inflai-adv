import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import StyledImage from '../../../containers/StyledImage';
import BarComponent from '../BarComponent';
import GoogleVisionGraph from '../../campaign/Graphs/GoogleVisionGraph';
import { DAY_OF_WEEK, HOURS } from '../../../lib/Сonstants';

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

function PostPart(props) {
  const { testImage, instaData } = props;
  const [maxStatVal, setMaxStatVal] = useState(null);
  const { mediaData, postStats } = instaData;
  const {
    hourStats, dayStats, dayMaxIdx, hourMaxIdx, dayAvg, weekAvg
  } = postStats;

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
      <Box mb="50px">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              {mediaData.urls.map(item => (
                <Grid key={item} item xs={4}>
                  <StyledImage borderRadius="7px" width="100%" height="auto" src={item || testImage} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" paragraph>사진분석 결과</Typography>
            <GoogleVisionGraph INS_ID={instaData.INS_ID} setMaxStatVal={setMaxStatVal} />
          </Grid>
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
