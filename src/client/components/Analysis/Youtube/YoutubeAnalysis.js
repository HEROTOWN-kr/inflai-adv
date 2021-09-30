import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NotificationsNone, RemoveRedEyeOutlined, ThumbUpOutlined } from '@material-ui/icons';
import axios from 'axios';
import defaultAccountImage from '../../../img/default_account_image.png';

const useStyles = makeStyles({
  box: {
    padding: '15px 25px',
    color: '#fff',
    borderRadius: '5px',
    boxSizing: 'border-box',
    height: '100%'
  },
  boxTitle: {
    // overflow: 'hidden',
    // whiteSpace: 'nowrap',
    // textOverflow: 'ellipsis',
  },
  bgBlue: { background: 'linear-gradient(45deg, #4099ff, #73b4ff)' },
  bgGreen: { background: 'linear-gradient(45deg, #2ed8b6, #59e0c5)' },
  bgOrange: { background: 'linear-gradient(45deg, #FFB64D, #ffcb80)' },
  bgRed: { background: 'linear-gradient(45deg, #FF5370, #ff869a)' },
  avatar: { borderRadius: '50%' }
});


const defaultValues = {
  comment_prediction: {
    Negative: {},
    Positive: {}
  },
  title_prediction: {},
  content_primary_prediction: {},
  content_second_prediction: {},
  videos_info: {
    Channel_id: {},
    Sequence: {},
    Name: {},
    Video_link: {},
    Number_of_comments: {},
    View_count: {},
    viewCountSum: 0,
    Like_count: {},
    likeCountSum: 0,
    Dislike_count: {},
    Youtube_average_rating: {},
    Upload_date: {},
    Upload_datetime: {}
  },
  channel_info: {}
};

function YoutubeAnalysis(props) {
  const [youtubeInfo, setYoutubeInfo] = useState(defaultValues);
  const classes = useStyles();

  function getYoutubeInfo() {
    axios.get('/api/testRoute/getYoutubeFile').then((res) => {
      const { data } = res.data;
      setYoutubeInfo(data);
    }).catch(err => alert(err.response.data.message));
  }

  useEffect(() => {
    getYoutubeInfo();
  }, []);

  return (
    <Box bgcolor="#f6f7fb" py="30px">
      <Box maxWidth={1500} m="0 auto">
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Box className={`${classes.box} ${classes.bgBlue}`}>
              <Grid container alignItems="center" style={{ height: '100%' }}>
                <Grid item>
                  <img width={70} height={70} className={classes.avatar} src={youtubeInfo.channel_info.Avatar_url || defaultAccountImage} alt="noImage" />
                </Grid>
                <Grid item xs>
                  <Box
                    maxWidth="300px"
                    ml={2}
                    fontSize={25}
                    fontWeight="bold"
                    className={classes.boxTitle}
                  >
                    {youtubeInfo.channel_info.Name}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box className={`${classes.box} ${classes.bgGreen}`}>
              <Box mb={1}>
                    팔로워수
              </Box>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <NotificationsNone fontSize="large" />
                </Grid>
                <Grid item>
                  <Box fontSize={28} fontWeight="bold" className={classes.boxTitle}>
                    {youtubeInfo.channel_info.Number_of_subscribe}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box className={`${classes.box} ${classes.bgOrange}`}>
              <Box mb={1}>
                    최근 조회수(누적)
              </Box>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <RemoveRedEyeOutlined fontSize="large" />
                </Grid>
                <Grid item>
                  <Box fontSize={28} fontWeight="bold" className={classes.boxTitle}>
                    {youtubeInfo.videos_info.viewCountSum}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box className={`${classes.box} ${classes.bgRed}`}>
              <Box mb={1}>
                    최근 좋아요 수(누적)
              </Box>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <ThumbUpOutlined fontSize="large" />
                </Grid>
                <Grid item>
                  <Box fontSize={28} fontWeight="bold" className={classes.boxTitle}>
                    {youtubeInfo.videos_info.likeCountSum}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box my={3}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box p={3} bgcolor="#FFF">
                <Box fontSize="20px" fontWeight="600">최근 10개의 비디오 콘텐츠 3862 클래스 추론</Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box p={3} bgcolor="#FFF">
                <Box fontSize="20px" fontWeight="600">최근 10개의 비디오 콘텐츠 26 클래스 추론</Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default YoutubeAnalysis;
