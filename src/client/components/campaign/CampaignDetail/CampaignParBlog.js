import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Checkbox, FormControlLabel, Grid, makeStyles, Table, TableBody, TableHead, TableRow, useMediaQuery, useTheme
} from '@material-ui/core';
import StyledTableCell from '../../../containers/StyledTableCell';
import StyledTableRow from '../../../containers/StyledTableRow';
import StyledText from '../../../containers/StyledText';
import StyledLink from '../../../containers/StyledLink';
import MyPagination from '../../../containers/MyPagination';
import StyledButton from '../../../containers/StyledButton';
import { Colors } from '../../../lib/Сonstants';
import ConfirmDialog from '../../../containers/ConfirmDialog';
import StyledTableSortLabel from '../../../containers/StyledTableSortLabel';
import StyledSelect from '../../../containers/StyledSelect';

const tableHeader = [
  {
    text: '번호',
    align: 'center',
    width: '40px'
  },
  {
    text: '이름',
    align: 'center',
    width: '100px'
  },
  {
    text: '방문자(평균)',
    align: 'center',
    width: '80px',
    colName: 'NAV_GUEST_AVG'
  },
  {
    text: '이웃',
    align: 'center',
    width: '80px',
    colName: 'NAV_FLWR'
  },
  {
    text: '게시물',
    align: 'center',
    width: '80px',
    colName: 'NAV_CONT'
  },
  {
    text: '블로그',
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

function CampaignParBlog() {
  const [participants, setParticipants] = useState([]);
  const [selected, setSelected] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [order, setOrder] = useState({ orderBy: 'NAV_FLWR', direction: 'desc' });
  const params = useParams();
  const adId = params.id;
  const limit = 10;
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();

  function toggleConfirmDialog() {
    setConfirmDialogOpen(!confirmDialogOpen);
  }

  function getParticipants() {
    const resParams = {
      ...order, adId, limit, page
    };
    if (selected) resParams.selected = '1';

    axios.get('/api/TB_PARTICIPANT/getListBlog', {
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
    const isDesc = order.orderBy === id && order.direction === 'desc';
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
                  <option value="NAV_GUEST_AVG">방문자수</option>
                  <option value="NAV_FLWR">이웃</option>
                  <option value="NAV_CONT">게시물</option>
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
        </Grid>
      </Box>
      {participants.length > 0 ? (
        <React.Fragment>
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
                  <StyledTableCell align="center">
                    <StyledText textAlign="center">
                      {row.NAV_GUEST_AVG || '-'}
                    </StyledText>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <StyledText textAlign="center">
                      {row.NAV_FLWR || '-'}
                    </StyledText>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <StyledText textAlign="center">
                      {row.NAV_CONT || '-'}
                    </StyledText>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.NAV_BLOG_ID ? (
                      <StyledButton
                        background={Colors.green}
                        hoverBackground={Colors.greenHover}
                        height="25px"
                        padding="0px 5px"
                        onClick={() => window.open(`https://blog.naver.com/${row.NAV_BLOG_ID}`, '_blank')}
                      >
                          링크
                      </StyledButton>
                    ) : (
                      <StyledText textAlign="center">-</StyledText>
                    )}
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
        </React.Fragment>
      ) : (
        <StyledText textAlign="center">신청한 인플루언서가 없습니다</StyledText>
      )}
      <ConfirmDialog
        open={confirmDialogOpen}
        closeDialog={toggleConfirmDialog}
        dialogText="선정하시겠습니까?"
        onConfirm={selectParticipant}
      />
    </Box>
  );
}

export default CampaignParBlog;
