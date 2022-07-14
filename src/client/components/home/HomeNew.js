import React from 'react';
import {
  Box, Button, Grid, makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MainBg from '../../img/bg/mainBg.png';
import Logo from '../../img/logo_blue.png';
import IconStartUp from '../../img/iconStartUp.png';

const defaultMenuLinks = [
  {
    text: '인플루언서 모집',
    link: '/Campaign'
  },
  {
    text: '요금제',
    link: '/Membership'
  },
  {
    text: '인플루언서 관리',
    link: '/Profile/CampaignInfo'
  }
];

const useStyles = makeStyles(theme => ({
  start: {
    height: '100vh',
    background: `url(${MainBg}) center`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    padding: '38px 100px'
  },
  startWrapper: {
    color: '#000',
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
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  navbarLinks: {
    background: '#fff',
    width: '425px',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '10px',
    padding: '10px 40px',
  },
  link: {
    textDecoration: 'none',
    color: '#000'
  }
}));

function HomeNew(props) {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.start}>
        <Box className={classes.navbar}>
          <img src={Logo} alt="noLogo" />
          <Box className={classes.navbarLinks}>
            { defaultMenuLinks.map(link => (
              <Link
                className={classes.link}
                to={link.link}
              >
                {link.text}
              </Link>
            ))}
          </Box>
        </Box>
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
        <Box height="44px" />
      </Box>
      <Box bgcolor="#DBE2F8">
        analyse
      </Box>

    </>

  );
}

export default HomeNew;
