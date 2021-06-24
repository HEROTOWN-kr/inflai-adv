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

function ReactionPart(props) {
  const { testData } = props;

  return (
    <React.Fragment>
      <Box mt="80px" mb="24px" pl="10px" borderLeft="4px solid #6E0FFF">
        <Typography variant="h6">반응 분석</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle2" paragraph>좋아요 추이</Typography>
          <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
            <BarComponent data={testData.activity} options={testData.activityOpt} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2" paragraph>댓글 추이</Typography>
          <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
            <BarComponent data={testData.activity} options={testData.activityOpt} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2" paragraph>팬심 추이</Typography>
          <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
            <Line height={200} data={testData.line} />
          </Box>
        </Grid>
      </Grid>
      <Box mt="50px">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" paragraph>팔로워 트렌드</Typography>
            <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
              <Line height={150} data={testData.line2} options={testData.line2Opt} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" paragraph>팔로잉 트렌드</Typography>
            <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
              <Line height={150} data={testData.line3} options={testData.line3Opt} />
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
            <Typography variant="subtitle2" paragraph>댓글 주요 키워드</Typography>
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
