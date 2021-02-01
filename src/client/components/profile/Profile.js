import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Grid, Hidden, useMediaQuery, useTheme
} from '@material-ui/core';
import axios from 'axios';
import { Colors } from '../../lib/Сonstants';
import ProfileMenu from './ProfileMenu';
import ProfileContent from './ProfileContent';
import AuthContext from '../../context/AuthContext';

function Profile(props) {
  const { token } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [currentMenu, setCurrentMenu] = useState(1);
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  async function getUserInfo() {
    try {
      const response = await axios.get('/api/TB_ADVERTISER/UserInfo', { params: { token } });
      const { data } = response.data;
      if (data) {
        setUserInfo(data);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);

  return (
    <Box py={isMD ? 6 : 0} px={isMD ? 1 : 0} css={{ background: isMD ? Colors.grey3 : '#ffffff' }} className="profile">
      <Box maxWidth={{ xs: 1500 }} css={{ margin: '0 auto' }}>
        <Grid container spacing={isMD ? 2 : 0}>
          <Hidden smDown>
            <Grid item>
              <ProfileMenu {...props} userInfo={userInfo} />
            </Grid>
          </Hidden>
          <Grid item zeroMinWidth xs>
            <ProfileContent
              {...props}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              getUserInfo={getUserInfo}
              isMD={isMD}
              isSM={isSM}
              currentMenu={currentMenu}
              setCurrentMenu={setCurrentMenu}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Profile;
