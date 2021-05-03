import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Grid, Table, TableBody, TableHead, TableRow
} from '@material-ui/core';
import StyledTableCell from '../../../containers/StyledTableCell';
import StyledTableRow from '../../../containers/StyledTableRow';
import StyledText from '../../../containers/StyledText';
import StyledLink from '../../../containers/StyledLink';
import MyPagination from '../../../containers/MyPagination';
import StyledButton from '../../../containers/StyledButton';
import { Colors } from '../../../lib/Сonstants';
import ConfirmDialog from '../../../containers/ConfirmDialog';

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
  },
  {
    text: '이웃',
    align: 'center',
  },
  {
    text: '게시물',
    align: 'center',
  },
  {
    text: '블로그주소',
    align: 'center',
  },
  {
    text: '선정',
    align: 'center',
    width: '50px',
  }
];

function CampaignParBlog() {
  const [participants, setParticipants] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const params = useParams();
  const adId = params.id;
  const limit = 10;

  function toggleConfirmDialog() {
    setConfirmDialogOpen(!confirmDialogOpen);
  }

  function getParticipants() {
    axios.get('/api/TB_PARTICIPANT/getListBlog', {
      params: { adId, limit, page }
    }).then((res) => {
      setParticipants(res.data.data);
      setCount(res.data.count);
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

  useEffect(() => {
    getParticipants();
  }, [page]);

  const changePage = (event, value) => {
    setPage(value);
  };

  function clickSelect(id) {
    setSelectedId(id);
    toggleConfirmDialog();
  }

  return (
    <Box my={{ xs: 0, sm: 4 }} boxSizing="border-box" maxWidth={1200} css={{ margin: '0 auto' }}>
      {participants.length > 0 ? (
        <React.Fragment>
          <Table>
            <TableHead>
              <TableRow>
                {tableHeader.map(item => (
                  <StyledTableCell key={item.text} align={item.align} width={item.width || null}>
                    {item.text}
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
                    {row.NAV_URL ? (
                      <StyledLink
                        href={row.NAV_URL}
                        target="_blank"
                      >
                        {`@${row.NAV_URL}`}
                      </StyledLink>
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
