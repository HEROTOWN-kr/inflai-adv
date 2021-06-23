import {
  Box, createMuiTheme, Grid, useMediaQuery, useTheme, ThemeProvider, Typography, LinearProgress, colors
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import ReactWordcloud from 'react-wordcloud';
import StyledImage from '../../containers/StyledImage';
import defaultAccountImage from '../../img/default_account_image.png';
import styleTheme from './AnalysisTheme';
import analysisStyles from './AnalysisStyle';
import DoughnutComponent from './DoughnutComponent';
import StyledTableRow from '../../containers/StyledTableRow';
import BarComponent from './BarComponent';
import TestComponent from '../TestComponent';


const testImage = 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/44191010_877274945801500_683676639501143736_n.jpg?tp=1&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=SMM5lzTWsXsAX9JK4qs&edm=AP_V10EBAAAA&ccb=7-4&oh=971b324811b253d368244c569a59e114&oe=60D9D799&_nc_sid=4f375e';
const testData = {
  audience3: {
    chartColor: ['rgb(110, 15, 255)', 'rgb(24, 219, 168)', 'rgb(255, 230, 0)'],
    chartData: [28, 61, 11]
  },
  activity: {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
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
  },
  activityOpt: {
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
            max: 20,
            stepSize: 5
          }
        }
      ]
    }
  },
  sex: {
    labels: ['10대', '20대', '30대', '40대'],
    datasets: [
      {
        label: '# of Red Votes',
        data: [70, 90, 95, 85],
        backgroundColor: '#6E0FFF',
      },
      {
        label: '# of Blue Votes',
        data: [30, 10, 5, 15],
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
    ],
  },
  language: [
    {
      lng: 'Korean',
      num: '69.1',
      color: 'purple'
    },
    {
      lng: 'English',
      num: '24.7',
      color: 'lightGreen'
    },
    {
      lng: 'Japanese',
      num: '2.5',
      color: 'yellow'
    },
    {
      lng: 'Danish',
      num: '2.5',
      color: 'grey'
    },
    {
      lng: 'Indonesian',
      num: '1.2',
      color: 'grey'
    },
  ],
  age: [
    {
      lng: '10대',
      num: '17.4',
      color: 'purple'
    },
    {
      lng: '20대',
      num: '53.8',
      color: 'lightGreen'
    },
    {
      lng: '30대',
      num: '27.1',
      color: 'yellow'
    },
    {
      lng: '40대',
      num: '1.4',
      color: 'grey'
    },
    {
      lng: '50대',
      num: '0.4',
      color: 'grey'
    },
  ],
  line: {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Votes',
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
        label: '# of comment',
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
  },
  line2: {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 22, 20, 15, 18, 16, 20, 17],
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
  },
  line2Opt: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  },
  line3: {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 22, 20, 15, 18, 16, 20, 17],
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
  },
  line3Opt: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  },
  reaction: {
    labels: ['해당 계정', '카테고리 평균'],
    datasets: [
      {
        label: '# of Votes',
        data: [4.15, 0.69],
        backgroundColor: [
          'rgba(24, 219, 168, 1)',
          'rgba(231, 251, 246, 0.6)',
        ],
        borderWidth: 2,
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  },
  reactionOpt: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          categoryPercentage: 0.5,
          barPercentage: 0.4,
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
            max: 20,
            stepSize: 5
          }
        }
      ]
    },
  }
};

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


