import React from 'react';
import { HelpOutline } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import analysisStyles from './AnalysisStyle';

function HelpTooltip(props) {
  const { title } = props;
  const classes = analysisStyles();

  return (
    <Tooltip title={title} placement="top-start" classes={{ tooltip: classes.tooltip }}>
      <HelpOutline fontSize="small" classes={{ root: classes.tooltipIcon }} />
    </Tooltip>
  );
}

export default HelpTooltip;
