import React, {
  Fragment, useContext, useEffect, useState
} from 'react';
import {
  Box, Grid, Paper, Table, TableHead, TableRow, TableContainer, TableBody, makeStyles, useMediaQuery, useTheme
} from '@material-ui/core';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import StyledImage from '../../containers/StyledImage';
import StyledText from '../../containers/StyledText';
import StyledTableCell from '../../containers/StyledTableCell';
import noImage from '../../img/noImage.png';
import { Colors } from '../../lib/Сonstants';
import AuthContext from '../../context/AuthContext';
import QuestionDialog from './QuestionDialog';
import MyPagination from '../../containers/MyPagination';

const tableHeader = [
  {
    text: '번호',
    width: '60px',
    align: 'center'
  },
  {
    text: '제목',
    align: 'center'
  },
  {
    text: '이름',
    width: '100px',
    align: 'center'
  },
  {
    text: '상태',
    width: '60px',
    align: 'center'
  },
  {
    text: '작성기간',
    width: '100px',
    align: 'center'
  }
];

const adTypes = {
  1: {
    text: '인스타',
    color: Colors.pink,
  },
  2: {
    text: '유튜브',
    color: Colors.red,
  },
  3: {
    text: '블로그',
    color: '#2ba406',
  },
  4: {
    text: '기자단',
    color: '#0027ff'
  }
};

const defaultCampaignInfo = {
  AD_PHOTO: '',
  AD_NAME: '캠페인 이름',
  AD_SHRT_DISC: '캠페인 이름',
  AD_TYPE: '1',
};

const useStyles = makeStyles(theme => ({
  campaignCard: {
    padding: '12px'
  },
  tooltipIcon: {
    color: '#8C3FFF',
    marginLeft: '5px',
  },
  image: {
    width: '100%',
    height: '276px',
    objectFit: 'cover',
    objectPosition: '50% 50%',
    [theme.breakpoints.down('sm')]: {
      width: '60px',
      height: '60px',
    }
  }
}));

function Question(props) {
  const [questions, setQuestions] = useState([]);
  const [campaignInfo, setCampaignInfo] = useState(defaultCampaignInfo);
  const [detailDialog, setDetailDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const { token } = useContext(AuthContext);
  const params = useParams();
  const history = useHistory();
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const adId = params.id;
  const classes = useStyles();

  function toggleDetailDialog() {
    setDetailDialog(!detailDialog);
  }

  function getQuestions() {
    axios.get('/api/TB_QUESTION/listBiz', {
      params: { adId, token, page }
    }).then((res) => {
      if (res.status === 201) {
        history.push('/Profile/CampaignInfo');
        return;
      }
      const { data, adData, countData } = res.data;
      setCampaignInfo(adData);
      setQuestions(data);
      setCount(countData);
    }).catch((err) => {
      alert(err.response.message);
    });
  }

  const changePage = (event, value) => {
    setPage(value);
  };

  function getDetail(value) {
    setSelected(value);
    toggleDetailDialog();
  }

  useEffect(() => {
    if (token) {
      getQuestions();
    }
  }, [token]);

  return (
    <Box py="50px" bgcolor="#f5f5f5" minHeight="calc(100vh - 445px);">
      <Box px={2} maxWidth={1200} m="0 auto" boxSizing="border-box">
        <Grid container spacing={2}>
          <Grid item xs={12} md="auto">
            <Box width={{ xs: '100%', md: '300px' }}>
              <Paper className={classes.campaignCard}>
                <Grid container spacing={2}>
                  <Grid item>
                    <StyledImage className={classes.image} src={campaignInfo.AD_PHOTO || noImage} />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Box mb={{ xs: '4px', md: '11px' }}>
                      <StyledText overflowHidden fontSize={isMD ? '22px' : '15px'} fontWeight="bold" lineHeight="1.1em">
                        {campaignInfo.AD_NAME}
                      </StyledText>
                    </Box>
                    <StyledText overflowHidden fontSize={isMD ? '15px' : '13px'}>{campaignInfo.AD_SHRT_DISC}</StyledText>
                    <Box pt={{ xs: '6px', md: 2 }}>
                      {isMD ? (
                        <Box width="30%" p={1} border={`1px solid ${adTypes[campaignInfo.AD_TYPE].color}`}>
                          <StyledText textAlign="center" fontSize="13px" color={adTypes[campaignInfo.AD_TYPE].color} fontWeight="bold">{adTypes[campaignInfo.AD_TYPE].text}</StyledText>
                        </Box>
                      ) : (
                        <StyledText fontSize="13px" color={adTypes[campaignInfo.AD_TYPE].color} fontWeight="bold">{adTypes[campaignInfo.AD_TYPE].text}</StyledText>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md>
            <Box fontSize={22} fontWeight={600} mb="25px">1대1문의하기(Q&A)</Box>
            {questions.length > 0 ? (
              <Fragment>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        {tableHeader.map(item => (
                          <StyledTableCell key={item.text} align={item.align} width={item.width}>
                            {item.text}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {questions.map(item => (
                        <TableRow key={item.QUE_ID} hover onClick={() => getDetail(item.QUE_ID)}>
                          <StyledTableCell align="center">
                            {item.rownum}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item.QUE_TITLE}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.INF_NAME}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Box color={item.QUE_STATE === '1' ? Colors.green : Colors.red}>{item.QUE_STATE === '1' ? '답변완료' : '대기중'}</Box>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.QUE_DT}
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
            ) : (
              <Box textAlign="center">문의 없습니다</Box>
            )}
          </Grid>
        </Grid>
      </Box>
      <QuestionDialog open={detailDialog} closeDialog={toggleDetailDialog} getQuestions={getQuestions} questionId={selected} />
    </Box>
  );
}

export default Question;
