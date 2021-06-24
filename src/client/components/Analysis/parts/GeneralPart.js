import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import DoughnutComponent from '../DoughnutComponent';
import analysisStyles from '../AnalysisStyle';


function GeneralPart(props) {
  const classes = analysisStyles();

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default GeneralPart;
