import React, {
  Fragment, useContext, useEffect, useState
} from 'react';
import {
  Box, Grid, makeStyles, Typography, useMediaQuery, useTheme
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import CampaignCopyCard from './CampaignCopyCard';
import noFound from '../../../img/notFound400_316.png';
import MyPagination from '../../../containers/MyPagination';
import CampaignCopyDialog from './CampaignCopyDialog';
import StyledBackDrop from '../../../containers/StyledBackDrop';
import StyledButton from '../../../containers/StyledButton';
import useLoading from '../../../hooks/useLoading';

const useStyles = makeStyles({
  title: {
    fontFamily: 'Noto Sans KR, sans-serif',
    fontWeight: 700,
    marginTop: '96px',
    marginBottom: '70px'
  }
});

function CampaignCopy(props) {
  const [axiosLoading, setAxiosLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const [copyDialog, setCopyDialog] = useState({
    open: false,
    id: null
  });

  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, setLoading } = useContext(AuthContext);

  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const is1300 = useMediaQuery('(min-width:1300px)');
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  function getCardWidth() {
    if (isXl) {
      return '20%';
    } if (is1300) {
      return '20%';
    } if (isLG) {
      return '25%';
    } if (isMD) {
      return '33.333%';
    }
    return '50%';
  }

  function toggleCopyDialog(id) {
    setCopyDialog({
      id: id || null,
      open: !copyDialog.open
    });
  }

  function copy(type) {
    const { id } = copyDialog;
    if (!id) return;

    toggleCopyDialog();
    setLoading(true);
    axios.post('/api/TB_AD/copyAd', { id, type }).then((res) => {
      const { AD_ID } = res.data.data;
      setLoading(false);
      history.push(`/Campaign/Edit/${AD_ID}`);
    }).catch((err) => {
      setLoading(false);
      alert(err.response.data.message);
    });
  }

  function getCampaigns() {
    setAxiosLoading(true);
    const params = {
      token, page, limit: 5, tab: 1
    };
    // if (searchWord.length > 0) params.searchWord = searchWord;

    axios.get('/api/TB_AD/', {
      params
    }).then((res) => {
      const { data } = res.data;
      setCampaigns(data);
      setCount(res.data.count);
      setAxiosLoading(false);
    }).catch((err) => {
      setAxiosLoading(false);
      alert(err);
    });
  }

  const changePage = (event, value) => {
    setPage(value);
  };


  useEffect(() => {
    if (token) getCampaigns();
  }, [token, page]);

  return (
    <Fragment>
      <Box borderBottom="1px solid #e4dfdf">
        <Box maxWidth={1276} m="0 auto">
          <Typography variant="h4" classes={{ root: classes.title }}>캠페인 복사</Typography>
        </Box>
      </Box>
      <Box bgcolor="#f4f4f4" pt={4}>
        <Box maxWidth={1276} m="0 auto">
          {axiosLoading ? (
            <Grid container spacing={isMD ? 3 : 1}>
              { Array(5).fill().map((item, index) => (
                <Grid key={`${item}${index.toString()}`} item style={{ width: getCardWidth() }}>
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
              ))}

            </Grid>
          ) : (
            <Fragment>
              { campaigns.length > 0 ? (
                <Grid container spacing={isMD ? 3 : 1}>
                  {campaigns.map((item) => {
                    const {
                      AD_ID, AD_TYPE, AD_CTG, AD_CTG2, AD_SRCH_END, AD_NAME, AD_SHRT_DISC,
                      TB_PARTICIPANTs, AD_INF_CNT, proportion, TB_PHOTO_ADs, AD_REPORT, AD_CAM_TYPE
                    } = item;
                    return (
                      <Grid item style={{ width: getCardWidth() }} key={AD_ID}>
                        <CampaignCopyCard
                          AD_ID={AD_ID}
                          campaignType={AD_CAM_TYPE}
                          getCampaigns={getCampaigns}
                          image={TB_PHOTO_ADs[0] ? TB_PHOTO_ADs[0].PHO_FILE_URL : noFound}
                          type={AD_TYPE}
                          ctg1={AD_CTG}
                          ctg2={AD_CTG2}
                          report={AD_REPORT}
                          srchEnd={AD_SRCH_END}
                          name={AD_NAME}
                          shrtDisc={AD_SHRT_DISC}
                          participantsLength={TB_PARTICIPANTs.length}
                          cnt={AD_INF_CNT}
                          proportion={proportion}
                          isMD={isMD}
                          clickCard={() => toggleCopyDialog(AD_ID)}
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
            </Fragment>
          )}
        </Box>
        {campaigns.length > 0 ? (
          <Box py={{ xs: 1, md: 6 }}>
            <Grid container justify="center">
              <Grid item>
                <MyPagination
                  itemCount={count}
                  page={page}
                  changePage={changePage}
                  perPage={5}
                />
              </Grid>
            </Grid>
          </Box>
        ) : null}
      </Box>
      <CampaignCopyDialog
        open={copyDialog.open}
        closeDialog={toggleCopyDialog}
        copy={copy}
      />
    </Fragment>
  );
}

export default CampaignCopy;
