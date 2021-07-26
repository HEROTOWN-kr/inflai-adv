import React from 'react';
import { HelpOutline } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import analysisStyles from './AnalysisStyle';

const useStyles = makeStyles({
  tooltip: {
    fontSize: 12
  },
  tooltipIcon: {
    color: 'grey',
    marginLeft: '5px'
  },
});

function HelpTooltip(props) {
  const { title } = props;
  const classes = useStyles();

  return (
    <Tooltip title={title} placement="top-start" classes={{ tooltip: classes.tooltip }}>
      <HelpOutline fontSize="small" classes={{ root: classes.tooltipIcon }} />
    </Tooltip>
  );
}

export default HelpTooltip;
