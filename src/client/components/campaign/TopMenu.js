import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { Colors } from '../../lib/Сonstants';

function TopMenu(props) {
  const { history, title } = props;
  return (
    <Box height="45px" position="relative">
      <Box
        px={2}
        height="45px"
        boxSizing="border-box"
        width="100%"
        position="fixed"
        zIndex="1"
        borderBottom={`1px solid ${Colors.grey8}`}
        css={{ backgroundColor: Colors.white }}
        fontWeight="500"
      >
        <Grid container alignItems="center" style={{ height: '100%' }} justify="center">
          <Grid item>{title}</Grid>
        </Grid>
        <Box position="absolute" left="11px" top="8px" onClick={() => { history.goBack(); }}>
          <span uk-icon="icon: chevron-left; ratio: 1.3" />
        </Box>
      </Box>
    </Box>
  );
}

export default TopMenu;
