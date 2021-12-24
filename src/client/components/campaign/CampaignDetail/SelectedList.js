import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { StarBorder, Description } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../../lib/Сonstants';
import StyledImage from '../../../containers/StyledImage';
import defaultAccountImage from '../../../img/default_account_image.png';
import StyledText from '../../../containers/StyledText';
import IconInsta from '../../../img/icon_instagram_url.png';
import IconYoutube from '../../../img/icon_youtube_url.png';
import IconBlog from '../../../img/icon_blog_url.png';
import StyledButton from '../../../containers/StyledButton';
import InsightDialog from './InsightDialog';
import ConfirmDialog from '../../../containers/ConfirmDialog';
import DetailDataDialog from './DetailDataDialog';
import MyPagination from '../../../containers/MyPagination';
import HelpTooltip from '../../Analysis/HelpTooltip';

const useStyles = makeStyles(() => ({
  textAndIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: '14px',
    color: '#000'
  },
}));

function RatingComponent(props) {
  const { id, rating } = props;

  function updateRating(value) {
    axios.post('/api/TB_PARTICIPANT/ratingUpdate', {
      id, ratingValue: value
    }).then((res) => {

    }).catch((err) => {
      alert(err.response.message);
    });
  }

  return (
    <Rating
      name={`raiting${id}`}
      defaultValue={rating}
      precision={1}
      emptyIcon={<StarBorder fontSize="inherit" />}
      onChange={(event, newValue) => {
        updateRating(newValue);
      }}
    />
  );
}

function SelectedList(props) {
  const { adId, type, isMD } = props;
  const [participants, setParticipants] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const limit = 10;
  const classes = useStyles();

  const changePage = (event, value) => {
    setPage(value);
  };

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function toggleInfoDialog() {
    setInfoDialogOpen(!infoDialogOpen);
  }

  function clickInstaInfo(id) {
    setSelectedId(id);
    toggleDialog();
  }

  function clickDataInfo(id) {
    setSelectedId(id);
    toggleInfoDialog();
  }

  function getParticipants() {
    axios.get('/api/TB_PARTICIPANT/getList', {
      params: {
        adId, type, limit, page, onlySelected: '1'
      }
    }).then((res) => {
      const { data } = res.data;
      setParticipants(data);
      setCount(res.data.count);
    }).catch(err => alert(err.response.data.message));
  }

  function getExcel() {
    axios.get('/api/TB_PARTICIPANT/getExcel', {
      params: { AD_ID: adId }
    }).then((res) => {
      const { url } = res.data;
      window.open(window.location.origin + url, '_blank');
    }).catch(err => alert(err.response.data.message));
  }

  useEffect(() => {
    if (type) getParticipants();
  }, [type, page]);

  return (
    <>
      {participants.length === 0 ? (
        <Box py={4}>
          <Grid container justify="center">
            <Grid item>
                          신청한 리뷰어 없습니다
            </Grid>
          </Grid>
        </Box>
      ) : (
        <React.Fragment>
          <Box mt={2} pb={2} borderBottom={`1px solid ${Colors.grey7}`}>
            <Grid container justify="flex-end">
              <Grid item>
                <StyledButton
                  height={40}
                  padding="0 20px"
                  background="#0fb359"
                  hoverBackground="#107C41"
                  startIcon={<Description />}
                  onClick={getExcel}
                >
                  엑셀다운
                </StyledButton>
              </Grid>
            </Grid>
          </Box>
          {participants.map(item => (
            <Box key={item.PAR_ID} py={2} borderBottom={`1px solid ${Colors.grey7}`}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <StyledImage borderRadius="100%" width={isMD ? '90px' : '60px'} height={isMD ? '90px' : '60px'} src={item.INF_PHOTO_URL || defaultAccountImage} onError={event => event.target.setAttribute('src', defaultAccountImage)} />
                </Grid>
                <Grid item xs>
                  <Grid container spacing={isMD ? 2 : 1}>
                    <Grid item xs={12}>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <StyledText fontSize="16px" fontWeight="bold">{item.PAR_NAME}</StyledText>
                        </Grid>
                        {item.PAR_INSTA ? (
                          <Grid item><StyledImage width="21px" height="21px" src={IconInsta} /></Grid>
                        ) : null}
                        {item.PAR_YOUTUBE ? (
                          <Grid item><StyledImage width="21px" height="21px" src={IconYoutube} /></Grid>
                        ) : null}
                        {item.PAR_NAVER ? (
                          <Grid item><StyledImage width="21px" height="21px" src={IconBlog} /></Grid>
                        ) : null}
                        {item.INS_ID ? (
                          <Grid item>
                            <Box
                              padding="4px 10px"
                              css={{ background: Colors.blue2, cursor: 'pointer' }}
                              onClick={() => clickInstaInfo(item.INF_ID)}
                            >
                              <StyledText color="#fff">정보</StyledText>
                            </Box>
                          </Grid>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledText fontSize={isMD ? '15px' : '14px'} lineHeight="1.3em">{item.PAR_MESSAGE}</StyledText>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledText fontSize={isMD ? '15px' : '14px'}>
                        {item.PAR_DT}
                      </StyledText>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm="auto">
                  {item.PAR_REVIEW ? (
                    <Box className={classes.textAndIcon}>
                      <RatingComponent id={item.PAR_ID} rating={item.PAR_RATING} />
                      <HelpTooltip title="인플루언서들이 올린 리뷰자료를 보시고 별점으로 평가해주세요" />
                    </Box>
                  ) : null}
                  <Box mt="5px" ml="auto" width={{ xs: '100%', sm: '120px' }}>
                    <Grid container spacing={1}>
                      <Grid item xs={6} sm={12}>
                        <StyledButton height="30px" padding="0 10px" onClick={() => clickDataInfo(item.PAR_ID)}>택배 발송 정보</StyledButton>
                      </Grid>
                      {item.PAR_REVIEW ? (
                        <Grid item xs={6} sm={12}>
                          <StyledButton
                            height="30px"
                            padding="0 10px"
                            background={Colors.green}
                            hoverBackground={Colors.greenHover}
                            onClick={() => window.open(item.PAR_REVIEW, '_blank')}
                          >
                                    리뷰 보기
                          </StyledButton>
                        </Grid>
                      ) : null}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
          {participants.length > 0 ? (
            <Box py={isMD ? 4 : 1}>
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
          ) : null}
          <InsightDialog open={dialogOpen} closeDialog={toggleDialog} selectedId={selectedId} />
          <DetailDataDialog open={infoDialogOpen} closeDialog={toggleInfoDialog} selectedId={selectedId} />
        </React.Fragment>
      )}
    </>
  );
}

export default SelectedList;
