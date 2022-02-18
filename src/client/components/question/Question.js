import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Grid, Paper, Table, TableHead, TableRow, TableContainer, TableBody, makeStyles
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

const useStyles = makeStyles({
  campaignCard: {
    padding: '12px'
  },
  tooltipIcon: {
    color: '#8C3FFF',
    marginLeft: '5px',
  },
  image: {
    width: '100%',
    objectFit: 'cover',
    objectPosition: '50% 50%',
    height: '276px'
  }
});

function Question(props) {
  const [questions, setQuestions] = useState([]);
  const [campaignInfo, setCampaignInfo] = useState(defaultCampaignInfo);
  const [detailDialog, setDetailDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const { token } = useContext(AuthContext);
  const params = useParams();
  const history = useHistory();
  const adId = params.id;
  const classes = useStyles();

  function toggleDetailDialog() {
    setDetailDialog(!detailDialog);
  }

  function getQuestions() {
    axios.get('/api/TB_QUESTION/listBiz', {
      params: { adId, token, page: '1' }
    }).then((res) => {
      if (res.status === 201) {
        history.push('/Profile/CampaignInfo');
        return;
      }
      const { data, adData, countData } = res.data;
      setCampaignInfo(adData);
      setQuestions(data);
    }).catch((err) => {
      alert(err.response.message);
    });
  }

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
          <Grid item>
            <Box width="300px">
              <Paper className={classes.campaignCard}>
                <StyledImage className={classes.image} src={campaignInfo.AD_PHOTO || noImage} />
                <Box my="13px">
                  <StyledText overflowHidden fontSize="22px" fontWeight="bold" lineHeight="1.1em">
                    {campaignInfo.AD_NAME}
                  </StyledText>
                </Box>
                <StyledText overflowHidden fontSize="15px">{campaignInfo.AD_SHRT_DISC}</StyledText>
                <Box pt={2}>
                  <Box width="30%" p={1} border={`1px solid ${adTypes[campaignInfo.AD_TYPE].color}`}>
                    <StyledText textAlign="center" fontSize="13px" color={adTypes[campaignInfo.AD_TYPE].color} fontWeight="bold">{adTypes[campaignInfo.AD_TYPE].text}</StyledText>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs>
            <Box fontSize={22} fontWeight={600} mb="25px">1대1문의하기(Q&A)</Box>
            <Box>
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
                      <TableRow hover onClick={() => getDetail(item.QUE_ID)}>
                        <StyledTableCell align="center">
                          {item.rownum}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item.QUE_TITLE}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.QUE_STATE === '1' ? '답변완료' : '대기중'}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.QUE_DT}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <QuestionDialog open={detailDialog} closeDialog={toggleDetailDialog} getQuestions={getQuestions} questionId={selected} />
    </Box>
  );
}

export default Question;