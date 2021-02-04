import { makeStyles, TableSortLabel } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: ({ color }) => ({
    '&.MuiTableSortLabel-active': {
      color: color || 'white',
    },
    '&:hover': {
      color: color || 'white',
    }
  }),
  icon: ({ color }) => ({
    '& path': {
      fill: color || 'white',
    },
  }),
  active: ({ color }) => ({
    color: color || 'white',
  }),
});

function StyledTableSortLabel(props) {
  const {
    color, children, ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <TableSortLabel classes={classes} {...rest}>
      {children}
    </TableSortLabel>
  );
}

export default StyledTableSortLabel;
