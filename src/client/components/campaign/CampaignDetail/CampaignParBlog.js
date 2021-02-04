import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Grid, Table, TableBody, TableHead, TableRow
} from '@material-ui/core';
import StyledTableCell from '../../containers/StyledTableCell';
import StyledTableSortLabel from '../../containers/StyledTableSortLabel';
import StyledTableRow from '../../containers/StyledTableRow';
import StyledText from '../../containers/StyledText';
import StyledLink from '../../containers/StyledLink';
import MyPagination from '../../containers/MyPagination';

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
  {
    text: '블로그주소',
    align: 'center'
  },
];

function CampaignParBlog() {
  const [participants, setParticipants] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const params = useParams();
  const adId = params.id;
  const limit = 10;

  function getParticipants() {
    axios.get('/api/TB_PARTICIPANT/getListBlog', {
      params: { adId, limit, page }
    }).then((res) => {
      setParticipants(res.data.data);
      setCount(res.data.count);
    });
  }

  useEffect(() => {
    getParticipants();

  }, [page]);

  const changePage = (event, value) => {
    setPage(value);
  };

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
    </Box>
  );
}

export default CampaignParBlog;
