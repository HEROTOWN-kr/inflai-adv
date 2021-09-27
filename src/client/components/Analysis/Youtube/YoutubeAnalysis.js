import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NotificationsNone } from '@material-ui/icons';
import axios from 'axios';

const useStyles = makeStyles({
  box: {
    padding: '15px 25px',
    color: '#fff',
    borderRadius: '5px'
  },
  boxTitle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
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
    Like_count: {},
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
    <Box maxWidth={1500} m="0 auto" px={2}>
      <Box my="30px">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box className={`${classes.box} ${classes.bgBlue}`}>
              <Box mb={1}>
                Channel name
              </Box>
              <Grid container spacing={2}>
                <Grid item>
                  <img width={70} height={70} className={classes.avatar} src={youtubeInfo.channel_info.Avatar_url} alt="noImage" />
                </Grid>
                <Grid item xs><Box maxWidth="300px" fontSize={28} fontWeight="bold" className={classes.boxTitle}>대가들이사는마을</Box></Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box className={`${classes.box} ${classes.bgGreen}`}>
              <Box mb={1}>
                Subscriber-count
              </Box>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <NotificationsNone fontSize="large" />
                </Grid>
                <Grid item><Box fontSize={28} fontWeight="bold" className={classes.boxTitle}>200</Box></Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box className={`${classes.box} ${classes.bgOrange}`}>
              <Box mb={1}>
                Recent View-count(accumulation)
              </Box>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <NotificationsNone fontSize="large" />
                </Grid>
                <Grid item><Box fontSize={28} fontWeight="bold" className={classes.boxTitle}>200</Box></Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box className={`${classes.box} ${classes.bgRed}`}>
              <Box mb={1}>
                Recent Like-count(accumulation)
              </Box>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <NotificationsNone fontSize="large" />
                </Grid>
                <Grid item><Box fontSize={28} fontWeight="bold" className={classes.boxTitle}>200</Box></Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default YoutubeAnalysis;
