import { Box } from '@material-ui/core';
import React from 'react';
import StyledText from '../../../../containers/StyledText';

function LabelComponent(props) {
  const { labelName } = props;
  return (
    <Box width="175px">
      <StyledText fontSize="15px">
        {labelName}
      </StyledText>
    </Box>
  );
}

export default LabelComponent;
