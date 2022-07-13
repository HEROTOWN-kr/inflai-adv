import React from 'react';
import {
  Box, Button, Grid, makeStyles
} from '@material-ui/core';
import MainBg from '../../img/bg/mainBg.png';
import IconStartUp from '../../img/iconStartUp.png';

const useStyles = makeStyles(theme => ({
  start: {
    height: '100vh',
    background: `url(${MainBg}) center`,
    backgroundSize: 'cover'
  },
  startWrapper: {
    color: '#000',
    padding: '0 100px',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  startName: {
    fontSize: '91px',
    fontWeight: '500',
    marginBottom: '33px',
    '&:first-letter': {
      marginLeft: '-5px'
    }
  },
  startImage: {
    /* position: 'absolute',
    top: '20px',
    right: '20px', */
    width: '580px',
    height: 'auto',
    objectFit: 'cover',
    objectPosition: '50% 50%',
  },
  orangeButton: {
    height: '60px',
    width: '220px',
    borderRadius: '30px',
    fontSize: '26px',
    fontWeight: '600',
    backgroundColor: '#FFB900',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#e9a900'
    }
  },
  whiteButton: {
    height: '60px',
    width: '220px',
    borderRadius: '30px',
    fontSize: '26px',
    fontWeight: '600',
    border: '3px solid'
  }
}));

function HomeNew(props) {
  const classes = useStyles();
  return (
    <div>
      <Box className={classes.start}>
        <Box className={classes.startWrapper}>
          <Box>
            <Box className={classes.startName}>인플라이</Box>
            <Box fontSize="36px">인공지능으로 추천하는</Box>
            <Box fontSize="36px" mb="70px">최적의 인플루언서 매칭 플랫폼</Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    classes={{ contained: classes.orangeButton }}
                  >
                    분석
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    classes={{ outlined: classes.whiteButton }}
                  >
                    시작
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <img className={classes.startImage} src={IconStartUp} alt="noImg" />
        </Box>
      </Box>

      <Box>

      </Box>
    </div>
  );
}

export default HomeNew;
