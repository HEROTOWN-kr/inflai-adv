import React, {
  useCallback,
  useContext, useEffect, useState
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
import { Colors, AdvertiseTypes } from '../../../lib/Сonstants';
import IconYoutube from '../../../img/icon_youtube_url.png';
import IconInsta from '../../../img/icon_instagram_url.png';
import IconBlog from '../../../img/icon_blog_url.png';
import StyledText from '../../../containers/StyledText';
import StyledImage from '../../../containers/StyledImage';
import StyledSvg from '../../../containers/StyledSvg';
import StyledButton from '../../../containers/StyledButton';
import AuthContext from '../../../context/AuthContext';
import TopMenu from '../TopMenu';
import ParticipantList from './ParticipantList';
import SelectedList from './SelectedList';
import CampaignParInsta from './CampaignParInsta';
import CampaignParBlog from './CampaignParBlog';

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
      <StyledText fontSize={isMD ? '16px' : '14px'} fontWeight={styles.fontWeight} textAlign="center">{text}</StyledText>
    </Box>
  );
}

function ParticipantComponent(props) {
  const { type } = props;
  if (type === '1') {
    return <CampaignParInsta />;
  } if (type === '2') {
    return <Box>Youtube</Box>;
  } if (type === '3') {
    return <CampaignParBlog />;
  }
  return null;
}

