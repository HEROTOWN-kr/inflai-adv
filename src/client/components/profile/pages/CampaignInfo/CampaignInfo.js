import React, { useContext, useState, useEffect } from 'react';
import {
  Box, useTheme, useMediaQuery, Grid, Hidden
} from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from '@material-ui/lab';
import StyledText from '../../../../containers/StyledText';
import AuthContext from '../../../../context/AuthContext';
import { Colors } from '../../../../lib/Сonstants';
import WhiteBlock from '../../../../containers/WhiteBlock';
import PageTitle from '../../PageTitle';
import CampaignCard from '../../../campaign/CampaignCard';
import MyPagination from '../../../../containers/MyPagination';
import noImage from '../../../../img/noImage.png';
import noFound from '../../../../img/notFound400_316.png';

function TabComponent(props) {
  const {
    tab, setTab, text, tabNumber
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
      <StyledText fontSize="16px" fontWeight={styles.fontWeight}>{text}</StyledText>
    </Box>
  );
}

function CampaignInfo() {
  const history = useHistory();
  const match = useRouteMatch();
  const [tab, setTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const { token } = useContext(AuthContext);

  function getCampaigns() {
    setLoading(true);
    const params = {
      token, page, limit: 4, tab
    };

    axios.get('/api/TB_AD/', {
      params
    }).then((res) => {
      const { data } = res.data;
      setCampaigns(data);
      setCount(res.data.count);
      setLoading(false);
    }).catch(err => alert(err));
  }

  useEffect(() => {
    if (token) getCampaigns();
  }, [token]);

  useEffect(() => {
    if (token) getCampaigns();
  }, [page]);

  useEffect(() => {
    if (page !== 1) setPage(1);
    if (token) getCampaigns();
  }, [tab]);

  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const is1300 = useMediaQuery('(min-width:1300px)');
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  function getCardWidth() {
    if (isXl) {
      return '25%';
    } if (is1300) {
      return '25%';
    } if (isLG) {
      return '33.333%';
    } if (isMD) {
      return '33.333%';
    }
    return '50%';
  }

  function detailInfo(AD_ID) {
    history.push(`/Campaign/detail/${AD_ID}`);
  }

  const changePage = (event, value) => {
    setPage(value);
  };

  return (
    <WhiteBlock height="100%" borderRadius={isMD ? '7px' : '0'}>
      <Hidden smDown>
        <PageTitle>
          <StyledText fontSize="24px">
              캠페인 관리
          </StyledText>
        </PageTitle>
      </Hidden>
      <Box py={{ xs: 1, md: 4 }} px={{ xs: 1, md: 6 }}>
        <Box borderBottom={`1px solid ${Colors.grey7}`}>
          <Grid container>
            <Grid item>
              <TabComponent tab={tab} setTab={setTab} text="전체 캠페인" tabNumber={1} />
            </Grid>
            <Grid item>
              <TabComponent tab={tab} setTab={setTab} text="진행중 캠페인" tabNumber={2} />
            </Grid>
            <Grid item>
              <TabComponent tab={tab} setTab={setTab} text="종료된 캠페인" tabNumber={3} />
            </Grid>
          </Grid>
        </Box>
        <Box my={{ xs: 2, md: 4 }}>
          {loading ? (
            <Grid container>
              <Grid item style={{ width: getCardWidth() }}>
                <Box
                  border="1px solid #eaeaea"
                  overflow="hidden"
                  borderRadius="10px"
                  css={{ cursor: 'pointer' }}
                >
                  <Skeleton variant="rect" width="100%" height={isMD ? 186 : 138} />
                  <Box p={isMD ? 3 : 1}>
                    <Grid container spacing={isMD ? 2 : 1}>
                      <Grid item xs={12}>
                        <Skeleton variant="text" width="50%" />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton variant="text" />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton variant="text" />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton variant="text" />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <React.Fragment>
              { campaigns.length > 0 ? (
                <Grid container spacing={isMD ? 3 : 1}>
                  {campaigns.map((item) => {
                    const {
                      AD_ID, AD_TYPE, AD_CTG, AD_CTG2, AD_SRCH_END, AD_NAME, AD_SHRT_DISC, TB_PARTICIPANTs, AD_INF_CNT, proportion, TB_PHOTO_ADs,
                    } = item;
                    return (
                      <Grid item key={AD_ID} style={{ width: getCardWidth() }}>
                        <CampaignCard
                          image={TB_PHOTO_ADs[0] ? TB_PHOTO_ADs[0].PHO_FILE_URL : noFound}
                          type={AD_TYPE}
                          ctg1={AD_CTG}
                          ctg2={AD_CTG2}
                          srchEnd={AD_SRCH_END}
                          name={AD_NAME}
                          shrtDisc={AD_SHRT_DISC}
                          participantsLength={TB_PARTICIPANTs.length}
                          cnt={AD_INF_CNT}
                          proportion={proportion}
                          onClick={() => detailInfo(AD_ID)}
                          isMD={isMD}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <Grid container justify="center">
                  <Grid item>
                        등록된 캠페인이 없습니다.
                  </Grid>
                </Grid>
              )}
            </React.Fragment>
          )}
        </Box>
        {campaigns.length > 0 ? (
          <Box pt={{ xs: 1, md: 6 }}>
            <Grid container justify="center">
              <Grid item>
                <MyPagination
                  itemCount={count}
                  page={page}
                  changePage={changePage}
                  perPage={4}
                />
              </Grid>
            </Grid>
          </Box>
        ) : null}
      </Box>

    </WhiteBlock>
  );
}

export default CampaignInfo;
