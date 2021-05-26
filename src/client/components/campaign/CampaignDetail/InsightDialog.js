import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, Dialog, useMediaQuery, IconButton, makeStyles, Typography, Grid, useTheme
} from '@material-ui/core';
import {
  CalendarToday, ChangeHistory,
  ChatBubble, Clear, Details, Favorite, Forum, Image, ImportExportOutlined, Room
} from '@material-ui/icons';
import { Colors } from '../../../lib/Сonstants';
import WhiteBlock from '../../../containers/WhiteBlock';
import StyledImage from '../../../containers/StyledImage';
import defaultAccountImage from '../../../img/default_account_image.png';
import StyledText from '../../../containers/StyledText';
import StyledSvg from '../../../containers/StyledSvg';
import GoogleVisionGraph from '../Graphs/GoogleVisionGraph';
import LikeCommentBarGraph from '../Graphs/LikeCommentBarGraph';
import AgeGraph from '../Graphs/AgeGraph';
import GenderGraph from '../Graphs/GenderGraph';
import MapGraph2 from '../Graphs/MapGraph2';


const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '15px',
    right: '14px',
    fontSize: '28px',
    color: '#b9b9b9de',
    cursor: 'pointer'
  },
  paper: {
    margin: '12px',
    width: '100%',
    borderRadius: '2px'
  }
});

function RoundLikeComment(likeCount, commentsCount) {
  const likeToComment = (commentsCount / likeCount) * 100;
  return likeToComment.toFixed(1);
}

function getFollowersType(followers) {
  if (followers < 1000) return 'Nano Influencer';
  if (followers >= 1000 && followers < 20000) return 'Micro Influencer';
  if (followers >= 20000 && followers < 100000) return 'Professional';
  if (followers >= 100000 && followers < 1000000) return 'Macro Influencer';
  if (followers >= 1000000) return 'Celebrity';
  return followers;
}

function likeToCommentType(likeCount, commentsCount) {
  const likeToComment = RoundLikeComment(likeCount, commentsCount);
  if (likeToComment < 5) return '저조';
  if (likeToComment >= 5 && likeToComment < 10) return '보통';
  if (likeToComment >= 10 && likeToComment < 15) return '우수';
  if (likeToComment >= 15) return '훌륭';
  return likeToComment;
}

