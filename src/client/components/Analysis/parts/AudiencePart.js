import React, { useEffect, useState } from 'react';
import {
  Box, colors, Grid, LinearProgress, Typography
} from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import DoughnutComponent from '../DoughnutComponent';
import BarComponent from '../BarComponent';
import analysisStyles from '../AnalysisStyle';
import MapGraph from '../../campaign/Graphs/MapGraph';


const sex = {
  labels: ['18-24', '25-34', '35-44', '45-54', '65+'],
  datasets: [
    {
      label: '여성',
      backgroundColor: '#6E0FFF',
    },
    {
      label: '남성',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  ],
};

const bgColors = ['purple', 'lightGreen', 'yellow', 'grey'];

const barStyles = makeStyles({
  orange: {
    backgroundColor: colors.orange[500]
  },
  lemon: {
    backgroundColor: 'rgb(180, 240, 70)'
  },
  purple: {
    backgroundColor: '#6E0FFF'
  },
  lightGreen: {
    backgroundColor: '#18DBA8'
  },
  yellow: {
    backgroundColor: '#FFE600'
  },
  grey: {
    backgroundColor: '#00000017'
  }
});

function AudiencePart(props) {
  const { testData, instaData, setLocationMax } = props;
  const {
    genderData, ageData, followerActivity, INS_ID
  } = instaData;
  const { male, female } = genderData;
  const [mapData, setMapData] = useState([]);
  const [statsData, setStatsData] = useState([]);

  const classes = analysisStyles();
  const barClasses = barStyles();

  sex.datasets[0].data = female;
  sex.datasets[1].data = male;

  const femaleSum = female.reduce((a, b) => a + b, 0);
  const maleSum = male.reduce((a, b) => a + b, 0);

  function getStatistics() {
    axios.get('/api/TB_INSTA/statsMapNew', {
      params: { INS_ID }
    }).then((res) => {
      const { statsTopString, sortedStats, stats } = res.data;
      if (sortedStats) setMapData(sortedStats);
      if (stats) {
        setStatsData(stats);
        setLocationMax({
          description: stats[0].description,
          value: stats[0].value,
          statsTop: statsTopString
        });
      }
    }).catch(err => alert(err));
  }

  useEffect(() => {
    if (INS_ID) {
      getStatistics();
    }
  }, [INS_ID]);

  return (
    <Box mt="80px" mb="24px">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box pl="10px" borderLeft="4px solid #6E0FFF">
            <Typography variant="h6" paragraph>팔로워 충성도 분석</Typography>
          </Box>
          <Box borderRadius="7px" overflow="hidden">
            <Box bgcolor="#FFF" p="20px">
              <Box ml="25px">
                <Grid container alignItems="center">
                  <Grid item>
                    <DoughnutComponent chartData={[followerActivity.flwrsMax, followerActivity.notActiveFlwr]} chartColor={[colors.orange[500], 'rgba(0, 0, 0, 0.2)']} />
                  </Grid>
                  <Grid item>
                    <Box ml={2}>
                      <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                        충성도있는 팔로워
                      </Typography>
                      <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                        {`${followerActivity.flwrsMax}명`}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box mt="30px">
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="body1" color="textSecondary">충성도있는 팔로워</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" color="textSecondary">비활동 팔로워</Typography>
                  </Grid>
                </Grid>
                <Box my={1}>
                  <LinearProgress variant="determinate" value={followerActivity.flwrsMax} classes={{ barColorPrimary: barClasses.orange }} />
                </Box>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="body1" classes={{ root: classes.bold }}>{`${followerActivity.flwrsMax}명 (${followerActivity.flwrsMaxPer}%)`}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" color="textSecondary" classes={{ root: classes.bold }}>{`${followerActivity.notActiveFlwr}명 (${followerActivity.notActiveFlwrPer}%)`}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2">
              <Typography variant="body1">
                충성도있는 팔로워 수는 지난 주 동안 Instagram의 온라인 상태에 대한 정보를 수신하여 계산됩니다.
              </Typography>
            </Box>
          </Box>
          <Box mt={1} px="25px" py="15px" bgcolor="#F2F2F2" borderRadius="7px">
            <Typography variant="body1" gutterBottom classes={{ root: classes.bold600 }}>
              충성도있는 팔로워 수로 본 영향력지수
            </Typography>
            <Typography variant="body1">
              0%~1%  : 미미
              <br />
              1%~3%  : 저조
              <br />
              3%~5%  : 보통
              <br />
              5%~7%  : 우수
              <br />
              7%이상  : 매우우수
            </Typography>

          </Box>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column" style={{ height: '100%' }}>
            <Grid item>
              <Box pl="10px" borderLeft="4px solid #6E0FFF">
                <Typography variant="h6" paragraph>팔로워 공감능력 분석</Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <Box bgcolor="#FFF" p="20px" pl="45px" boxSizing="border-box" height="100%" borderRadius="7px 7px 0 0" overflow="hidden">
                <Grid container alignItems="center" style={{ height: '100%' }}>
                  <Grid item container alignItems="center">
                    <Grid item>
                      <DoughnutComponent chartData={[instaData.ability, 100 - instaData.ability]} chartColor={[colors.orange[500], 'rgba(0, 0, 0, 0.2)']} />
                    </Grid>
                    <Grid item>
                      <Box ml={2}>
                        <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                          팔로워의 공감능력
                        </Typography>
                        <Typography variant="subtitle2" classes={{ root: classes.bold }}>
                          {`${instaData.ability}%(${instaData.abilityType})`}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2" borderRadius="0 0 7px 7px">
                <Typography variant="body1">
                  {`공감능력분석은 좋아요 대비 댓글수로서 ${instaData.INS_NAME}님의 공감능력은 ${instaData.ability}% 입니다. 공감능력이 높을 수록 광고의 효율성이 높아집니다`}
                </Typography>
              </Box>
              <Box mt={1} px="25px" py="15px" bgcolor="#F2F2F2" borderRadius="7px">
                <Typography variant="body1" gutterBottom classes={{ root: classes.bold600 }}>
                  공감능력분석으로 본 영향력지수
                </Typography>
                <Typography variant="body1">
                  0%~5%  : 미미
                  <br />
                  5%~10%  : 저조
                  <br />
                  10%~15%  : 보통
                  <br />
                  15%~20%  : 우수
                  <br />
                  25%이상  : 매우우수
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box mt="50px">
        <Typography variant="subtitle2" paragraph>팔로워의 지도</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box borderRadius="7px" bgcolor="#FFF" p="20px">
            <MapGraph mapData={mapData} />
          </Box>
          <Box px="25px" py="15px" bgcolor="#F2F2F2" borderRadius="7px">
            <Typography variant="body1">
              팔로워들의 국적을 분석하여 지도로 보여줍니다. 국내외의 사용자가 지나치게 많을 경우 팔로워구매를 의심할 수 있습니다. 실제 사용자중 국내사용자들의 비율로 팔로워수를 판단해야 합니다.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box borderRadius="7px" bgcolor="#FFF" p="20px" height="100%" boxSizing="border-box">

            {statsData && statsData.length ? (
              <Grid container alignItems="center" style={{ height: '100%' }}>
                <Grid item xs={12}>
                  <Box height="350px">
                    <PieChart
                      data={statsData}
                      animate="true"
                      animationDuration="800"
                      label={({ dataEntry }) => `${dataEntry.description} : ${dataEntry.value}%`}
                      labelStyle={index => ({
                        fill: statsData[index].labelColor,
                        fontSize: '6px',
                        fontFamily: 'sans-serif',
                      })}
                      radius={35}
                      labelPosition={120}
                    />
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Grid container alignItems="center" justify="center" style={{ height: '100%' }}>
                <Grid item>
                    로딩 중...
                </Grid>
              </Grid>
            )}
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
                    <LinearProgress variant="determinate" value={item.num} classes={{ barColorPrimary: barClasses[item.color] }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle2" paragraph>연령 비율</Typography>
            <Box p="20px" bgcolor="#FFF" borderRadius="7px">
              { ageData.map((item, index) => (
                <Box key={item.age}>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography variant="body1" color="textSecondary">
                        {item.age}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" color="textSecondary">
                        {`${item.num}%`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box my="10px">
                    <LinearProgress variant="determinate" value={item.num} classes={{ barColorPrimary: barClasses[bgColors[index]] }} />
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
                  <Box mx={5} mt="30px">
                    <DoughnutComponent chartData={[femaleSum, maleSum]} chartWidth={140} chartHeight={140} chartColor={['#6E0FFF', 'rgba(0, 0, 0, 0.2)']} />
                    <Box mt="25px">
                      <Grid container alignItems="center" justify="center">
                        <Grid item>
                          <FiberManualRecord classes={{ fontSizeSmall: classes.colorGrey2 }} fontSize="small" />
                        </Grid>
                        <Grid item>
                          <Box>{`남성 ${genderData.malePercent}%`}</Box>
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center" justify="center">
                        <Grid item>
                          <FiberManualRecord classes={{ fontSizeSmall: classes.colorViolet }} fontSize="small" />
                        </Grid>
                        <Grid item>
                          <Box>{`여성 ${genderData.femalePercent}%`}</Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box maxWidth="380px" m="0 auto">
                    <BarComponent data={sex} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AudiencePart;


{ /* <Grid item xs={4}>
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
                  <LinearProgress variant="determinate" value={83} classes={{ barColorPrimary: barClasses.lemon }} />
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
        </Grid> */ }
