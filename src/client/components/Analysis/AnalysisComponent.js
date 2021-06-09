import {
  Box, createMuiTheme, Grid, useMediaQuery, useTheme, ThemeProvider, Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import StyledImage from '../../containers/StyledImage';
import defaultAccountImage from '../../img/default_account_image.png';
import styleTheme from './AnalysisTheme';
import analysisStyles from './AnalysisStyle';
import DoughnutComponent from './DoughnutComponent';
import StyledTableRow from '../../containers/StyledTableRow';
import BarComponent from './BarComponent';

const testImage = 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/s320x320/44191010_877274945801500_683676639501143736_n.jpg?tp=1&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=YTGxy6Ng_lYAX9CiAC8&edm=ABfd0MgBAAAA&ccb=7-4&oh=47fa1cd0be518349661fa0e5435ab5dc&oe=60C6DF35&_nc_sid=7bff83';

function AnalysisComponent() {
  const [instaData, setInstaData] = useState({});

  const classes = analysisStyles();
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

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
                      <Typography variant="subtitle2">
                        게시물
                      </Typography>
                      <Typography variant="subtitle2">
                        1596
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box width="120px" textAlign="center">
                      <Typography variant="subtitle2">
                        팔로워
                      </Typography>
                      <Typography variant="subtitle2">
                        1596
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box width="120px" textAlign="center">
                      <Typography variant="subtitle2">
                        팔로잉
                      </Typography>
                      <Typography variant="subtitle2">
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
                      <Box p={2}>
                        <Typography variant="body1">
                          인플라이 스코어
                        </Typography>
                      </Box>
                      <Box p={2} bgcolor="#FFF">
                        <Typography variant="body1">
                          진짜 영향력
                        </Typography>
                      </Box>
                      <Box p={2}>
                        <Typography variant="body1">
                          영향력 랭킹
                        </Typography>
                      </Box>
                      <Box p={2} bgcolor="#FFF">
                        <Typography variant="body1">
                          성장성 종합 점수
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box p={2}>
                      <Typography variant="body1">
                          보유 오디언스
                      </Typography>
                    </Box>
                    <Box p={2} bgcolor="#FFF">
                      <Typography variant="body1">
                          진짜 팔로워
                      </Typography>
                    </Box>
                    <Box p={2}>
                      <Typography variant="body1">
                          진짜 반응률
                      </Typography>
                    </Box>
                    <Box p={2} bgcolor="#FFF">
                      <Typography variant="body1">
                          진짜 도달수
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box p={1} borderTop="7px solid #DDDDDD" borderRadius="7px" overflow="hidden" bgcolor="#FFF">
                채널 관련 링크 💸
              </Box>
            </Grid>
          </Grid>
          <Box mt="80px" mb="24px" pl="10px" borderLeft="4px solid #6E0FFF">
            <Typography variant="h6">기본 지표</Typography>
          </Box>
          <Box>
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
          </Box>
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
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2" paragraph>요일별 포스팅 성향</Typography>
                <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
                  <BarComponent />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" paragraph>시간별 포스팅 성향</Typography>
                <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
                  <BarComponent />
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
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box p="20px" pb="40px" bgcolor="#FFF" borderRadius="7px">
                      <Box width="fit-content" mb="15px" px="12px" pt="4px" pb="7px" fontSize="16px" borderRadius="7px" bgcolor="#9047FF" color="#FFF" component="div">Week</Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>

  );
}

export default AnalysisComponent;
