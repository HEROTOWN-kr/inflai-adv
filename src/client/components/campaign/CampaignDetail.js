import React, {
  useContext, useEffect, useRef, useState
} from 'react';
import {
  Grid, Divider, CircularProgress, Button, Box, Hidden, IconButton, makeStyles
} from '@material-ui/core';
import axios from 'axios';
import {
  Sync, Favorite, FavoriteBorder, Print, Share, Error, SupervisorAccount, ExpandMore, ExpandLess
} from '@material-ui/icons';
import ReactHtmlParser from 'react-html-parser';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import * as Scroll from 'react-scroll';
import { Skeleton } from '@material-ui/lab';
import Common from '../../lib/common';
import { Colors, campaignSteps, AdvertiseTypes } from '../../lib/Сonstants';
import IconYoutube from '../../img/icon_youtube_url.png';
import IconInsta from '../../img/icon_instagram_url.png';
import IconBlog from '../../img/icon_blog_url.png';
import StyledText from '../../containers/StyledText';
import StyledImage from '../../containers/StyledImage';
import StyledSvg from '../../containers/StyledSvg';
import StyledButton from '../../containers/StyledButton';
import defaultAccountImage from '../../img/default_account_image.png';
import AuthContext from '../../context/AuthContext';
import TopMenu from './TopMenu';
import InsightDialog from './InsightDialog';

function TabComponent(props) {
  const {
    tab, setTab, text, tabNumber, isMD
  } = props;
  const styles = tab === tabNumber ? {
    border: `3px solid ${Colors.pink2}`,
    fontWeight: 'bold'
  } : {
    border: '0',
    fontWeight: '400'
  };


  return (
    <Box
      padding="13px 20px"
      borderBottom={styles.border}
      css={{ cursor: 'pointer' }}
      onClick={() => setTab(tabNumber)}
    >
      <StyledText fontSize={isMD ? '16' : '14'} fontWeight={styles.fontWeight} textAlign="center">{text}</StyledText>
    </Box>
  );
}

function ParticipantList(props) {
  const { adId, isMD } = props;
  const [participants, setParticipants] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function clickInfo(id) {
    setSelectedId(id);
    toggleDialog();
  }

  function getParticipants() {
    axios.get('/api/TB_PARTICIPANT/getList', {
      params: { adId }
    }).then((res) => {
      const { data } = res.data;
      setParticipants(data);
    }).catch(err => alert(err.response.data.message));
  }

  function selectParticipant(participantId) {
    axios.post('/api/TB_PARTICIPANT/change', { adId, participantId }).then((res) => {
      getParticipants();
    }).catch(err => alert(err.response.data.message));
  }

  useEffect(() => {
    getParticipants();
  }, []);

  return (
    <>
      {
        participants.length === 0 ? (
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
                    <StyledImage borderRadius="100%" width={isMD ? '90px' : '60px'} height={isMD ? '90px' : '60px'} src={item.INF_PHOTO || defaultAccountImage} />
                  </Grid>
                  <Grid item xs>
                    <Grid container spacing={isMD ? 2 : 1}>
                      <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            <StyledText fontSize={16} fontWeight="bold">{item.PAR_NAME}</StyledText>
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
                  <Grid item xs={12}>
                    <Grid container justify="flex-end" spacing={1}>
                      {item.PAR_STATUS === '1' ? (
                        <Grid item>
                          <StyledButton
                            fontSize="12px"
                            height="25px"
                            padding="0 10px"
                            onClick={() => selectParticipant(item.PAR_ID)}
                          >
                              리뷰어 선정하기
                          </StyledButton>
                        </Grid>
                      ) : null}
                      <Grid item>
                        <StyledButton fontSize="12px" height="25px" padding="0 10px">신청정보 수정</StyledButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <InsightDialog open={dialogOpen} closeDialog={toggleDialog} selectedId={selectedId} />
          </React.Fragment>
        )
      }
    </>
  );
}

