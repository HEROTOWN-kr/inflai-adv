import React, { Fragment, useEffect, useState } from 'react';
import {
  Box, Grid, IconButton,
  Paper, Table, TableBody,
  TableContainer, TableHead, TableRow,
  InputAdornment, CircularProgress
} from '@material-ui/core';
import axios from 'axios';
import { AssessmentRounded } from '@material-ui/icons/';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';
import StyledTableCell from '../../../containers/StyledTableCell';
import MyPagination from '../../../containers/MyPagination';
import AnalysisDialog from '../../Analysis/Youtube/AnalysisDialog';
import StyledIconButton from '../../../containers/StyledIconButton';
import StyledTableSortLabel from '../../../containers/StyledTableSortLabel';
import ReactFormText from '../../../containers/ReactFormText';
import StyledText from '../../../containers/StyledText';

const useStyles = makeStyles({
  root: {
    background: '#ffffff'
  },
  endAdornment: {
    padding: '0'
  },
  tableRowRoot: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#9199b6'
    }
  }
});

const tableRows = {
  title: [
    {
      text: '#',
      align: 'center',
      width: '60px'
    },
    {
      text: '이름',
      align: 'left'
    },
    {
      text: '채널 이름',
      align: 'left',
      width: '250px'
    },
    {
      id: 'YOU_SUBS',
      text: '구독수',
      align: 'center',
      width: '100px'
    },
    {
      id: 'YOU_VIEWS',
      text: '조회수',
      align: 'center',
      width: '100px'
    },
    {
      text: '분석결과',
      align: 'center',
      width: '100px'
    }
  ],
  body: ['rownum', 'INF_NAME', 'YOU_SUBS', 'YOU_VIEWS']
};

const defaultUpdateTime = moment().set({ h: 4, m: 0, s: 0 }).format('YYYY-MM-DD h:mm:ss');

function LoadingComponent() {
  return (
    <Box height={536}>
      <Grid container justify="center" alignItems="center" style={{ height: '100%', maxWidth: 'inherit' }}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </Box>
  );
}

function CampaignParYoutube(props) {
  const { setTab } = props;
  const [youtubeId, setYoutubeId] = useState(null);
  const [influencers, setInfluencers] = useState([]);
  const [updateTime, setUpdateTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [order, setOrder] = useState({ orderBy: 'YOU_SUBS', direction: 'desc' });
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    defaultValues: { searchValue: '' }
  });

  const changePage = (event, value) => {
    setPage(value);
  };

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function getAnalysis(id) {
    setYoutubeId(id);
    toggleDialog();
  }

  function searchFunc(data) {
    const { searchValue } = data;
    setPage(1);
    setSearchWord(searchValue);
  }


  function getInfluencers() {
    setLoading(true);
    axios.get('/api/TB_YOUTUBE/', {
      params: { ...order, searchWord, page }
    }).then((res) => {
      const { list, dbCount } = res.data.data;
      setInfluencers(list);
      setCount(dbCount);
      setLoading(false);
    }).catch((e) => {
      alert(e.response.data.message);
      setLoading(false);
    });
  }

  function getUpdateTime() {
    axios.get('/api/TB_YOUTUBE/getUpdateTime', {
      params: { ...order, searchWord, page }
    }).then((res) => {
      const { updateTime } = res.data;
      setUpdateTime(updateTime);
    }).catch((e) => {
      alert(e.response.data.message);
    });
  }

  function sortTable(id) {
    const isDesc = order.orderBy === id && order.direction === 'desc';
    setOrder({
      orderBy: id,
      direction: isDesc ? 'asc' : 'desc'
    });
  }


  useEffect(() => {
    getUpdateTime();
    setTab(1);
  }, []);

  useEffect(() => {
    getInfluencers();
  }, [order, searchWord, page]);


  return (
    <Box maxWidth={1276} m="0 auto">
      <Box mb={1}>
        <Grid container alignItems="center">
          <Grid item xs container alignItems="center">
            <Grid item>
              <Box width={280}>
                <ReactFormText
                  register={register}
                  errors={errors}
                  name="searchValue"
                  placeholder="검색"
                  InputProps={{
                    classes: { root: classes.root, adornedEnd: classes.endAdornment },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleSubmit(searchFunc)}>
                          <SearchIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      ev.preventDefault();
                      handleSubmit(searchFunc)();
                    }
                  }}
                />
              </Box>
            </Grid>
            { searchWord ? (
              <Grid item>
                <Box ml={2} fontSize={24} color="green">
                  {`(${searchWord}) 검색 결과`}
                </Box>
              </Grid>
            ) : null }

          </Grid>
          <Grid item>
            <StyledText color="#b9b9b9" fontSize="14px">
              {`최근 업데이트: ${updateTime}`}
            </StyledText>
          </Grid>
        </Grid>
      </Box>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Fragment>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  { tableRows.title.map(item => (
                    <StyledTableCell
                      key={item.text}
                      align={item.align}
                      width={item.width}
                    >
                      { item.id ? (
                        <Grid container justify="center">
                          <Grid item>
                            <StyledTableSortLabel
                              id={item.id}
                              color="#66f8ff"
                              active={order.orderBy === item.id}
                              direction={order.orderBy === item.id ? order.direction : 'desc'}
                              onClick={() => sortTable(item.id)}
                            >
                              {item.text}
                            </StyledTableSortLabel>
                          </Grid>
                        </Grid>
                      ) : item.text }
                    </StyledTableCell>
                  )) }
                </TableRow>
              </TableHead>
              <TableBody>
                {influencers.map(row => (
                  <TableRow
                    classes={{ root: classes.tableRowRoot }}
                    key={row.YOU_ID}
                    onClick={() => getAnalysis(row.YOU_ID)}
                  >
                    <StyledTableCell align="center">
                      {row.rownum}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.INF_NAME}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.YOU_NAME}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.YOU_SUBS}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.YOU_VIEWS}
                    </StyledTableCell>
                    <StyledTableCell padding="2px" align="center">
                      <StyledIconButton onClick={() => getAnalysis(row.YOU_ID)}>
                        <AssessmentRounded />
                      </StyledIconButton>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box py={4}>
            <Grid container justify="center">
              <Grid item>
                <MyPagination
                  itemCount={count}
                  page={page}
                  changePage={changePage}
                  perPage={10}
                />
              </Grid>
            </Grid>
          </Box>
        </Fragment>
      )}
      <AnalysisDialog
        open={dialogOpen}
        closeDialog={toggleDialog}
        id={youtubeId}
      />
    </Box>
  );
}

export default CampaignParYoutube;
