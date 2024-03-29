import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowForward } from '@material-ui/icons';
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
import InstaInsightDialog from './InstaInsightDialog';

const tableHeader = [
  {
    text: '번호',
    align: 'center',
    width: '40px'
  },
  {
    text: '이름',
    align: 'center',
    width: '60px',
  },
  /* {
    text: '인스타계정',
    align: 'center'
  }, */
  {
    text: '팔로워수',
    align: 'center',
    colName: 'INS_FLWR',
    width: '83px',
  },
  {
    text: '좋아요수',
    align: 'center',
    colName: 'INS_LIKES',
    width: '83px',
  },
  {
    text: '댓글수',
    align: 'center',
    colName: 'INS_CMNT',
    width: '83px',
  },
  {
    text: '게시물',
    align: 'center',
    colName: 'INS_MEDIA_CNT',
    width: '70px',
  },
  {
    text: 'AI 종합 점수',
    align: 'center',
    colName: 'INS_SCORE',
    width: '105px',
  },
  {
    text: '소통 지수',
    align: 'center',
    colName: 'INS_COMMUNICATE',
    width: '50px',
  },
  {
    text: '요약',
    align: 'center',
    width: '50px',
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

const useStyles = makeStyles({
  checkboxLabel: {
    marginRight: 0
  }
});

function CampaignParInsta() {
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [instaDialogOpen, setInstaDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState({ orderBy: 'INS_FLWR', direction: 'desc' });
  const params = useParams();
  const adId = params.id;
  const limit = 10;
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function toggleInstaDialog() {
    setInstaDialogOpen(!instaDialogOpen);
  }

  function toggleConfirmDialog() {
    setConfirmDialogOpen(!confirmDialogOpen);
  }

  function getParticipants() {
    const resParams = {
      ...order, adId, limit, page
    };
    if (selected) resParams.selected = '1';

    axios.get('/api/TB_PARTICIPANT/getListInsta', {
      params: resParams
    }).then((res) => {
      setParticipants(res.data.data);
      setCount(res.data.count);
    });
  }

  useEffect(() => {
    getParticipants();
  }, [order, page, selected]);

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

  function clickInstaInfo(id) {
    setSelectedId(id);
    toggleInstaDialog();
  }

  function selectBoxChange(event) {
    setOrder({ ...order, orderBy: event.target.value });
  }

  return (
    <Box my={{ xs: 2, sm: 4 }} boxSizing="border-box" maxWidth={1200} css={{ margin: '0 auto' }}>
      <Box mb={1}>
        <Grid container justify="space-between" alignItems="center">
          {isMD ? (
            <Grid item>
              {isMD ? '※ 신청한 고객들의 카테고리별 분석자료를 각각 보실 수 있습니다.' : '※ 분석 자료'}
            </Grid>
          ) : null}
          <Grid item>
            <Grid container spacing={1}>
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
              <Grid item>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={selected}
                      onChange={() => setSelected(!selected)}
                      name="checkedB"
                      color="secondary"
                    />
                    )}
                  label="선정자"
                  classes={{ root: classes.checkboxLabel }}
                />
              </Grid>
            </Grid>


          </Grid>
          {isMD ? null : (
            <Grid item>
              <ArrowForward />
            </Grid>
          )}
        </Grid>
      </Box>
      <TableContainer>
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
                      <Box minWidth={item.width ? { xs: item.width, md: 'auto' } : 'auto'}>
                        {item.text}
                      </Box>
                    </StyledTableSortLabel>
                  ) : (
                    <Box minWidth={item.width ? { xs: item.width, md: 'auto' } : 'auto'}>
                      {item.text}
                    </Box>
                  )}
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
                    {row.INS_FLWR ? row.INS_FLWR.toLocaleString('en') : '-'}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledText textAlign="center">
                    {row.INS_LIKES ? row.INS_LIKES.toLocaleString('en') : '-'}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledText textAlign="center">
                    {row.INS_CMNT ? row.INS_CMNT.toLocaleString('en') : '-'}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledText textAlign="center">
                    {row.INS_MEDIA_CNT ? row.INS_MEDIA_CNT.toLocaleString('en') : '-'}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledText textAlign="center">
                    {row.INS_SCORE ? row.INS_SCORE.toLocaleString('en') : '-'}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledText textAlign="center">
                    {row.INS_COMMUNICATE ? `${row.INS_COMMUNICATE.toLocaleString('en')}%` : '-'}
                  </StyledText>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledButton
                    height="25px"
                    padding="0px 5px"
                    onClick={() => clickInfo(row.INF_ID)}
                  >
                      요약
                  </StyledButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StyledButton
                    height="25px"
                    padding="0px 5px"
                    onClick={() => clickInstaInfo(row.INF_ID)}
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
      </TableContainer>
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
      <InstaInsightDialog open={instaDialogOpen} handleClose={toggleInstaDialog} INS_ID={selectedId} />
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
