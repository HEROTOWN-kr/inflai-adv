import React from 'react';
import { Box } from '@material-ui/core';
import StyledText from '../../../containers/StyledText';
import Partners from '../../../img/Partners.jpg';
import StyledImage from '../../../containers/StyledImage';

function HomePartners(props) {
  const { isMD } = props;

  return (
    <Box padding={{ xs: '32px 16px', md: '100px 16px' }} textAlign="center">
      <Box fontSize={{ xs: '5vw', md: '36px' }}>Partners</Box>
      <Box margin="0 auto" mt={{ xs: 3, md: 6 }} maxWidth="1100px">
        <StyledImage width="100%" src={Partners} />
      </Box>
    </Box>
  );
}

export default HomePartners;