function CampaignDetail() {
  const history = useHistory();
  const params = useParams();
  const adId = params.id;
  const [productData, setProductData] = useState({
    AD_PROVIDE: '',
    AD_SHRT_DISC: '',
    AD_DISC: '',
    TB_PHOTO_ADs: [],
    TB_PARTICIPANTs: [],
    AD_CTG: 0
  });
  const [currentImage, setCurrentImage] = useState('');
  const [isSticky, setSticky] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState({ visible: false, isOpen: false });
  const [tab, setTab] = useState(2);
  const testImage = 'https://www.inflai.com/attach/portfolio/33/1yqw1whkavscxke.PNG';
  const { token } = useContext(AuthContext);
  const theme = useTheme();
  const Scroller = Scroll.scroller;
  const ElementLink = Scroll.Element;

  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

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

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setTimeout(() => {
        const showMoreButton = node.getBoundingClientRect().height > 760;
        if (showMoreButton) setShowMore({ ...showMore, visible: true });
      }, 200);
    }
  }, []);

  function getDetailData() {
    if (token) {
      setLoading(true);
      const apiObj = {
        id: adId, token
      };

      axios.get('/api/TB_AD/campaignDetail', {
        params: apiObj
      }).then((res) => {
        if (res.status === 201) {
          history.push('/');
        } else {
          const { data } = res.data;
          setProductData(data);
          setCurrentImage(data.TB_PHOTO_ADs[0].PHO_FILE_URL);
          setLoading(false);
        }
      }).catch(err => alert(err.response.data.message));
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
  }, [token]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return (
    <Box maxWidth="1250px" margin="0 auto" className="campaign-detail">
      <Hidden mdUp>
        <TopMenu title="캠페인 안내" history={history} />
      </Hidden>
      <Grid container>
        <Grid item xs>
          <Box py={isMD ? 6 : 2} pr={isMD ? 6 : 2} pl={isLG ? 0 : 2}>
            {loading ? (
              <Skeleton variant="text" height={33} />
            ) : (
              <Box fontSize={isMD ? '33px' : '20px'}>{productData.AD_NAME}</Box>
            )}
            <Box mt={isMD ? 3 : 2} mb={isMD ? 5 : 2}>
              {loading ? (
                <Skeleton variant="text" height={16} />
              ) : (
                <Box fontSize={isMD ? '16px' : '14px'} whiteSpace="pre-wrap" color={Colors.grey2}>
                  {productData.AD_SHRT_DISC}
                </Box>
              )}
            </Box>
            {loading ? (
              <Skeleton variant="rect" width="100%" height={435} />
            ) : (
              <StyledImage width="550px" height={isMD ? '435px' : 'auto'} src={currentImage || testImage} />
            )}
            <Box mt={1} mb={isMD ? 5 : 1}>
              <Grid container spacing={1}>
                {productData.TB_PHOTO_ADs.map(item => (
                  <Grid item xs={2} key={item.PHO_FILE_URL}>
                    <StyledImage width="100%" src={item.PHO_FILE_URL} alt="noFoto" onMouseOver={() => setCurrentImage(item.PHO_FILE_URL)} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Grid container justify={isMD ? 'flex-end' : 'flex-start'} spacing={1}>
              <Grid item xs={12} md={7}>
                <Box border={isMD ? `1px solid ${Colors.grey7}` : null} borderRadius="5px" px={isMD ? 3 : 0} pt={isMD ? 3 : 1} pb={isMD ? 6 : 4}>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <StyledText fontSize="16px" fontWeight="bold">리뷰어 신청현황</StyledText>
                    </Grid>
                    {isMD ? null : (
                      <Grid item>
                        <Box>
                          <StyledButton background={Colors.pink3} hoverBackground={Colors.pink} padding="5px" height="34px" onClick={() => history.push(`/Campaign/Edit/${adId}`)}>수정</StyledButton>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                  <Box mt={isMD ? 3 : 2}>
                    <Grid container alignItems="center" justify="space-between">
                      <Grid item>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <StyledSvg
                            component={SupervisorAccount}
                            color={Colors.grey5}
                            fontSize="20px"
                          />
                          <StyledText overflowHidden fontSize="15px" color={Colors.grey5}>
                            <span style={{ color: Colors.pink, margin: '2px', fontWeight: 'bold' }}>{`${productData.TB_PARTICIPANTs.length} `}</span>
                            명
                          </StyledText>
                        </div>
                      </Grid>
                      <Grid item>
                        <StyledText overflowHidden fontSize="15px" color={Colors.grey5}>
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
                      <StyledText fontSize="12px" color={Colors.pink}>{`${productData.proportion}%`}</StyledText>
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
                            {productData.AD_TYPE === '1' ? (
                              <Grid item><StyledImage width="21px" height="21px" src={IconInsta} /></Grid>
                            ) : null}
                            {productData.AD_TYPE === '2' ? (
                              <Grid item><StyledImage width="21px" height="21px" src={IconYoutube} /></Grid>
                            ) : null}
                            {productData.AD_TYPE === '3' ? (
                              <Grid item><StyledImage width="21px" height="21px" src={IconBlog} /></Grid>
                            ) : null}
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
                <Grid item style={{ width: isMD ? 'auto' : '50%' }}>
                  <TabComponent isMD={isMD} tab={tab} setTab={setTab} text={productData.AD_TYPE === '1' ? 'AI 분석' : '분석'} tabNumber={3} />
                </Grid>
                <Grid item style={{ width: isMD ? 'auto' : '50%' }}>
                  <TabComponent isMD={isMD} tab={tab} setTab={setTab} text="선정 리뷰어" tabNumber={4} />
                </Grid>
              </Grid>
            </Box>
            {tab === 1 ? (
              <Box style={{
                textAlign: 'center',
                maxHeight: showMore.isOpen ? 'none' : '760px',
                overflow: 'hidden',
                wordBreak: 'break-all'
              }}
              >
                <div ref={measuredRef}>
                  {ReactHtmlParser(productData.AD_DETAIL)}
                </div>
              </Box>
            ) : null}
            {tab === 2 ? (
              <ParticipantList adId={adId} isMD={isMD} />) : null}
            {tab === 3 ? (
              <ParticipantComponent type={productData.AD_TYPE} />) : null}
            {tab === 4 ? (
              <SelectedList adId={adId} isMD={isMD} />) : null}
            {showMore.visible && tab === 1 ? (
              <Box mt={1} borderTop={`1px solid ${Colors.grey8}`}>
                <StyledButton variant="text" background="#ffffff" color="#666" hoverBackground="#f8f8f8" onClick={toggleShowMore}>
                  {showMore.isOpen ? (
                    <React.Fragment>
                      상품정보접기
                      <ExpandLess />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      상품정보 더보기
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
                    <Box width="125px" fontWeight="bold">제공내역</Box>
                  </Grid>
                  <Grid item xs={12} sm className="provide-info">
                    {productData.AD_PROVIDE}
                  </Grid>
                </Grid>
              </Grid>
              {productData.AD_MONEY ? (
                <React.Fragment>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <ElementLink name="provide" />
                      <Grid item>
                        <Box width="125px" fontWeight="bold">제공금액</Box>
                      </Grid>
                      <Grid item xs={12} sm className="provide-info">
                        {`${productData.AD_MONEY}원`}
                      </Grid>
                    </Grid>
                  </Grid>
                </React.Fragment>
              ) : null}
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
                    <Box>{productData.AD_SEARCH_KEY}</Box>
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
                    <Box>{productData.AD_DISC}</Box>
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
                      {productData.AD_POST_CODE ? (
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item><Box width="65px" fontWeight="bold">주소</Box></Grid>
                            <Grid item xs>
                              {`(${productData.AD_POST_CODE}) ${productData.AD_ROAD_ADDR} ${productData.AD_DETAIL_ADDR} ${productData.AD_EXTR_ADDR || ''}`}
                            </Grid>
                          </Grid>
                        </Grid>
                      ) : null}
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
                        <StyledText fontSize="16px" fontWeight="bold">{`리뷰어 신청  ${productData.AD_SRCH_START} ~ ${productData.AD_SRCH_END}`}</StyledText>
                      </Grid>
                      <Grid item xs={12}><Divider /></Grid>
                      <Grid item xs={12}>
                        <StyledText fontSize="18px" cursor="pointer" onClick={() => scrollTo('detail')}>캠페인 상세정보</StyledText>
                      </Grid>
                      <Grid item xs={12}><Divider /></Grid>
                      <Grid item xs={12}>
                        <StyledText fontSize="18px" cursor="pointer" onClick={() => scrollTo('provide')}>제공내역</StyledText>
                      </Grid>
                      <Grid item xs={12}><Divider /></Grid>
                      <Grid item xs={12}>
                        <StyledText fontSize="18px" cursor="pointer" onClick={() => scrollTo('search')}>검색 키워드</StyledText>
                      </Grid>
                      <Grid item xs={12}><Divider /></Grid>
                      <Grid item xs={12}>
                        <StyledText fontSize="18px" cursor="pointer" onClick={() => scrollTo('discription')}>참여 안내 사항</StyledText>
                      </Grid>
                      <Grid item xs={12}><Divider /></Grid>
                      <Grid item xs={12}>
                        <StyledText fontSize="18px" cursor="pointer" onClick={() => scrollTo('info')}>업체 정보</StyledText>
                      </Grid>
                      <Grid item xs={12}><Divider /></Grid>
                      <Grid item xs={12}>
                        <StyledButton background={Colors.pink3} hoverBackground={Colors.pink} fontWeight="bold" fontSize="20px" onClick={() => history.push(`/Campaign/Edit/${adId}`)}>
                          캠페인 수정하기
                        </StyledButton>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
}

export default CampaignDetail;
