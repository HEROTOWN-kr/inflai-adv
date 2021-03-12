import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Table, TableBody, TableHead, TableRow
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import StyledTableCell from '../../../containers/StyledTableCell';
import StyledTableRow from '../../../containers/StyledTableRow';
import StyledText from '../../../containers/StyledText';
import MyPagination from '../../../containers/MyPagination';
import StyledLink from '../../../containers/StyledLink';
import StyledTableSortLabel from '../../../containers/StyledTableSortLabel';
import StyledButton from '../../../containers/StyledButton';
import InsightDialog from './InsightDialog';
import { AdvertiseTypes, Colors } from '../../../lib/Сonstants';
import ConfirmDialog from '../../../containers/ConfirmDialog';
import StyledSelect from '../../../containers/StyledSelect';

const tableHeader = [
  {
    text: '번호',
    align: 'center',
    width: '40px'
  },
  {
    text: '이름',
    align: 'center'
  },
  /* {
    text: '인스타계정',
    align: 'center'
  }, */
  {
    text: '팔로워수',
    align: 'center',
    colName: 'INS_FLWR'
  },
  {
    text: '좋아요수',
    align: 'center',
    colName: 'INS_LIKES',
  },
  {
    text: '댓글수',
    align: 'center',
    colName: 'INS_CMNT',
  },
  {
    text: '게시물',
    align: 'center',
    width: '70px',
    colName: 'INS_MEDIA_CNT',
  },
  {
    text: 'AI 종합 점수',
    align: 'center',
    colName: 'INS_SCORE',
  },
  {
    text: '분석',
    align: 'center',
    width: '50px',
  },
  {
    text: '선정',
    align: 'center',
    width: '50px',
  }
];

function CampaignParInsta() {
  const [participants, setParticipants] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState({ orderBy: 'INS_FLWR', direction: 'desc' });
  const params = useParams();
  const history = useHistory();
  const adId = params.id;
  const limit = 10;

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function toggleConfirmDialog() {
    setConfirmDialogOpen(!confirmDialogOpen);
  }

  function getParticipants() {
    axios.get('/api/TB_PARTICIPANT/getListInsta', {
      params: {
        ...order, adId, limit, page
      }
    }).then((res) => {
      setParticipants(res.data.data);
      setCount(res.data.count);
    });
  }

  useEffect(() => {
    getParticipants();
  }, [order, page]);

  const changePage = (event, value) => {
    setPage(value);
  };

  function sortTable(id) {
    let isDesc = order.orderBy === id && order.direction === 'desc';
    if (order.orderBy !== 'INS_RANK' && id === 'INS_RANK') isDesc = true;
    setPage(1);
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

  function clickInfo(id) {
    setSelectedId(id);
    toggleDialog();
  }

  function clickSelect(id) {
    setSelectedId(id);
    toggleConfirmDialog();
  }

  function selectBoxChange(event) {
    setOrder({ ...order, orderBy: event.target.value });
  }

  return (
    <Box my={{ xs: 0, sm: 4 }} boxSizing="border-box" maxWidth={1200} css={{ margin: '0 auto' }}>
      <Box mb={1}>
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
              <option value="INS_FLWR">팔로워수</option>
              <option value="INS_LIKES">좋아요수</option>
              <option value="INS_CMNT">댓글수</option>
              <option value="INS_SCORE">점수</option>
              {/* <option value="INS_RANK">순위</option> */}
            </StyledSelect>
          </Grid>
        </Grid>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeader.map(item => (
              <StyledTableCell key={item.text} align={item.align} width={item.width || null}>
                {item.colName ? (
                  <StyledTableSortLabel
                    color="#66f8ff"
                    active={order.orderBy === item.colName}
                    direction={order.orderBy === item.colName ? order.direction : 'desc'}
                    onClick={() => sortTable(item.colName)}
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
            <StyledTableRow
              hover
              key={row.id}
              onClick={(event) => {}}
            >
              <StyledTableCell align="center">
                <StyledText textAlign="center">
                  {row.rownum}
                </StyledText>
              </StyledTableCell>
              <StyledTableCell align="center">
                <StyledText textAlign="center">
                  {row.PAR_NAME || '-'}
                </StyledText>
              </StyledTableCell>
              {/* <StyledTableCell align="center">
                {row.INS_USERNAME ? (
                  <StyledLink
                    href={`https://www.instagram.com/${row.INS_USERNAME}/`}
                    target="_blank"
                  >
                    {`@${row.INS_USERNAME}`}
                  </StyledLink>
                ) : (
                  <StyledText textAlign="center">-</StyledText>
                )}
              </StyledTableCell> */}
              <StyledTableCell align="center">
                <StyledText textAlign="center">
                  {row.INS_FLWR || '-'}
                </StyledText>
              </StyledTableCell>
              <StyledTableCell align="center">
                <StyledText textAlign="center">
                  {row.INS_LIKES || '-'}
                </StyledText>
              </StyledTableCell>
              <StyledTableCell align="center">
                <StyledText textAlign="center">
                  {row.INS_CMNT || '-'}
                </StyledText>
              </StyledTableCell>
              <StyledTableCell align="center">
                <StyledText textAlign="center">
                  {row.INS_MEDIA_CNT || '-'}
                </StyledText>
              </StyledTableCell>
              <StyledTableCell align="center">
                <StyledText textAlign="center">
                  {row.INS_SCORE || '-'}
                </StyledText>
              </StyledTableCell>
              <StyledTableCell align="center">
                <StyledButton
                  height="25px"
                  padding="0px 5px"
                  onClick={() => clickInfo(row.INF_ID)}
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
      <InsightDialog open={dialogOpen} closeDialog={toggleDialog} selectedId={selectedId} />
      <ConfirmDialog
        open={confirmDialogOpen}
        closeDialog={toggleConfirmDialog}
        dialogText="선정하시겠습니까?"
        onConfirm={selectParticipant}
      />
    </Box>
  );
}

export default CampaignParInsta;
