import React, { useContext } from 'react';
import { Box, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../../lib/Сonstants';
import StyledImage from '../../../containers/StyledImage';
import MobileLogo from '../../../img/mobile-logo.png';
import StyledText from '../../../containers/StyledText';
import AuthContext from '../../../context/AuthContext';

function MobileNavBar() {
  const history = useHistory();
  const { isAuthenticated } = useContext(AuthContext);
  function LoginButtonClick() {
    history.push('/Login');
  }

  return (
    <Box
      position="relative"
      height="53px"
      width="100%"
    >
      <Box
        px={2}
        py={2}
        width="calc(100% - 32px)"
        position="fixed"
        zIndex="1"
        borderBottom={`1px solid ${Colors.grey8}`}
        css={{ backgroundColor: Colors.white }}
      >
        <StyledImage width="135px" height="20px" src={MobileLogo} onClick={() => history.push('/')} />
        {
          isAuthenticated ? null : (
            <Box position="absolute" right="16px" top="6px" width="35px" onClick={LoginButtonClick}>
              <span uk-icon="icon: sign-in; ratio: 1.3" />
              <StyledText fontSize="12">로그인</StyledText>
            </Box>
          )
        }
      </Box>
    </Box>
  );
}

export default MobileNavBar;
