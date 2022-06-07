import React, { useState } from 'react';
import {
  Box, Button, Grid, InputAdornment, makeStyles, OutlinedInput,
} from '@material-ui/core';
import { Assessment, Instagram } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const useStyles = makeStyles({
  input: {
    padding: '15px 14px 15px 0'
  }
});

function InstagramAnalytics(props) {
  const [userName, setUserName] = useState(null);
  const [instaData, setInstaData] = useState({});
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  function getInstaData() {
    if (!userName) {
      enqueueSnackbar('계정 이름을 입력해주세요', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
      return;
    }

    axios.get('/api/testRoute/test', {
      params: { username: userName }
    }).then((res) => {
      const { profile } = res.data;
      setInstaData(profile);
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  return (
    <Box>
      <Box
        maxWidth={1200}
        mt={5}
        mx="auto"
        p={2}
        bgcolor="#fff"
        border="1px solid #ddd"
        borderRadius="10px"
      >
        <Grid container spacing={1} justify="center">
          <Grid item>
            <form noValidate autoComplete="off">
              <OutlinedInput
                placeholder="ex) herotown_kr"
                startAdornment={(
                  <InputAdornment position="start">
                    <Instagram />
                  </InputAdornment>
                )}
                endAdornment={(
                  <InputAdornment position="end">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={getInstaData}
                    >
                        분석
                    </Button>
                  </InputAdornment>
                )}
                onChange={e => setUserName(e.target.value)}
                classes={{ input: classes.input }}
              />
            </form>
          </Grid>
          <Grid item />
        </Grid>
      </Box>
      <Box
        mt={2}
        maxWidth={1200}
        mx="auto"
        p={2}
        bgcolor="#fff"
        border="1px solid #ddd"
        borderRadius="10px"
      >
        <pre>
          {JSON.stringify(instaData, null, 2)}
        </pre>
      </Box>

    </Box>
  );
}

export default InstagramAnalytics;
