import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import StyledImage from '../../../containers/StyledImage';
import BarComponent from '../BarComponent';

function PostPart(props) {
  const { testImage, instaData } = props;

  const { mediaData } = instaData;

  return (
    <React.Fragment>
      <Box mt="80px" mb="24px" pl="10px" borderLeft="4px solid #6E0FFF">
        <Typography variant="h6">포스팅 분석</Typography>
      </Box>
      <Box mb="50px">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              {mediaData.urls.map(item => (
                <Grid key={item} item xs={4}>
                  <StyledImage borderRadius="7px" width="100%" height="auto" src={item || testImage} />
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
            <BarComponent data={instaData.activity} options={instaData.activityOpt} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2" paragraph>시간별 포스팅 성향</Typography>
          <Box p="20px" pt="40px" bgcolor="#FFF" borderRadius="7px">
            <BarComponent data={instaData.activity} options={instaData.activityOpt} />
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
    </React.Fragment>
  );
}

export default PostPart;
