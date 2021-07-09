import React, { useEffect, useState } from 'react';
import {
  Box, colors, Grid, LinearProgress, Typography
} from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import DoughnutComponent from '../DoughnutComponent';
import BarComponent from '../BarComponent';
import analysisStyles from '../AnalysisStyle';
import MapGraph2 from '../../campaign/Graphs/MapGraph2';
import StyledText from '../../../containers/StyledText';


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
  const { testData, instaData } = props;
  const [maxLocVal, setMaxLocVal] = useState(null);
  const { genderData, ageData, followerActivity } = instaData;
  const { male, female } = genderData;
  const classes = analysisStyles();
  const barClasses = barStyles();

  sex.datasets[0].data = female;
  sex.datasets[1].data = male;

  const femaleSum = female.reduce((a, b) => a + b, 0);
  const maleSum = male.reduce((a, b) => a + b, 0);

  return (
    <React.Fragment>
      <Box mt="80px" mb="24px" pl="10px" borderLeft="4px solid #6E0FFF">
        <Typography variant="h6">오디언스 분석</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box mb="13px">
            <Typography variant="subtitle2">팔로워의 액티비티</Typography>
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
                        적극적 팔로워
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
                    <Typography variant="body1" color="textSecondary">적극적 팔로워</Typography>
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
                @sal_gungli 님의 오디언스 퀄티리티 Weak 등급은 동일 그룹 내 상위 78.9% 입니다.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box mb="13px">
            <Typography variant="subtitle2">팔로워의 지도</Typography>
          </Box>
          <Box borderRadius="7px" overflow="hidden">
            <Box bgcolor="#FFF" p="20px">
              <MapGraph2 INS_ID={instaData.INS_ID} setMaxLocVal={setMaxLocVal} />
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
    </React.Fragment>
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
