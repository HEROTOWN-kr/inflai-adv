import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  outlined: {
    backgroundColor: '#fff'
  }
});

function MyPagination(props) {
  const {
    page, changePage, perPage, itemCount
  } = props;
  const classes = useStyles();
  const pageCount = Math.ceil(itemCount / perPage);
  return (
    <Pagination
      variant="outlined"
      shape="rounded"
      color="primary"
      count={pageCount}
      page={page}
      onChange={changePage}
      renderItem={item => <PaginationItem {...item} classes={{ outlined: classes.outlined }} />}
    />
  );
}

export default MyPagination;