function InsightDialog(props) {
  const { open, closeDialog, selectedId } = props;
  const [instaData, setInstaData] = useState({});
  const [maxAgeVal, setMaxAgeVal] = useState(null);
  const [maxLocVal, setMaxLocVal] = useState(null);
  const [maxStatVal, setMaxStatVal] = useState(null);
  const [maxGenderVal, setMaxGenderVal] = useState(null);
  const classes = useStyles();

  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  async function getInstaInfo() {
    try {
      const InstaData = await axios.get('/api/TB_INSTA/rankingInfo', {
        params: { instaId: selectedId }
      });
      const { data } = InstaData.data;
      console.log(data);
      setInstaData(data);
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  function onDialogEntered() {
    getInstaInfo();
  }

  function onDialogClose() {
    setInstaData({});
    setMaxAgeVal(null);
    setMaxGenderVal(null);
    setMaxLocVal(null);
    setMaxStatVal(null);
    closeDialog();
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      maxWidth="lg"
      onClose={onDialogClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      onEntered={onDialogEntered}
    >
      <Box padding="20px" fontSize="18px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
                SNS 정보
        <Clear onClick={onDialogClose} classes={{ root: classes.root }} />
      </Box>
      <Box px={2} py={2}>
        <Grid container spacing={isMD ? 3 : 0}>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={isMD ? 3 : 0}>
              <Grid item xs={12}>
                <WhiteBlock borderRadius={isMD ? '25px' : '0'}>
                  <Box p={{ xs: 2, md: 3 }}>
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item xs={12} sm="auto">
                        <StyledImage width={isSM ? '125px' : '100px'} height={isSM ? '125px' : '100px'} borderRadius="100%" src={instaData.INS_PROFILE_IMG || defaultAccountImage} />
                      </Grid>
                      <Grid item xs>
                        <Grid container direction="column" spacing={2}>
                          <Grid item>
                            <StyledText textAlign={isSM ? 'inherit' : 'center'} fontSize="20px" fontWeight="bold">{instaData.INS_NAME || instaData.INS_USERNAME}</StyledText>
                          </Grid>
                          <Grid item>
                            <Grid container justify="space-between">
                              <Grid item>
                                <Grid container direction="column" alignItems="center" spacing={1}>
                                  <Grid item><StyledText fontWeight="bold">{instaData.INS_MEDIA_CNT}</StyledText></Grid>
                                  <Grid item>
                                    <StyledText fontSize="14px">게시물 수</StyledText>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container direction="column" alignItems="center" spacing={1}>
                                  <Grid item><StyledText fontWeight="bold">{instaData.INS_FLWR}</StyledText></Grid>
                                  <Grid item>
                                    <StyledText fontSize="14px">팔로워 수</StyledText>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container direction="column" alignItems="center" spacing={1}>
                                  <Grid item><StyledText fontWeight="bold">{instaData.INS_FLW}</StyledText></Grid>
                                  <Grid item>
                                    <StyledText fontSize="14px">팔로잉 수</StyledText>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <StyledText fontSize="14px" fontWeight="bold">{instaData.INS_USERNAME}</StyledText>
                          </Grid>
                          <Grid item>
                            <StyledText fontSize="14px">{instaData.biography}</StyledText>
                          </Grid>
                          <Grid item>
                            <StyledText fontSize="14px" color="#409CFF" fontWeight="bold">{instaData.website}</StyledText>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </WhiteBlock>
              </Grid>
              <Grid item xs={4}>
                <WhiteBlock borderRadius={isMD ? '25px' : '0'}>
                  <Box px={2} pt={2} pb={{ xs: 3, md: 5 }}>
                    <Grid container direction="column" spacing={2} alignItems="center">
                      <Grid item container justify="space-between" alignItems="center">
                        <Grid item><StyledText fontSize="14px">좋아요 수</StyledText></Grid>
                        <StyledSvg
                          component={Favorite}
                          color={Colors.orange}
                          fontSize="14px"
                          padding="8px"
                          background={Colors.orangeBack}
                          borderRadius="100%"
                        />
                      </Grid>
                      <Grid item><StyledText fontSize={isMD ? '30px' : '24px'} fontWeight="900">{instaData.INS_LIKES || 0}</StyledText></Grid>
                    </Grid>
                  </Box>
                </WhiteBlock>
              </Grid>
              <Grid item xs={4}>
                <WhiteBlock borderRadius={isMD ? '25px' : '0'}>
                  <Box px={2} pt={2} pb={{ xs: 3, md: 5 }}>
                    <Grid container direction="column" spacing={2} alignItems="center">
                      <Grid item container justify="space-between" alignItems="center">
                        <Grid item><StyledText fontSize="14px">댓글 수</StyledText></Grid>
                        <StyledSvg
                          component={ChatBubble}
                          color={Colors.blue2}
                          fontSize="14px"
                          padding="8px"
                          background={Colors.blue2Back}
                          borderRadius="100%"
                        />
                      </Grid>
                      <Grid item><StyledText fontSize={isMD ? '30px' : '24px'} fontWeight="900">{instaData.INS_CMNT || instaData.INS_CMNT2}</StyledText></Grid>
                    </Grid>
                  </Box>
                </WhiteBlock>
              </Grid>
              <Grid item xs={4}>
                <WhiteBlock borderRadius={isMD ? '25px' : '0'}>
                  <Box px={2} pt={2} pb={{ xs: 3, md: 5 }}>
                    <Grid container direction="column" spacing={2} alignItems="center">
                      <Grid item container justify="space-between" alignItems="center">
                        <Grid item><StyledText fontSize="14px">소통지수</StyledText></Grid>
                        <StyledSvg
                          component={Forum}
                          color={Colors.red2}
                          fontSize="14px"
                          padding="8px"
                          background={Colors.red2Back}
                          borderRadius="100%"
                        />
                      </Grid>
                      <Grid item><StyledText fontSize={isMD ? '30px' : '24px'} fontWeight="900">{`${RoundLikeComment(instaData.INS_LIKES, instaData.INS_CMNT)}%`}</StyledText></Grid>
                    </Grid>
                  </Box>
                </WhiteBlock>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <WhiteBlock borderRadius={isMD ? '25px' : '0'} height="100%">
              <Box px={2} py={2}>
                <Grid container justify="space-between" spacing={4}>
                  <Grid item xs={12} container justify="space-between" alignItems="center">
                    <Grid item><StyledText fontSize="14px">콘텐츠 카테고리</StyledText></Grid>
                    <StyledSvg
                      component={Image}
                      color={Colors.orange}
                      fontSize="14px"
                      padding="8px"
                      background={Colors.orangeBack}
                      borderRadius="100%"
                    />
                  </Grid>
                  <Grid item xs={12} style={{ width: '100%' }}>
                    <GoogleVisionGraph INS_ID={instaData.INS_ID} setMaxStatVal={setMaxStatVal} />
                  </Grid>
                </Grid>
              </Box>
            </WhiteBlock>
          </Grid>
          <Grid item xs={12} sm={6}>
            <WhiteBlock borderRadius={isMD ? '25px' : '0'}>
              <Box p={2}>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs><StyledText fontSize="14px">인플루언서 계정의 각 게시물마다 (좋아요, 댓글) 수 비교</StyledText></Grid>
                      <Grid item>
                        <StyledSvg
                          component={ImportExportOutlined}
                          color={Colors.green2}
                          fontSize="14px"
                          padding="8px"
                          background={Colors.green2Back}
                          borderRadius="100%"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <LikeCommentBarGraph INS_ID={instaData.INS_ID} />
                  </Grid>
                </Grid>
              </Box>
            </WhiteBlock>
          </Grid>
          <Grid item xs={12} sm={6}>
            <WhiteBlock borderRadius={isMD ? '25px' : '0'} height="100%">
              <Box p={2}>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs><StyledText fontSize="14px">팔로워의 나이</StyledText></Grid>
                      <Grid item>
                        <StyledSvg
                          component={CalendarToday}
                          color={Colors.red2}
                          fontSize="14px"
                          padding="8px"
                          background={Colors.red2Back}
                          borderRadius="100%"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AgeGraph INS_ID={instaData.INS_ID} setMaxAgeVal={setMaxAgeVal} />
                  </Grid>
                </Grid>
              </Box>
            </WhiteBlock>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={isMD ? 3 : 0}>
              <Grid item xs={12}>
                <WhiteBlock borderRadius={isMD ? '25px' : '0'}>
                  <Box px={2} py={2}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} container justify="space-between" alignItems="center">
                        <StyledSvg
                          component={Details}
                          color={Colors.red2}
                          fontSize="14px"
                          padding="8px"
                          background={Colors.red2Back}
                          borderRadius="100%"
                        />
                        <Grid item><StyledText fontSize="14px">성비</StyledText></Grid>
                        <StyledSvg
                          component={ChangeHistory}
                          color={Colors.green2}
                          fontSize="14px"
                          padding="8px"
                          background={Colors.green2Back}
                          borderRadius="100%"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <GenderGraph INS_ID={instaData.INS_ID} setMaxGenderVal={setMaxGenderVal} />
                      </Grid>
                    </Grid>
                  </Box>
                </WhiteBlock>
              </Grid>
              <Grid item xs={12}>
                <WhiteBlock borderRadius={isMD ? '25px' : '0'}>
                  <Box fontSize="14px" p={2}>
                    <Box mb={1} textAlign="center" fontSize="18px" fontWeight="bold">인플라이의 Ai분석결과</Box>
                    <Box>{`팔로워 : ${instaData.INS_FLWR || 0}`}</Box>
                    <Box>{`평균 좋아요 : ${instaData.INS_LIKES ? Math.round(instaData.INS_LIKES / 25) : 0}개`}</Box>
                    <Box>{`평균 댓글 : ${instaData.INS_CMNT ? Math.round(instaData.INS_CMNT / 25) : 0}개`}</Box>
                    {instaData.INS_FLWR ? (
                      <Box mt={1}>
                        {`인플루언서 선덕여왕 님은 팔로워숫자는 ${instaData.INS_FLWR} 명으로 ${getFollowersType(instaData.INS_FLWR)} 에 해당합니다.`}
                      </Box>
                    ) : null}
                    {instaData.INS_LIKES && instaData.INS_CMNT ? (
                      <Box>
                        {`인플루언서 영향력지수산출 중에서 중요한 고객과의 소통능력지수는 ${RoundLikeComment(instaData.INS_LIKES, instaData.INS_CMNT)}% 로서 (${likeToCommentType(instaData.INS_LIKES, instaData.INS_CMNT)}) 에 해당합니다`}
                      </Box>
                    ) : null}
                    {maxAgeVal && maxLocVal && maxGenderVal && maxStatVal ? (
                      <Box>
                        {`${maxAgeVal}세, ${maxLocVal} 국적을 가진 ${maxGenderVal} 팔로워가 많으며, ${maxStatVal} 카테고리 마케팅에 적합합니다.`}
                      </Box>
                    ) : null}
                  </Box>
                </WhiteBlock>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <WhiteBlock borderRadius={isMD ? '25px' : '0'}>
              <Box px={2} py={2}>
                <Grid container spacing={4}>
                  <Grid item xs={12} container justify="space-between" alignItems="center">
                    <Grid item><StyledText fontSize="14px">팔로워의 지도</StyledText></Grid>
                    <StyledSvg
                      component={Room}
                      color={Colors.orange}
                      fontSize="14px"
                      padding="8px"
                      background={Colors.orangeBack}
                      borderRadius="100%"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MapGraph2 INS_ID={instaData.INS_ID} setMaxLocVal={setMaxLocVal} />
                    {/* <MapGraph INS_ID={instaData.INS_ID} /> */}
                  </Grid>
                </Grid>
              </Box>
            </WhiteBlock>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default InsightDialog;