function AnalysisComponent() {
  const [instaData, setInstaData] = useState({});

  const classes = analysisStyles();
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  // window.scrollTo(0, document.body.scrollHeight);

  return (
    <ThemeProvider theme={styleTheme}>
      <Box bgcolor="#FAFAFA">
        <Box px={2} py={2} maxWidth="1350px" m="0 auto">
          <Box my="50px">
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
                      <Typography variant="body1" color="textSecondary">
                        게시물
                      </Typography>
                      <Typography variant="subtitle2" classes={{ root: classes.bold600 }}>
                        1596
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box width="120px" textAlign="center">
                      <Typography variant="body1" color="textSecondary">
                        팔로워
                      </Typography>
                      <Typography variant="subtitle2" classes={{ root: classes.bold600 }}>
                        1596
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box width="120px" textAlign="center">
                      <Typography variant="body1" color="textSecondary">
                        팔로잉
                      </Typography>
                      <Typography variant="subtitle2" classes={{ root: classes.bold600 }}>
                        1596
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box mb="13px">
            <Typography variant="subtitle2">계정 정보 간단 요약</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box borderTop="7px solid #DDDDDD" borderRadius="7px" overflow="hidden">
                <Grid container>
                  <Grid item xs={6}>
                    <Box borderRight="1px solid #0000001a">
                      <Box py="13px" px={2}>
                        <Grid container justify="space-between">
                          <Grid item>
                            <Typography variant="body1">
                              인플라이 스코어
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" classes={{ root: classes.bold600 }}>
                              66.4점
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box py="13px" px={2} bgcolor="#FFF">
                        <Grid container justify="space-between">
                          <Grid item>
                            <Typography variant="body1">
                              진짜 영향력
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" classes={{ root: classes.bold600 }}>
                              2,979명
                            </Typography>
                          </Grid>
                        </Grid>

                      </Box>
                      <Box py="13px" px={2}>
                        <Grid container justify="space-between">
                          <Grid item>
                            <Typography variant="body1">
                              영향력 랭킹
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" classes={{ root: classes.bold600 }}>
                              42위(홈리빙)
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box py="13px" px={2} bgcolor="#FFF">
                        <Grid container justify="space-between">
                          <Grid item>
                            <Typography variant="body1">
                              성장성 종합 점수
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" classes={{ root: classes.bold600 }}>
                              High
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box py="13px" px={2}>
                      <Grid container justify="space-between">
                        <Grid item>
                          <Typography variant="body1">
                            보유 오디언스
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" classes={{ root: classes.bold600 }}>
                            30대, 여성(86%)
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box py="13px" px={2} bgcolor="#FFF">
                      <Grid container justify="space-between">
                        <Grid item>
                          <Typography variant="body1">
                            진짜 팔로워
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" classes={{ root: classes.bold600 }}>
                            152,981명
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box py="13px" px={2}>
                      <Grid container justify="space-between">
                        <Grid item>
                          <Typography variant="body1">
                            진짜 반응률
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" classes={{ root: classes.bold600 }}>
                            0.48%
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box py="13px" px={2} bgcolor="#FFF">
                      <Grid container justify="space-between">
                        <Grid item>
                          <Typography variant="body1">
                            진짜 도달수
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" classes={{ root: classes.bold600 }}>
                            115,332명
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box p={1} height="100%" boxSizing="border-box" borderTop="7px solid #DDDDDD" borderRadius="7px" overflow="hidden" bgcolor="#FFF">
                채널 관련 링크 💸
              </Box>
            </Grid>
          </Grid>
          <Box mt="80px" mb="24px" pl="10px" borderLeft="4px solid #6E0FFF">
            <Typography variant="h6">기본 지표</Typography>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Box mb="13px">
                <Typography variant="subtitle2">진짜 영향력</Typography>
              </Box>
              <Box borderRadius="7px" overflow="hidden">
                <Box bgcolor="#FFF" pt="10px" pl="25px" pb="50px">
                  <Grid container alignItems="center">
                    <Grid item>
                      <DoughnutComponent />
                    </Grid>
                    <Grid item>
                      <Box ml={2}>
                        <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                            Great
                        </Typography>
                        <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                            2,979명
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2">
                  <Typography variant="body1">
                      팔로워 중에서 인플루언서에게 영향을 받아 캠페인 목표로 전환될 수 있는 사람의 수입니다.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box mb="13px">
                <Typography variant="subtitle2">인플라이 스코어</Typography>
              </Box>
              <Box borderRadius="7px" overflow="hidden">
                <Box bgcolor="#FFF" pt="10px" pl="25px" pb="50px">
                  <Grid container alignItems="center">
                    <Grid item>
                      <DoughnutComponent />
                    </Grid>
                    <Grid item>
                      <Box ml={2}>
                        <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                            Great
                        </Typography>
                        <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                            2,979명
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2">
                  <Typography variant="body1">
                      100점에 가까울수록 유사 인플루언서 채널군(팔로워수 등급 및 카테고리)에서 영향력이 높은 것을 의미합니다.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box mb="13px">
                <Typography variant="subtitle2">평균 예상 매출액</Typography>
              </Box>
              <Box borderRadius="7px" overflow="hidden">
                <Box bgcolor="#FFF" pt="10px" pl="25px" pb="50px">
                  <Grid container alignItems="center">
                    <Grid item>
                      <DoughnutComponent />
                    </Grid>
                    <Grid item>
                      <Box ml={2}>
                        <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                            Great
                        </Typography>
                        <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                            2,979명
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2">
                  <Typography variant="body1">
                      채널을 통해 상품을 판매한다면 예상할 수 있는 매출 규모입니다. (*품목, 단가 등 개별적 변수에 따라 매출액은 달라질 수 있음)
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box mb="13px">
                <Typography variant="subtitle2">캠페인 예상 견적</Typography>
              </Box>
              <Box borderRadius="7px" overflow="hidden">
                <Box bgcolor="#FFF" pt="10px" pl="25px" pb="50px">
                  <Grid container alignItems="center">
                    <Grid item>
                      <DoughnutComponent />
                    </Grid>
                    <Grid item>
                      <Box ml={2}>
                        <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                            Great
                        </Typography>
                        <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                            2,979명
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2">
                  <Typography variant="body1">
                      진짜 팔로워수 기준으로 책정된 캠페인 예상 견적 금액입니다 (*채널, 캠페인 성격에 따라 실제 견적은 상이할 수 있음)
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box mt="80px" mb="24px" pl="10px" borderLeft="4px solid #6E0FFF">
            <Typography variant="h6">포스팅 분석</Typography>
          </Box>
          <Box mb="50px">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Grid container spacing={1}>
                  {[...Array(9).keys()].map(item => (
                    <Grid key={item} item xs={4}>
                      <StyledImage borderRadius="7px" width="100%" height="auto" src={testImage} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" paragraph>사진분석 결과</Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="subtitle2" paragraph>요일별 포스팅 성향</Typography>
              <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
                <BarComponent data={testData.activity} options={testData.activityOpt} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2" paragraph>시간별 포스팅 성향</Typography>
              <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
                <BarComponent data={testData.activity} options={testData.activityOpt} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box mt="41px" mb="20px" p="20px" pb="40px" bgcolor="#FFF" borderRadius="7px">
                <Box width="fit-content" mb="15px" px="12px" pt="4px" pb="7px" fontSize="16px" borderRadius="7px" bgcolor="#9047FF" color="#FFF" component="div">Total</Box>
                <Typography variant="body1">@sal_gungli 님은 목요일, 오후 20 - 24에 주로 게시물을 업로드 하고 있습니다.</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box p="20px" pb="40px" bgcolor="#FFF" borderRadius="7px">
                    <Box width="fit-content" mb="15px" px="12px" pt="4px" pb="7px" fontSize="16px" borderRadius="7px" bgcolor="#9047FF" color="#FFF" component="div">Day</Box>
                    <Typography variant="body1">
                        일 평균 1.3개 게시물을 업로드 합니다.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box p="20px" pb="40px" bgcolor="#FFF" borderRadius="7px">
                    <Box width="fit-content" mb="15px" px="12px" pt="4px" pb="7px" fontSize="16px" borderRadius="7px" bgcolor="#9047FF" color="#FFF" component="div">Week</Box>
                    <Typography variant="body1">
                        주 평균 9.1개 게시물을 업로드 합니다.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box mt="80px" mb="24px" pl="10px" borderLeft="4px solid #6E0FFF">
            <Typography variant="h6">오디언스 분석</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box mb="13px">
                <Typography variant="subtitle2">오디언스 퀄리티</Typography>
              </Box>
              <Box borderRadius="7px" overflow="hidden">
                <Box bgcolor="#FFF" p="20px">
                  <Box ml="25px">
                    <Grid container alignItems="center">
                      <Grid item>
                        <DoughnutComponent chartColor={[colors.orange[500], 'rgba(0, 0, 0, 0.2)']} />
                      </Grid>
                      <Grid item>
                        <Box ml={2}>
                          <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                            Weak
                          </Typography>
                          <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                            21.1점
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box mt="30px">
                    <Grid container justify="space-between">
                      <Grid item>
                        <Typography variant="body1" color="textSecondary">진짜 팔로워</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" color="textSecondary">가짜 팔로워</Typography>
                      </Grid>
                    </Grid>
                    <Box my={1}>
                      <LinearProgress variant="determinate" value={68} classes={{ barColorPrimary: classes.orange }} />
                    </Box>
                    <Grid container justify="space-between">
                      <Grid item>
                        <Typography variant="body1" classes={{ root: classes.bold }}>152,981 (68%)</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" color="textSecondary" classes={{ root: classes.bold }}>70,690 (32%)</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2">
                  <Typography variant="body1">
                    @sal_gungli 님의 오디언스 퀄티리티 Weak 등급은 동일 그룹 내 상위 78.9% 입니다.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box mb="13px">
                <Typography variant="subtitle2">진짜 도달 예측</Typography>
              </Box>
              <Box borderRadius="7px" overflow="hidden">
                <Box bgcolor="#FFF" p="20px">
                  <Box ml="25px">
                    <Grid container alignItems="center">
                      <Grid item>
                        <DoughnutComponent chartColor={['rgb(180, 240, 70)', 'rgba(0, 0, 0, 0.2)']} />
                      </Grid>
                      <Grid item>
                        <Box ml={2}>
                          <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                            Not Bad
                          </Typography>
                          <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                            96,110명
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box mt="30px">
                    <Grid container justify="space-between">
                      <Grid item>
                        <Typography variant="body1" color="textSecondary">팔로워 도달</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" color="textSecondary">비 팔로워 도달</Typography>
                      </Grid>
                    </Grid>
                    <Box my={1}>
                      <LinearProgress variant="determinate" value={83} classes={{ barColorPrimary: classes.lemon }} />
                    </Box>
                    <Grid container justify="space-between">
                      <Grid item>
                        <Typography variant="body1" classes={{ root: classes.bold }}>96,110 (83%)</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" color="textSecondary" classes={{ root: classes.bold }}>19,222 (17%)</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2">
                  <Typography variant="body1">
                    @sal_gungli 님의 진짜 도달 예측 Not Bad 등급은 동일 그룹 내 상위 58.5% 입니다.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box mb="13px">
                <Typography variant="subtitle2">팔로워 유형</Typography>
              </Box>
              <Box borderRadius="7px" overflow="hidden">
                <Box bgcolor="#FFF" p="20px">
                  <Box ml="25px">
                    <DoughnutComponent chartWidth={140} chartHeight={140} chartData={testData.audience3.chartData} chartColor={testData.audience3.chartColor} />
                    <Box mt="25px">
                      <Grid container>
                        <Grid item xs={6}>비활동 28%</Grid>
                        <Grid item xs={6}>일반 61%</Grid>
                        <Grid item xs={6}>참여형 11%</Grid>
                        <Grid item xs={6}>적극적 0%</Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
                <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2">
                  <Typography variant="body1">
                    인플루언서의 팔로워 중 최근 반응한 데이터를 기반으로 나타낸 수치입니다.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box mt="50px">
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="subtitle2" paragraph>언어 비율</Typography>
                <Box p="20px" bgcolor="#FFF" borderRadius="7px">
                  {testData.language.map(item => (
                    <Box key={item.lng}>
                      <Grid container justify="space-between">
                        <Grid item>
                          <Typography variant="body1" color="textSecondary">
                            {item.lng}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" color="textSecondary">
                            {`${item.num}%`}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box my="10px">
                        <LinearProgress variant="determinate" value={item.num} classes={{ barColorPrimary: classes[item.color] }} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle2" paragraph>연령 비율</Typography>
                <Box p="20px" bgcolor="#FFF" borderRadius="7px">
                  {testData.age.map(item => (
                    <Box key={item.lng}>
                      <Grid container justify="space-between">
                        <Grid item>
                          <Typography variant="body1" color="textSecondary">
                            {item.lng}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" color="textSecondary">
                            {`${item.num}%`}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box my="10px">
                        <LinearProgress variant="determinate" value={item.num} classes={{ barColorPrimary: classes[item.color] }} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" paragraph>성별 비율</Typography>
                <Box p="20px" bgcolor="#FFF" borderRadius="7px">
                  <Grid container>
                    <Grid item>
                      <Box mx={5} mt="50px">
                        <DoughnutComponent chartWidth={140} chartHeight={140} chartColor={['#6E0FFF', 'rgba(0, 0, 0, 0.2)']} />
                      </Box>
                    </Grid>
                    <Grid item xs>
                      <Box maxWidth="380px" m="0 auto">
                        <BarComponent data={testData.sex} />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
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
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AnalysisComponent;
