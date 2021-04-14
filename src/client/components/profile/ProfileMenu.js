import React, { useContext } from 'react';
import { Box, Grid } from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Colors } from '../../lib/Сonstants';
import StyledText from '../../containers/StyledText';
import StyledImage from '../../containers/StyledImage';
import defaultAccountImage from '../../img/default_account_image.png';
import WhiteBlock from '../../containers/WhiteBlock';
import AuthContext from '../../context/AuthContext';

function ProfileMenu() {
  const match = useRouteMatch();
  const history = useHistory();
  const { userName, userPhoto, socialType } = useContext(AuthContext);

  const links = [
    { text: '내정보 관리', link: '/UserInfo' },
    { text: '캠페인 관리', link: '/CampaignInfo' },
    { text: '멤버십 관리', link: '/MembershipInfo' }
  ];

  return (
    <Box width={250}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <WhiteBlock p={4}>
            <Box py={5} borderBottom={`1px solid ${Colors.grey4}`} textAlign="center">
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <StyledText fontWeight="500" fontSize="24px">
                          마이페이지
                  </StyledText>
                </Grid>
                <Grid item xs={12}>
                  <Box py={1}>
                    <StyledImage width="110px" height="110px" borderRadius="100%" src={userPhoto || defaultAccountImage} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <StyledText fontSize="16px" fontWeight="600">
                    {userName}
                  </StyledText>
                </Grid>
                <Grid item xs={12}>
                  <StyledText fontSize="14px">
                    {`${socialType} 로그인`}
                  </StyledText>
                </Grid>
              </Grid>
            </Box>
            <Box p={2}>
                  받은쪽지
            </Box>
          </WhiteBlock>
        </Grid>
        <Grid item xs={12}>
          <WhiteBlock>
            {links.map((item, index) => (
              <Box
                key={item.text}
                py={2}
                px={3}
                borderTop={index !== 0 ? `1px solid ${Colors.grey4}` : null}
                onClick={event => history.push(match.url + item.link)}
                className="profile-menu-link"
              >
                <StyledText fontSize="18px">
                  {item.text}
                </StyledText>
              </Box>
            ))}
          </WhiteBlock>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfileMenu;
