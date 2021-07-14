import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import DoughnutComponent from '../DoughnutComponent';
import analysisStyles from '../AnalysisStyle';


function GeneralPart(props) {
  const { instaData } = props;
  const classes = analysisStyles();

  return (
    <React.Fragment>
      <Box mt="80px" mb="24px" pl="10px" borderLeft="4px solid #6E0FFF">
        <Typography variant="h6">기본 지표</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Box mb="13px">
            <Typography variant="subtitle2">인플라이 랭킹</Typography>
          </Box>
          <Box borderRadius="7px" overflow="hidden">
            <Box bgcolor="#FFF" px={2} py="45px">
              <Typography classes={{ root: classes.generalStats }}>
                {instaData.INS_RANK}
위
              </Typography>
            </Box>
            <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2">
              <Typography variant="body1">
                팔로워 중에서 인플루언서에게 영향을 받아 캠페인 목표로 전환될 수 있는 사람의 순위입니다.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box mb="13px">
            <Typography variant="subtitle2">적극적 팔로워</Typography>
          </Box>
          <Box borderRadius="7px" overflow="hidden">
            <Box bgcolor="#FFF" px={2} py="45px">
              <Typography classes={{ root: classes.generalStats }}>
                {`${instaData.followerActivity.flwrsMax}명`}
              </Typography>
            </Box>
            <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2">
              <Typography variant="body1">
                  특정 범위 동안 온라인 상태였던 인스타 사용자 팔로워 수 합계
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box mb="13px">
            <Typography variant="subtitle2">소통, 공감능력</Typography>
          </Box>
          <Box borderRadius="7px" overflow="hidden">
            <Box bgcolor="#FFF" px={2} py="45px">
              <Typography classes={{ root: classes.generalStats }}>
                {instaData.ability}
              </Typography>
            </Box>
            <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2">
              <Typography variant="body1">
                사용자가 포스팅된 계시물의 좋아요수랑 댓끌수를 대비해서 나오는 공감능력은 상태입니다.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box mb="13px">
            <Typography variant="subtitle2">팔로워충성도</Typography>
          </Box>
          <Box borderRadius="7px" overflow="hidden">
            <Box bgcolor="#FFF" px={2} py="45px">
              <Typography classes={{ root: classes.generalStats }}>
                {`${instaData.impressions.impressionsMax}명`}
              </Typography>
            </Box>
            <Box px="25px" pt="15px" pb="30px" bgcolor="#F2F2F2">
              <Typography variant="body1">
                  인스타그램 사용자의 미디어가 조회된 횟수 합계. 홍보 기능을 통해 생성된 광고 활동을 포함합니다.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default GeneralPart;