const useStyles = makeStyles({
  root: {
    color: Colors.pink3
  },
});

function CampaignDetail() {
  const history = useHistory();
  const params = useParams();
  const adId = params.id;
  const classes = useStyles();
  const [productData, setProductData] = useState({
    TB_PHOTO_ADs: [],
    TB_PARTICIPANTs: [],
    AD_CTG: 0
  });
  const [currentImage, setCurrentImage] = useState('');
  const [isSticky, setSticky] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState({ visible: false, isOpen: false });
  const [tab, setTab] = useState(2);
  const [liked, setLiked] = useState(false);
  const testImage = 'https://www.inflai.com/attach/portfolio/33/1yqw1whkavscxke.PNG';
  const { token, userRole } = useContext(AuthContext);
  const theme = useTheme();
  const Scroller = Scroll.scroller;
  const ElementLink = Scroll.Element;

  const DetailPageRef = useRef(null);

  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const is1600 = useMediaQuery('(min-width:1600px)');
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  function toggleShowMore() {
    setShowMore({ ...showMore, isOpen: !showMore.isOpen });
  }

  const handleScroll = () => {
    setSticky(window.pageYOffset > 90);
  };

  function scrollTo(target) {
    setTimeout(() => {
      Scroller.scrollTo(target, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        ignoreCancelEvents: true
      });
    }, 1);
  }

  function getDetailData() {
    setLoading(true);
    const apiObj = {
      id: adId,
    };

    axios.get('/api/TB_AD/campaignDetail', {
      params: apiObj
    }).then((res) => {
      const { data } = res.data;
      setProductData(data);
      setCurrentImage(data.TB_PHOTO_ADs[0].PHO_FILE);
      setLoading(false);
    }).catch(err => alert(err.response.data.message));
  }

  function sendRequest() {
    if (token) {
      axios.get('/api/TB_PARTICIPANT/checkParticipant', {
        params: {
          adId,
          token
        }
      }).then((res) => {
        if (res.status === 201) {
          alert(res.data.data.message);
        } else {
          history.push(`/Campaign/apply/${adId}`);
        }
      }).catch(error => alert(error.response.data.message));
    } else {
      history.push('/Login');
    }
  }

  function checkFavorites() {
    if (token) {
      axios.get('/api/TB_FAVORITES/check', {
        params: {
          adId,
          token
        }
      }).then((res) => {
        const { data } = res.data;
        if (data) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      }).catch(error => alert(error.response.data.message));
    }
  }

  function favoriteClick() {
    if (token) {
      if (!liked) {
        axios.post('/api/TB_FAVORITES/', { token, adId }).then((res) => {
          setLiked(true);
        }).catch(error => alert(error.response.data.message));
      } else {
        axios.post('/api/TB_FAVORITES/delete', { token, adId }).then((res) => {
          setLiked(false);
        }).catch(error => alert(error.response.data.message));
      }
    } else {
      history.push('/Login');
    }
  }

  function calculateDates(date) {
    const currentDate = new Date();
    const lastDate = new Date(date);
    const daysLag = Math.ceil(Math.abs(lastDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    return daysLag;
  }

  useEffect(() => {
    getDetailData();
  }, []);

  useEffect(() => {
    checkFavorites();
  }, [token]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  useEffect(() => {
    if (DetailPageRef.current && productData.AD_DETAIL) {
      setTimeout(() => {
        const showMoreButton = DetailPageRef.current.clientHeight > 760;
        if (showMoreButton) setShowMore({ ...showMore, visible: true });
      }, 200);
    }
  }, [productData]);


  return (
    <Box maxWidth="1160px" margin="0 auto" className="campaign-detail">
      <Hidden mdUp>
        <TopMenu title="캠페인 안내" history={history} />
      </Hidden>
      <Grid container>
        <Grid item xs>
          <Box py={isMD ? 6 : 2} pr={isMD ? 6 : 2} pl={isLG ? 0 : 2}>
            {
              loading ? (
                <Skeleton variant="text" height={33} />
              ) : (
                <StyledText fontSize={isMD ? '33' : '20'}>{productData.AD_NAME}</StyledText>
              )
            }
            <Box mt={isMD ? 3 : 2} mb={isMD ? 5 : 2}>
              {
                loading ? (
                  <Skeleton variant="text" height={16} />
                ) : (
                  <StyledText fontSize={isMD ? '16' : '14'} color={Colors.grey2}>{ReactHtmlParser(productData.AD_SHRT_DISC)}</StyledText>
                )
              }
            </Box>
            <Hidden smDown>
              <Grid container justify="flex-end">
                <Grid item>
                  <Box width="130px" mb={2}>
                    <Grid container justify="space-between">
                      <Grid item>
                        {
                          liked ? (
                            <Favorite onClick={favoriteClick} style={{ color: Colors.pink3 }} />
                          ) : (
                            <FavoriteBorder onClick={favoriteClick} style={{ color: Colors.grey8 }} />
                          )
                        }
                        {/* <Favorite onClick={favoriteClick} classes={liked ? { root: classes.root } : null} /> */}
                      </Grid>
                      <Grid item><Share /></Grid>
                      <Grid item><Print /></Grid>
                      <Grid item><Error /></Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Hidden>
            {loading ? (
              <Skeleton variant="rect" width="100%" height={435} />
            ) : (
              <StyledImage width="100%" height={isMD ? '435px' : 'auto'} src={currentImage || testImage} />
            )}

            <Box mt={1} mb={isMD ? 5 : 1}>
              <Grid container spacing={1}>
                {productData.TB_PHOTO_ADs.map(item => (
                  <Grid item xs={2} key={item.PHO_FILE}>
                    <StyledImage width="100%" src={item.PHO_FILE} alt="noFoto" onMouseOver={() => setCurrentImage(item.PHO_FILE)} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Grid container justify={isMD ? 'flex-end' : 'flex-start'} spacing={1}>
              <Grid item xs={12} md={7}>
                <Box border={isMD ? `1px solid ${Colors.grey7}` : null} borderRadius="5px" px={isMD ? 3 : 0} pt={isMD ? 3 : 1} pb={isMD ? 6 : 4}>
                  <StyledText fontSize="16px" fontWeight="bold">리뷰어 신청현황</StyledText>
                  <Box mt={isMD ? 3 : 2}>
                    <Grid container alignItems="center" justify="space-between">
                      <Grid item>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <StyledSvg
                            component={SupervisorAccount}
                            color={Colors.grey5}
                            fontSize="20px"
                          />
                          <StyledText overflowHidden fontSize="15" color={Colors.grey5}>
                            <span style={{ color: Colors.pink, margin: '2px', fontWeight: 'bold' }}>{`${productData.TB_PARTICIPANTs.length} `}</span>
                            명
                          </StyledText>
                        </div>
                      </Grid>
                      <Grid item>
                        <StyledText overflowHidden fontSize="15" color={Colors.grey5}>
                          <span style={{ color: Colors.black, fontWeight: 'bold' }}>{`${productData.AD_INF_CNT} `}</span>
                          명
                        </StyledText>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box mt={1} height="5px" borderRadius="50px" overflow="hidden" css={{ background: Colors.grey6 }}>
                    <Box height="4px" width={`${productData.proportion}%`} css={{ background: Colors.pink2 }} />
                  </Box>
                  <div style={{ position: 'relative', top: '9px', left: '-23px' }}>
                    <div
                      className="percent_bubble_layer"
                      style={{
                        position: 'absolute', top: '10', left: productData.proportion > 100 ? '100%' : `${productData.proportion}%`, padding: '5px 0'
                      }}
                    >
                      <StyledText fontSize="12" color={Colors.pink}>{`${productData.proportion}%`}</StyledText>
                    </div>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box border={isMD ? `1px solid ${Colors.grey7}` : null} borderRadius="5px" p={isMD ? 3 : 0} pt={isMD ? 3 : 1}>
                  <Grid container spacing={isMD ? 3 : 2}>
                    <Grid item xs={12}>
                      <Grid container justify="space-between">
                        <Grid item><StyledText fontWeight="bold">카테고리</StyledText></Grid>
                        <Grid item><StyledText>{`${AdvertiseTypes.mainType[productData.AD_CTG]}/${AdvertiseTypes.subType[productData.AD_CTG][productData.AD_CTG2]}`}</StyledText></Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justify="space-between">
                        <Grid item><StyledText fontWeight="bold">진행상태</StyledText></Grid>
                        <Grid item>
                          <StyledText color={Colors.pink}>
                            {`리뷰어신청 D-${calculateDates(productData.AD_SRCH_END)}`}
                          </StyledText>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justify="space-between" alignItems="center">
                        <Grid item><StyledText fontWeight="bold">모집희망SNS</StyledText></Grid>
                        <Grid item>
                          <Grid container spacing={1}>
                            <Grid item><StyledImage width="21px" height="21px" src={IconInsta} /></Grid>
                            <Grid item><StyledImage width="21px" height="21px" src={IconYoutube} /></Grid>
                            <Grid item><StyledImage width="21px" height="21px" src={IconBlog} /></Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Box mt={isMD ? 10 : 2} borderBottom={`1px solid ${Colors.grey7}`}>
              <Grid container>
                <ElementLink name="detail" />
                <Grid item style={{ width: isMD ? 'auto' : '50%' }}>
                  <TabComponent isMD={isMD} tab={tab} setTab={setTab} text="상세정보" tabNumber={1} />
                </Grid>
                <Grid item style={{ width: isMD ? 'auto' : '50%' }}>
                  <TabComponent isMD={isMD} tab={tab} setTab={setTab} text={`신청한 리뷰어 ${productData.TB_PARTICIPANTs.length}`} tabNumber={2} />
                </Grid>
              </Grid>
            </Box>
            {tab === 1 ? (
              <Box
                style={{
                  textAlign: 'center',
                  maxHeight: showMore.isOpen ? 'none' : '760px',
                  overflow: 'hidden'
                }}
              >
                <div ref={DetailPageRef}>
                  {ReactHtmlParser(productData.AD_DETAIL)}
                </div>
              </Box>

            ) : (
              <ParticipantList adId={adId} isMD={isMD} />
            )}
            {showMore.visible && tab === 1 ? (
              <Box mt={1} borderTop={`1px solid ${Colors.grey8}`}>
                <StyledButton variant="text" background="#ffffff" color="#666" hoverBackground="#f8f8f8" onClick={toggleShowMore}>
                  {showMore.isOpen ? (
                    <React.Fragment>
                        상세 페이지 주리기
                      <ExpandLess />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                        상세 페이지 더보기
                      <ExpandMore />
                    </React.Fragment>
                  )}
                </StyledButton>
              </Box>
            ) : null}
            <Grid container spacing={isMD ? 4 : 2} style={{ fontSize: isMD ? '16px' : '14px' }}>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <ElementLink name="provide" />
                  <Grid item>
                    <Box width="125px" fontWeight="bold" component="p">제공내역</Box>
                  </Grid>
                  <Grid item xs={12} sm className="provide-info">
                    {ReactHtmlParser(productData.AD_PROVIDE)}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <ElementLink name="search" />
                  <Grid item>
                    <Box width="125px" fontWeight="bold">
                      검색 키워드
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm className="provide-info">
                    <Box>
                      {productData.AD_SEARCH_KEY}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <ElementLink name="discription" />
                  <Grid item>
                    <Box width="125px" fontWeight="bold">
                      참여 안내 사항
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm className="provide-info">
                    <Box>
                      {ReactHtmlParser(productData.AD_DISC)}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <ElementLink name="info" />
                  <Grid item>
                    <Box width="125px" fontWeight="bold">
                      업체 정보
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm className="provide-info">
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item><Box width="65px" fontWeight="bold">주소</Box></Grid>
                          <Grid item xs>
                            {`(${productData.AD_POST_CODE}) ${productData.AD_ROAD_ADDR} ${productData.AD_DETAIL_ADDR} ${productData.AD_EXTR_ADDR}`}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item><Box width="65px" fontWeight="bold">연락처</Box></Grid>
                          <Grid item xs>{productData.AD_TEL}</Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item><Box width="65px" fontWeight="bold">이메일</Box></Grid>
                          <Grid item xs>{productData.AD_EMAIL}</Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* <Grid item xs>
          <Box height="1000px" css={{ background: 'green' }}>test</Box>
        </Grid> */}
        {isMD ? (
          <Grid item style={{ borderLeft: '1px solid #eee' }}>
            <Box width="360px" position="relative">
              <Box position="absolute" top={isSticky ? '-92px' : '0'} left="0">
                <Box position={isSticky ? 'fixed' : 'static'}>
                  <Box py={isMD ? 6 : 2} pl={isLG ? 6 : 2} pr={isLG ? 0 : 2} width="312px">
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <StyledText fontSize="16" fontWeight="bold">{`리뷰어 신청  ${productData.AD_SRCH_START} ~ ${productData.AD_SRCH_END}`}</StyledText>
                      </Grid>
                      <Grid item xs={12}><Divider /></Grid>
                      <Grid item xs={12}>
                        <StyledText fontSize="18" cursor="pointer" onClick={() => scrollTo('detail')}>캠페인 상세정보</StyledText>
                      </Grid>
                      <Grid item xs={12}><Divider /></Grid>
                      <Grid item xs={12}>
                        <StyledText fontSize="18" cursor="pointer" onClick={() => scrollTo('provide')}>제공내역</StyledText>
                      </Grid>
                      <Grid item xs={12}><Divider /></Grid>
                      <Grid item xs={12}>
                        <StyledText fontSize="18" cursor="pointer" onClick={() => scrollTo('search')}>검색 키워드</StyledText>
                      </Grid>
                      <Grid item xs={12}><Divider /></Grid>
                      <Grid item xs={12}>
                        <StyledText fontSize="18" cursor="pointer" onClick={() => scrollTo('discription')}>참여 안내 사항</StyledText>
                      </Grid>
                      <Grid item xs={12}><Divider /></Grid>
                      <Grid item xs={12}>
                        <StyledText fontSize="18" cursor="pointer" onClick={() => scrollTo('info')}>업체 정보</StyledText>
                      </Grid>
                      <Grid item xs={12}><Divider /></Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        ) : null}

      </Grid>
      {
        isMD ? null : (
          <Box
            position="fixed"
            bottom="0"
            zIndex="2"
            borderTop={`1px solid ${Colors.grey7}`}
            width="100%"
            css={{ backgroundColor: Colors.white }}
          >
            <Grid container alignItems="center">
              <Grid item>
                <Box px={2} color={Colors.pink3}>
                  {
                    liked ? (
                      <Favorite onClick={favoriteClick} style={{ color: Colors.pink3 }} />
                    ) : (
                      <FavoriteBorder onClick={favoriteClick} style={{ color: Colors.grey8 }} />
                    )
                  }
                </Box>
              </Grid>
              <Grid item xs>
                <StyledButton variant="text" height={60} borderRadius="0" onClick={sendRequest}>신청하기</StyledButton>
              </Grid>
            </Grid>

          </Box>
        )
      }
    </Box>
  );
}

export default CampaignDetail;
