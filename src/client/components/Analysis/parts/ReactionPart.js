import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import ReactWordcloud from 'react-wordcloud';
import BarComponent from '../BarComponent';


const words = [
  {
    text: '기대',
    value: 50,
  },
  {
    text: '이거',
    value: 11
  },
  {
    text: '기분',
    value: 16
  },
  {
    text: '감사',
    value: 17
  },
  {
    text: '완료',
    value: 10
  },
  {
    text: '사용',
    value: 54
  },
  {
    text: '행주',
    value: 12
  },
  {
    text: '궁리',
    value: 40
  },
  {
    text: '거품',
    value: 45
  },
  {
    text: '주방',
    value: 19
  },
  {
    text: '주말',
    value: 13
  },
  {
    text: '이번',
    value: 32
  },
  {
    text: '세탁',
    value: 22
  },
  {
    text: '수세미',
    value: 35
  },
  {
    text: '아워',
    value: 24
  },
  {
    text: '주문',
    value: 38
  },
  {
    text: '구매',
    value: 70,
    main: 1
  },
  {
    text: '세제',
    value: 26
  },
  {
    text: '오늘',
    value: 14
  },
  {
    text: '공구',
    value: 29
  },
];

const callbacks = {
  getWordColor: word => (word.main ? '#5568f7' : '#00000073'),
};

const options = {
  colors: ['#00000073'],
  enableTooltip: false,
  deterministic: false,
  fontFamily: 'impact',
  fontSizes: [35, 40],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 5,
  rotations: 1,
  rotationAngles: [0, 90],
  scale: 'sqrt',
  spiral: 'rectangular',
  transitionDuration: 1000
};

const likesData = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      backgroundColor: [
        '#EAEAEA', '#18DBA8', '#EAEAEA', '#EAEAEA', '#EAEAEA', '#EAEAEA'
      ],
      categoryPercentage: 0.5
    },
  ],
};

const commentsData = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        '#EAEAEA', '#18DBA8', '#EAEAEA', '#EAEAEA', '#EAEAEA', '#EAEAEA'
      ],
      categoryPercentage: 0.5
    },
  ],
};

const likesOpt = {
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
        ticks: {
          display: true,
          min: 0,
          max: 100,
          stepSize: 5
        }
      }
    ]
  }
};

const commentsOpt = {
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
        ticks: {
          display: true,
          min: 0,
          max: 100,
          stepSize: 5
        }
      }
    ]
  }
};

const line = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '좋아요수',
      data: [12, 19, 22, 20, 15, 18],
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(24, 219, 168, 1)',
      borderColor: 'rgba(24, 219, 168, 1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderWidth: 5,
      borderJoinStyle: 'miter',
      pointBorderColor: 'white',
      pointBackgroundColor: 'rgba(24, 219, 168, 1)',
      pointBorderWidth: 1,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: 'rgba(24, 219, 168, 1)',
      pointHoverBorderColor: 'rgba(24, 219, 168, 1)',
      pointHoverBorderWidth: 2,
      pointRadius: 7,
      pointHitRadius: 10,
    },
    {
      label: '댓글수',
      data: [4, 1, 3, 5, 2, 3],
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(144, 71, 255, 1)',
      borderColor: 'rgba(144, 71, 255, 1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderWidth: 5,
      borderJoinStyle: 'miter',
      pointBorderColor: 'white',
      pointBackgroundColor: 'rgba(144, 71, 255, 1)',
      pointBorderWidth: 1,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: 'rgba(144, 71, 255, 1)',
      pointHoverBorderColor: 'rgba(144, 71, 255, 1)',
      pointHoverBorderWidth: 2,
      pointRadius: 7,
      pointHitRadius: 10,
    },
  ],
};

const activity = {
  datasets: [
    {
      label: '팔로워 수',
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
    },
  ],
};
const activityOpt = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};

const impressionData = {
  labels: ['1', '2', '3', '4', '5', '6', '7'],
  datasets: [
    {
      label: '조회된 횟수',
      fill: true,
      lineTension: 0.5,
      backgroundColor: 'rgba(244, 236, 255, 0.6)',
      borderColor: 'rgba(144, 71, 255, 1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderWidth: 4,
      borderJoinStyle: 'miter',
      pointBorderColor: 'white',
      pointBackgroundColor: 'rgba(144, 71, 255, 1)',
      pointBorderWidth: 1,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: 'rgba(144, 71, 255, 1)',
      pointHoverBorderColor: 'rgba(144, 71, 255, 1)',
      pointHoverBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 10,
    },
  ],
};
const impressionOpt = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};

function ReactionPart(props) {
  const { testData, instaData } = props;
  const {
    comments, likes, likesMaxIdx, commentsMaxIdx
  } = instaData.mediaData;

  const { hours, flwrs } = instaData.followerActivity;
  const { impressionsMax, impressionsVal } = instaData.impressions;

  commentsData.datasets[0].data = comments;
  commentsData.datasets[0].backgroundColor = Array(comments.length).fill('#EAEAEA');
  commentsData.datasets[0].backgroundColor[commentsMaxIdx] = '#18DBA8';
  commentsData.labels = Array.from({ length: comments.length }, (_, i) => i + 1);
  commentsOpt.scales.yAxes[0].ticks.max = comments[commentsMaxIdx];
  commentsOpt.scales.yAxes[0].ticks.stepSize = comments[commentsMaxIdx] / 4;

  likesData.datasets[0].data = likes;
  likesData.datasets[0].backgroundColor = Array(likes.length).fill('#EAEAEA');
  likesData.datasets[0].backgroundColor[likesMaxIdx] = '#18DBA8';
  likesData.labels = Array.from({ length: likes.length }, (_, i) => i + 1);
  likesOpt.scales.yAxes[0].ticks.max = likes[likesMaxIdx];
  likesOpt.scales.yAxes[0].ticks.stepSize = likes[likesMaxIdx] / 4;

  line.datasets[0].data = likes;
  line.datasets[1].data = comments;
  line.labels = Array.from({ length: likes.length }, (_, i) => i + 1);

  activity.datasets[0].data = flwrs;
  activity.labels = hours;

  impressionData.datasets[0].data = impressionsVal;


  return (
    <React.Fragment>
      <Box mt="80px" mb="24px" pl="10px" borderLeft="4px solid #6E0FFF">
        <Typography variant="h6">반응 분석</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle2" paragraph>최근 24시간 온라인 상태였던 팔로워 수</Typography>
          <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
            <Line height={150} data={activity} options={activityOpt} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" paragraph>
            사용자의 미디어가 조회된 횟수 합계
          </Typography>
          <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
            <Line height={150} data={impressionData} options={impressionOpt} />
          </Box>
        </Grid>
      </Grid>
      <Box mt="50px">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="subtitle2" paragraph>최근 포스트의 좋아요수</Typography>
            <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
              <BarComponent data={likesData} options={likesOpt} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2" paragraph>최근 포스트의 댓글수</Typography>
            <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
              <BarComponent data={commentsData} options={commentsOpt} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2" paragraph>좋아요와 댓글 피교</Typography>
            <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
              <Line height={200} data={line} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt="50px">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" paragraph>평균 반응 비율</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
                  <BarComponent height={242} data={testData.reaction} options={testData.reactionOpt} />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
                  <BarComponent height={242} data={testData.reaction} options={testData.reactionOpt} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" paragraph>해시태그 주요 키워드</Typography>
            <Box height="250px" p="20px" bgcolor="#FFF" borderRadius="7px">
              <ReactWordcloud options={options} words={words} callbacks={callbacks} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default ReactionPart;
