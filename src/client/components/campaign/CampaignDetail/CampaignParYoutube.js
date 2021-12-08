import React, { Fragment, useEffect, useState } from 'react';
import {
  Box, Grid, Table, TableBody,
  TableHead, TableRow, CircularProgress
} from '@material-ui/core';
import axios from 'axios';
import { AssessmentRounded } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import StyledTableCell from '../../../containers/StyledTableCell';
import MyPagination from '../../../containers/MyPagination';
import AnalysisDialog from '../../Analysis/Youtube/AnalysisDialog';
import StyledIconButton from '../../../containers/StyledIconButton';
import StyledTableSortLabel from '../../../containers/StyledTableSortLabel';
import ReactFormText from '../../../containers/ReactFormText';
import StyledText from '../../../containers/StyledText';
import StyledSelect from '../../../containers/StyledSelect';
import StyledTableRow from '../../../containers/StyledTableRow';
import StyledButton from '../../../containers/StyledButton';
import { Colors } from '../../../lib/Сonstants';
import InsightDialog from './InsightDialog';
import ConfirmDialog from '../../../containers/ConfirmDialog';

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

const tableRows = [
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
    text: '분석',
    align: 'center',
    width: '50px'
  },
  {
    text: '선정',
    align: 'center',
    width: '50px',
  }
];

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
  const [selectedId, setSelectedId] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({ orderBy: 'YOU_SUBS', direction: 'desc' });
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const params = useParams();
  const history = useHistory();
  const adId = params.id;
  const classes = useStyles();

  const limit = 10;

  const changePage = (event, value) => {
    setPage(value);
  };

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function toggleConfirmDialog() {
    setConfirmDialogOpen(!confirmDialogOpen);
  }

  function getAnalysis(id) {
    setSelectedId(id);
    toggleDialog();
  }

  function getParticipants() {
    setLoading(true);
    axios.get('/api/TB_PARTICIPANT/getListYoutube', {
      params: {
        ...order, adId, limit, page
      }
    }).then((res) => {
      setParticipants(res.data.data);
      setCount(res.data.count);
    }).catch((e) => {
      alert(e.response.data.message);
    }).then(() => {
      setLoading(false);
    });
  }

  function sortTable(id) {
    const isDesc = order.orderBy === id && order.direction === 'desc';
    setOrder({
      orderBy: id,
      direction: isDesc ? 'asc' : 'desc'
    });
  }

  function selectParticipant() {
    axios.post('/api/TB_PARTICIPANT/change', { adId, participantId: selectedId }).then((res) => {
      if (res.status === 201) {
        alert(res.data.message);
      } else {
        getParticipants();
      }
    }).catch(err => alert(err.response.data.message));
  }

  function selectBoxChange(event) {
    setOrder({ ...order, orderBy: event.target.value });
  }

  function clickSelect(id) {
    setSelectedId(id);
    toggleConfirmDialog();
  }

  useEffect(() => {
    getParticipants();
  }, [order, page]);

  return participants.length > 0 ? (
    <Fragment>
      <Box mt={2} mb={1}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>※ 신청한 고객들의 카테고리별 분석자료를 각각 보실 수 있습니다.</Grid>
          <Grid item>
            <StyledSelect
              native
              variant="outlined"
              value={order.orderBy}
              onChange={selectBoxChange}
              fullWidth
            >
              <option value="YOU_SUBS">구독수</option>
              <option value="YOU_VIEWS">조회수</option>
            </StyledSelect>
          </Grid>
        </Grid>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            {tableRows.map(item => (
              <StyledTableCell key={item.text} align={item.align} width={item.width || null}>
                {item.id ? (
                  <StyledTableSortLabel
                    color="#66f8ff"
                    active={order.orderBy === item.id}
                    direction={order.orderBy === item.id ? order.direction : 'desc'}
                    onClick={() => sortTable(item.id)}
                  >
                    {item.text}
                  </StyledTableSortLabel>
                ) : item.text}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map(row => (
            <StyledTableRow hover key={row.id}>
              <StyledTableCell align="center">
                {row.rownum}
              </StyledTableCell>
              <StyledTableCell>
                {row.PAR_NAME}
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
              <StyledTableCell align="center">
                <StyledButton
                  height="25px"
                  padding="0px 5px"
                  onClick={() => getAnalysis(row.YOU_ID)}
                >
                      분석
                </StyledButton>
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.PAR_STATUS === '1' ? (
                  <StyledButton
                    background={Colors.green}
                    hoverBackground={Colors.greenHover}
                    height="25px"
                    padding="0px 5px"
                    onClick={() => clickSelect(row.PAR_ID)}
                  >
                          선정
                  </StyledButton>
                ) : (
                  <StyledText color={Colors.green}>선정됨</StyledText>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Box py={4}>
        <Grid container justify="center">
          <Grid item>
            <MyPagination
              itemCount={count}
              page={page}
              changePage={changePage}
              perPage={limit}
            />
          </Grid>
        </Grid>
      </Box>
      <AnalysisDialog open={dialogOpen} closeDialog={toggleDialog} id={selectedId} />
      <ConfirmDialog
        open={confirmDialogOpen}
        closeDialog={toggleConfirmDialog}
        dialogText="선정하시겠습니까?"
        onConfirm={selectParticipant}
      />
    </Fragment>
  ) : (
    <Box textAlign="center" my={4}>신청한 리뷰어 없습니다</Box>
  );
}

export default CampaignParYoutube;
