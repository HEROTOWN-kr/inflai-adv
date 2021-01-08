import React from 'react';
import { Box } from '@material-ui/core';
import StyledText from '../../../containers/StyledText';
import Partners from '../../../img/Partners.jpg';
import StyledImage from '../../../containers/StyledImage';

function HomePartners() {
  return (
    <Box padding="100px 0" textAlign="center">
      <StyledText fontSize="36">Partners</StyledText>
      <Box margin="0 auto" mt={6} maxWidth="1100px">
        <StyledImage width="100%" src={Partners} />
      </Box>
    </Box>
  );
}

export default HomePartners;
