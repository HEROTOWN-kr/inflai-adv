import {
  Box, createMuiTheme, Grid, useMediaQuery, useTheme, ThemeProvider, Typography, LinearProgress, colors
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import ReactWordcloud from 'react-wordcloud';
import axios from 'axios';
import StyledImage from '../../containers/StyledImage';
import defaultAccountImage from '../../img/default_account_image.png';
import styleTheme from './AnalysisTheme';
import analysisStyles from './AnalysisStyle';
import DoughnutComponent from './DoughnutComponent';
import StyledTableRow from '../../containers/StyledTableRow';
import BarComponent from './BarComponent';
import TestComponent from '../TestComponent';
import AuthContext from '../../context/AuthContext';
import GeneralPart from './parts/GeneralPart';
import PostPart from './parts/PostPart';
import AudiencePart from './parts/AudiencePart';
import ReactionPart from './parts/ReactionPart';


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
const defaultData = {
  INS_ID: null,
  INS_NAME: '',
  INS_USERNAME: '',
  INS_MEDIA_CNT: 0,
  INS_FLW: 0,
  INS_FLWR: 0,
  INS_PROFILE_IMG: testImage,
  INS_LIKES: 0,
  INS_CMNT: 0,
  INS_SCORE: 0,
  INS_TYPES: 'Smile Cloud Table Tableware Decoration Photograph Dog Light Land vehicle Jeans Forehead Ecoregion Trousers Green Hairstyle Hair Water Umbrella Picture frame Sky Rectangle',
  ability: '훌륭',
  influencerType: 'Nano Influencer',
  mediaData: {
    urls: [...Array(9).keys()],
    comments: [12, 19, 3, 5, 2, 3],
    likes: [12, 19, 3, 5, 2, 3],
    likesMaxIdx: 1,
    commentsMaxIdx: 1
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
};

function AnalysisComponent() {
  const [instaData, setInstaData] = useState(defaultData);
  const { token } = useContext(AuthContext);

  const classes = analysisStyles();
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  // window.scrollTo(0, document.body.scrollHeight);

  function getInstaInfo() {
    axios.get('/api/TB_INSTA/instaInfo', {
      params: { instaId: 3139 }
    }).then((res) => {
      const { data } = res.data;
      setInstaData({ ...instaData, ...data });
    }).catch(err => alert(err.response.data.message));
  }

  useEffect(() => {
    getInstaInfo();
  }, []);

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
                        <Typography variant="subtitle1">{instaData.INS_NAME}</Typography>
                        <Typography variant="subtitle2">{instaData.INS_USERNAME}</Typography>
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
                        {instaData.INS_MEDIA_CNT}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box width="120px" textAlign="center">
                      <Typography variant="body1" color="textSecondary">
                        팔로워
                      </Typography>
                      <Typography variant="subtitle2" classes={{ root: classes.bold600 }}>
                        {instaData.INS_FLWR}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box width="120px" textAlign="center">
                      <Typography variant="body1" color="textSecondary">
                        팔로잉
                      </Typography>
                      <Typography variant="subtitle2" classes={{ root: classes.bold600 }}>
                        {instaData.INS_FLW}
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
                              {instaData.INS_SCORE}
                              점
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
          <GeneralPart />
          <PostPart instaData={instaData} testImage={testImage} />
          <AudiencePart testData={testData} />
          <ReactionPart instaData={instaData} testData={testData} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AnalysisComponent;
