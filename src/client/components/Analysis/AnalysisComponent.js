import {
  Box, Grid, useMediaQuery, useTheme, ThemeProvider, Typography, Tooltip,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import StyledImage from '../../containers/StyledImage';
import defaultAccountImage from '../../img/default_account_image.png';
import styleTheme from './AnalysisTheme';
import analysisStyles from './AnalysisStyle';
import AuthContext from '../../context/AuthContext';
import GeneralPart from './parts/GeneralPart';
import PostPart from './parts/PostPart';
import AudiencePart from './parts/AudiencePart';
import ReactionPart from './parts/ReactionPart';
import { DAY_OF_WEEK, HOURS } from '../../lib/Сonstants';
import HelpTooltip from './HelpTooltip';

const tooltips = {
  score: '인플루언서 영향력을 나타내는 인플라이지수입니다',
  ranking: '팔로워 중에서 인플루언서에게 영향을 받아 캠페인 목표로 전환될 수 있는 사람의 순위입니다.',
  communication: '좋아요 클릭수량 대비 댓글 수로서 팔로워와의 인터랙션 지수를 말합니다 공감지수가 높으면 팔로워와의 소통이 원활하며 영향력지수가 높아집니다',
  activity: '특정 범위 동안 온라인 상태였던 인스타 사용자 팔로워 수 합계.',
  impressions: '인스타그램 사용자의 미디어가 조회된 횟수 합계. 홍보 기능을 통해 생성된 광고 활동을 포함합니다..',
  activeFollowers: '원래 팔로워수 온라인상태 팔로워수 비율. X축 시간. 팔로원들이 가장 강력하게 보는 시간 영향력있는 시간 팔로워들의 활동시간 분석'
};
const testImage = 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/44191010_877274945801500_683676639501143736_n.jpg?tp=1&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=SMM5lzTWsXsAX9JK4qs&edm=AP_V10EBAAAA&ccb=7-4&oh=971b324811b253d368244c569a59e114&oe=60D9D799&_nc_sid=4f375e';
const testData = {
  audience3: {
    chartColor: ['rgb(110, 15, 255)', 'rgb(24, 219, 168)', 'rgb(255, 230, 0)'],
    chartData: [28, 61, 11]
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
  INS_PROFILE_IMG: defaultAccountImage,
  INS_LIKES: 0,
  INS_CMNT: 0,
  INS_SCORE: 0,
  INS_TYPES: 'Smile Cloud Table Tableware Decoration Photograph Dog Light Land vehicle Jeans Forehead Ecoregion Trousers Green Hairstyle Hair Water Umbrella Picture frame Sky Rectangle',
  ability: '',
  abilityType: '',
  influencerType: '',
  mediaData: {
    urls: Array(9).fill(null),
    comments: [12, 19, 3, 5, 2, 3],
    likes: [12, 19, 3, 5, 2, 3],
    likesMaxIdx: 1,
    commentsMaxIdx: 1
  },
  lastPosts: [],
  maxLikesMedia: {},
  maxCmntMedia: {},
  monthMedia: {
    mediaCount: 0,
    likeSum: 0,
    commentsSum: 0
  },
  genderData: {
    female: [70, 90, 95, 85],
    male: [30, 10, 5, 15],
    malePercent: 0,
    femalePercent: 0
  },
  genderMax: '',
  ageData: [
    {
      age: '10대',
      num: '17.4',
    },
    {
      age: '20대',
      num: '53.8',
    },
    {
      age: '30대',
      num: '27.1',
    },
    {
      age: '40대',
      num: '1.4',
    },
    {
      age: '50대',
      num: '0.4',
    },
  ],
  ageMax: '',
  followerActivity: {
    hours: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    flwrs: [12, 19, 22, 20, 15, 18, 16, 20, 17],
    flwrsMax: '',
    notActiveFlwr: '',
    flwrsMaxPer: '',
    notActiveFlwrPer: ''
  },
  newFollowers: 0,
  impressions: {
    impressionsVal: [12, 19, 22, 20, 15, 18, 16],
    impressionsMax: 0,
    impressionsMaxPer: ''
  },
  postStats: {
    hourStats: Array(24).fill(0),
    dayStats: Array(7).fill(0),
    dayMaxIdx: 0,
    hourMaxIdx: 0,
    dayAvg: 0,
    weekAvg: 0
  },
  location: {
    maxLoc: '',
    locData: []
  },
};

function AnalysisComponent() {
  const [instaData, setInstaData] = useState(defaultData);
  const [imgDetectMax, setImgDetectMax] = useState({ description: '', value: '' });
  const [locationMax, setLocationMax] = useState({ description: '', value: '' });
  const { token } = useContext(AuthContext);

  const classes = analysisStyles();
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  // window.scrollTo(0, document.body.scrollHeight);

  function getInstaInfo() {
    axios.get('/api/TB_INSTA/instaInfo', {
      params: { instaId: 1197 }
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
                  <Grid item>
                    <Box width="120px" textAlign="center">
                      <Typography variant="body1" color="textSecondary">
                        카테고리
                      </Typography>
                      <Typography variant="subtitle2" classes={{ root: classes.bold600 }}>
                        {imgDetectMax.description}
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
                            <Box className={classes.textAndIcon}>
                              <span>인플라이 지수</span>
                              <HelpTooltip title={tooltips.score} />
                            </Box>
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
                            <Box className={classes.textAndIcon}>
                              <span>소통, 공감능력</span>
                              <HelpTooltip title={tooltips.communication} />
                            </Box>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" classes={{ root: classes.bold600 }}>
                              {`${instaData.ability}%(${instaData.abilityType})`}
                            </Typography>
                          </Grid>
                        </Grid>

                      </Box>
                      <Box py="13px" px={2}>
                        <Grid container justify="space-between">
                          <Grid item>
                            <Box className={classes.textAndIcon}>
                              <span> 인플라이 랭킹</span>
                              <HelpTooltip title={tooltips.ranking} />
                            </Box>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" classes={{ root: classes.bold600 }}>
                              {instaData.INS_RANK}
위
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box py="13px" px={2} bgcolor="#FFF">
                        <Grid container justify="space-between">
                          <Grid item>
                            <Box className={classes.textAndIcon}>
                              <span>팔로워충성도</span>
                              <HelpTooltip title={tooltips.impressions} />
                            </Box>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" classes={{ root: classes.bold600 }}>
                              {`${instaData.impressions.impressionsMax}명(${instaData.impressions.impressionsMaxPer}%)`}
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
                            팔로워 주요 국적
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" classes={{ root: classes.bold600 }}>
                            {instaData.location.maxLoc}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box py="13px" px={2} bgcolor="#FFF">
                      <Grid container justify="space-between">
                        <Grid item>
                          <Typography variant="body1">
                            팔로워 성비
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" classes={{ root: classes.bold600 }}>
                            {instaData.genderMax}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box py="13px" px={2}>
                      <Grid container justify="space-between">
                        <Grid item>
                          <Typography variant="body1">
                            팔로워 연령
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" classes={{ root: classes.bold600 }}>
                            {instaData.ageMax}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box py="13px" px={2} bgcolor="#FFF">
                      <Grid container justify="space-between">
                        <Grid item>
                          <Box className={classes.textAndIcon}>
                            <span>국내영향력 팔로워</span>
                            <HelpTooltip title={tooltips.activity} />
                          </Box>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" classes={{ root: classes.bold600 }}>
                            {`${instaData.followerActivity.flwrsMax}명(${instaData.followerActivity.flwrsMaxPer}%)`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box height="100%" boxSizing="border-box" borderTop="7px solid #DDDDDD" borderRadius="7px" overflow="hidden">
                <Box py="13px" px={2}>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography variant="body1">
                        최근 1주일간 새로운 팔로워신청
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" classes={{ root: classes.bold600 }}>
                        {instaData.newFollowers}
명
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box py="13px" px={2} bgcolor="#FFF">
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography variant="body1">
                        주 평균 게시물을 업로드
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" classes={{ root: classes.bold600 }}>
                        {`${instaData.postStats.weekAvg}개`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box p={2} mt="50px" bgcolor="#F2F2F2">
            <Typography variant="subtitle2">
              { `${instaData.INS_NAME}는 ${instaData.INS_FLWR}명의 팔로워를 보유하고 있으며 이는 ${instaData.influencerType} 입니다.
                인플루언서 영향력을 나타내는 인플라이니수는 ${instaData.INS_SCORE}
                점이며 최근 30일간 ${instaData.monthMedia.mediaCount}건의 포스팅으로 진행하였고
                ${instaData.monthMedia.likeSum}건의 좋아요수와 ${instaData.monthMedia.commentsSum}건의 댓글을 받아 공감능력은 ${instaData.ability}%(${instaData.abilityType}) 상태입니다.
                보유팔로워의 ${locationMax.value}%가 ${locationMax.description}인으로 구성되어있으며
                ${instaData.ageMax}대 ${instaData.genderMax}걸쳐서 가장 큰 영향력을 발휘하게 됩니다.
                게시물 인공지능분석 결과 가장 높은 비율인 ${imgDetectMax.value}%를 (${imgDetectMax.description})가 차지하고 있어서
                ${imgDetectMax.description} 쪽에 영향력 지수가 크다고 보여집니다.
                (제일 높은 이미지의 %가 30% 이하이면 ... 특별한 카테고리에 영향력이 없다고 보여집니다.)
                ${instaData.INS_NAME}님은 ${DAY_OF_WEEK[instaData.postStats.dayMaxIdx]}요일, 오후 ${HOURS[instaData.postStats.hourMaxIdx]}시 주로 게시물을 업로드 하고 있습니다.` }
            </Typography>
          </Box>
          <PostPart instaData={instaData} setImgDetectMac={setImgDetectMax} testImage={testImage} />
          <ReactionPart tooltips={tooltips} instaData={instaData} testData={testData} />
          <AudiencePart instaData={instaData} setLocationMax={setLocationMax} testData={testData} />
          <GeneralPart instaData={instaData} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AnalysisComponent;
