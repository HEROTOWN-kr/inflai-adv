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
    text: '인스타계정',
    align: 'center'
  },
  {
    text: '팔로워수',
    align: 'center',
    colName: 'INS_FLWR'
  },
  {
    text: '평균좋아요수',
    align: 'center',
    colName: 'INS_LIKES',
  },
  {
    text: '평균댓글수',
    align: 'center',
    colName: 'INS_CMNT',
  },
  {
    text: '점수',
    align: 'center',
    colName: 'INS_SCORE',
  },
  {
    text: '순위',
    align: 'center',
    width: '100px',
    colName: 'INS_RANK',
  }
];

function CampaignParInsta() {
  const [participants, setParticipants] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState({ orderBy: 'INS_FLWR', direction: 'desc' });
  const params = useParams();
  const history = useHistory();
  const adId = params.id;
  const limit = 10;

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
    const isDesc = order.orderBy === id && order.direction === 'desc';
    setOrder({
      orderBy: id,
      direction: isDesc ? 'asc' : 'desc'
    });
  }

  return (
    <Box my={{ xs: 0, sm: 4 }} boxSizing="border-box" maxWidth={1200} css={{ margin: '0 auto' }}>
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
              </StyledTableCell>
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
                  {row.INS_SCORE || '-'}
                </StyledText>
              </StyledTableCell>
              <StyledTableCell align="center">
                <StyledText textAlign="center">
                  {row.INS_RANK || '-'}
                </StyledText>
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
    </Box>
  );
}

export default CampaignParInsta;
