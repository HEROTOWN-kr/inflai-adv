import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid } from '@material-ui/core';
import { setIn } from 'formik';
import { Check, CheckCircle, Description } from '@material-ui/icons';
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
import Sample from '../../component-sample';
import NaverInsightDialog from './NaverInsightDialog';
import MyPagination from '../../../containers/MyPagination';
import InstaInsightDialog from './InstaInsightDialog';
import AnalysisDialog from '../../Analysis/Youtube/AnalysisDialog';

function ParticipantList(props) {
  const { adId, type, isMD } = props;
  const [participants, setParticipants] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [instaDialogOpen, setInstaDialogOpen] = useState(false);
  const [youtubeDialogOpen, setYoutubeDialogOpen] = useState(false);
  const [naverDialogOpen, setNaverDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [instaId, setInstaId] = useState(0);
  const [influencerId, setInfluencerId] = useState(0);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const limit = 10;

  const changePage = (event, value) => {
    setPage(value);
  };

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function toggleInstaDialog() {
    setInstaDialogOpen(!instaDialogOpen);
  }

  function toggleYoutubeDialog() {
    setYoutubeDialogOpen(!youtubeDialogOpen);
  }

  function toggleNaverDialog() {
    setNaverDialogOpen(!naverDialogOpen);
  }

  function toggleConfirmDialog() {
    setConfirmDialogOpen(!confirmDialogOpen);
  }

  function clickSelect(id) {
    setSelectedId(id);
    toggleConfirmDialog();
  }

  function clickInfo(id) {
    setSelectedId(id);
    toggleDialog();
  }

  function clickInstaInfo(id) {
    setInfluencerId(id);
    toggleInstaDialog();
  }

  function clickYoutubeInfo(id) {
    setInfluencerId(id);
    toggleYoutubeDialog();
  }

  function clickNaverInfo(id) {
    setInfluencerId(id);
    toggleNaverDialog();
  }

  function getParticipants() {
    axios.get('/api/TB_PARTICIPANT/getList', {
      params: {
        adId, type, limit, page
      }
    }).then((res) => {
      const { data } = res.data;
      setParticipants(data);
      setCount(res.data.count);
    }).catch(err => alert(err.response.data.message));
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
                              onClick={() => clickInfo(item.INF_ID)}
                            >
                              <StyledText color="#fff">요약분석</StyledText>
                            </Box>
                          </Grid>
                        ) : null}
                        {item.NAV_ID ? (
                          <Grid item>
                            <Box
                              padding="4px 10px"
                              css={{ background: Colors.blue2, cursor: 'pointer' }}
                              onClick={() => clickNaverInfo(item.PAR_ID)}
                            >
                              <StyledText color="#fff">정보</StyledText>
                            </Box>
                          </Grid>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledText fontSize={isMD ? 15 : 14} lineHeight="1.3em">{item.PAR_MESSAGE}</StyledText>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledText fontSize={isMD ? 15 : 14}>
                        {item.PAR_DT}
                      </StyledText>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Box width="130px">
                    <Grid container spacing={1}>
                      {item.INS_ID ? (
                        <Grid item xs={12}>
                          <StyledButton
                            height={40}
                            padding="0 12px"
                            background={Colors.green}
                            hoverBackground={Colors.greenHover}
                            onClick={() => clickInstaInfo(item.INF_ID)}
                            // onClick={() => clickInstaInfo(item.INS_ID)}
                            // startIcon={<Description />}
                            // disabled={item.INS_STATUS === 0}
                          >
                            계정분석 보고서
                          </StyledButton>
                        </Grid>
                      ) : null}

                      {item.YOU_ID ? (
                        <Grid item xs={12}>
                          <StyledButton
                            height={40}
                            padding="0 20px"
                            background={Colors.green}
                            hoverBackground={Colors.greenHover}
                            onClick={() => clickYoutubeInfo(item.YOU_ID)}
                            startIcon={<Description />}
                            disabled={item.YOU_STATUS === 0}
                          >
                              보고서
                          </StyledButton>
                        </Grid>
                      ) : null}

                      <Grid item xs={12}>
                        <StyledButton
                          height={40}
                          padding="0 20px"
                          onClick={() => clickSelect(item.PAR_ID)}
                          startIcon={<CheckCircle />}
                          disabled={item.PAR_STATUS === '2'}
                        >
                          {item.PAR_STATUS === '1' ? '선정하기' : '선정됨'}
                        </StyledButton>
                      </Grid>
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
          <InstaInsightDialog open={instaDialogOpen} handleClose={toggleInstaDialog} INS_ID={influencerId} />
          <AnalysisDialog open={youtubeDialogOpen} closeDialog={toggleYoutubeDialog} id={influencerId} />
          <NaverInsightDialog open={naverDialogOpen} closeDialog={toggleNaverDialog} selectedId={influencerId} />
          <ConfirmDialog
            open={confirmDialogOpen}
            closeDialog={toggleConfirmDialog}
            dialogText="선정하시겠습니까?"
            onConfirm={selectParticipant}
          />
        </React.Fragment>
      )}
    </>
  );
}

export default ParticipantList;
