import React, { useContext } from 'react';
import { Box, Grid } from '@material-ui/core';
import StyledImage from '../../../containers/StyledImage';
import defaultAccountImage from '../../../img/default_account_image.png';
import StyledText from '../../../containers/StyledText';
import { Colors } from '../../../lib/Сonstants';
import myPageBg from '../../../img/myPageBg.jpg';
import AuthContext from '../../../context/AuthContext';

const arrowIcon = 'icon: chevron-right; ratio: 1';

const mainLinks = [
  {
    icon: 'icon: world; ratio: 1.2',
    text: '랭킹정보',
    link: '/Profile/Rank'
  },
  {
    icon: 'icon: mail; ratio: 1.2',
    text: '받은메시지',
    link: '/'
  },
  {
    icon: 'icon: heart; ratio: 1.2',
    text: '스크랩북',
    link: '/Profile/Favorite'
  }
];

const menuLinks = [
  {
    text: '내정보 관리',
    link: '/Profile/UserInfo'
  },
  {
    text: '캠페인 관리',
    link: '/Profile/CampaignInfo'
  },
  {
    text: '멤버십 관리',
    link: '/Profile/MembershipInfo'
  },
];

function MyPage(props) {
  const { history, userInfo, match } = props;
  const { logout } = useContext(AuthContext);
  const { Kakao, gapi, FB } = window;

  function clickLogout() {
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.getAuthInstance({
        client_id: '997274422725-gb40o5tv579csr09ch7q8an63tfmjgfo.apps.googleusercontent.com'
      });
      if (auth2) {
        auth2.disconnect();
      }
    });
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        FB.logout();
      }
    });
    if (Kakao.Auth.getAccessToken()) {
      Kakao.Auth.logout(() => {
        // console.log(Kakao.Auth.getAccessToken());
      });
    }
    logout();
    history.push('/');
  }

  return (
    <React.Fragment>
      <Box
        px={{ xs: 0, sm: 4 }}
        py={4}
        textAlign="center"
        color="#ddd"
        css={{ background: `#333 url(${myPageBg}) 50% no-repeat`, backgroundSize: 'cover' }}
      >
        <StyledImage width="68px" height="68px" borderRadius="100%" src={userInfo.INF_PHOTO || defaultAccountImage} />
        <Box mt={1}>
          <StyledText color="#ffffff" fontSize="20" fontWeight="600">
            {userInfo.INF_NAME}
          </StyledText>
        </Box>
        <Box mt={6}>
          <Grid container>
            {mainLinks.map((item, index) => (
              <Grid key={item.text} item xs={4}>
                <Box
                  borderRight={index !== 2 ? `1px solid ${Colors.grey8}` : 'medium none color'}
                  onClick={() => history.push(item.link)}
                >
                  <span uk-icon={item.icon} />
                  <Box mt={1}>
                    <StyledText color="#ddd">{item.text}</StyledText>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box borderTop={`1px solid ${Colors.grey8}`} borderBottom={`1px solid ${Colors.grey8}`} css={{ background: '#fff' }}>
        {menuLinks.map((item, index) => (
          <Box
            key={item.text}
            px={2}
            py={1}
            borderBottom={`1px solid ${Colors.grey8}`}
            onClick={() => history.push(item.link)}
          >
            <Grid container justify="space-between" alignItems="center">
              <Grid item><StyledText fontSize="14">{item.text}</StyledText></Grid>
              <Grid item><span uk-icon={arrowIcon} /></Grid>
            </Grid>
          </Box>
        ))}
        <Box
          px={2}
          py={1}
          onClick={clickLogout}
        >
          <Grid container justify="space-between" alignItems="center">
            <Grid item><StyledText fontSize="14">로그아웃</StyledText></Grid>
            <Grid item><span uk-icon={arrowIcon} /></Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default MyPage;
