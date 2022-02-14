import React, { useState } from 'react';
import {
  Box, Grid, IconButton, Tooltip
} from '@material-ui/core';
import {
  Edit, FileCopy, RemoveRedEye, SupervisorAccount
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import StyledImage from '../../containers/StyledImage';
import StyledText from '../../containers/StyledText';
import { AdvertiseTypes, Colors } from '../../lib/Сonstants';
import StyledSvg from '../../containers/StyledSvg';
import noImage from '../../img/noImage.png';
import noFound from '../../img/notFound400_316.png';
import CopyDialog from '../profile/pages/CampaignInfo/CopyDialog';

const snsTypes = {
  1: {
    text: 'Instagram',
    color: Colors.pink
  },
  2: {
    text: 'Youtube',
    color: Colors.red
  },
  3: {
    text: 'Blog',
    color: Colors.green
  }
};

const useStyles = makeStyles({
  root: {
    background: '#ffffff'
  },
  endAdornment: {
    padding: '0'
  },
  iconButton: {
    padding: '8px'
  },
  icon: {
    cursor: 'pointer',
    '&:hover': {
      color: '#3f51b5'
    }
  },
  tableRowRoot: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#9199b6'
    }
  }
});

function CampaignCard(props) {
  const {
    AD_ID, getCampaigns, image, type, srchEnd, name, report,
    shrtDisc, participantsLength, cnt, proportion, onClick, isMD
  } = props;

  const [selectedCampaign, setSelectedCampaign] = useState(0);
  const [copyDialog, setCopyDialog] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  function calculateDates(date) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const lastDate = new Date(date);
    if (lastDate < currentDate) {
      return '마감';
    }
    const daysLag = Math.ceil(Math.abs(lastDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    return daysLag;
  }

  function toggleCopyDialog() {
    setCopyDialog(!copyDialog);
  }

  function copy() {
    setSelectedCampaign(AD_ID);
    toggleCopyDialog();
  }

  function edit() {
    history.push(`/Campaign/Edit/${AD_ID}`);
  }

  return (
    <Box border="1px solid #eaeaea" overflow="hidden" borderRadius="10px">
      <StyledImage width="100%" height="auto" src={image || noImage} onError={event => event.target.setAttribute('src', noFound)} onClick={onClick} />
      <Box borderTop="1px solid #eaeaea" p={isMD ? 3 : 1}>
        <Grid container spacing={isMD ? 2 : 1}>
          <Grid item xs={12}>
            <Grid container justify="space-between" alignItems="flex-end">
              <Grid item>
                <Grid container>
                  { report === '1' ? (
                    <Grid item>
                      <Box mr="4px" color="#0027ff" fontWeight="600">(기자단)</Box>
                    </Grid>
                  ) : null}
                  <Grid item>
                    <Box mr="4px" color={snsTypes[type].color} fontWeight="600">{snsTypes[type].text}</Box>
                  </Grid>
                  <Grid item>
                    {` D-${calculateDates(srchEnd)}`}
                  </Grid>
                </Grid>
                {/* <StyledText overflowHidden lineHeight="1.3em">
                  {type === '1' ? (
                    <span style={{ color: Colors.pink, fontWeight: '600' }}>Instagram</span>
                  ) : null}
                  {type === '2' ? (
                    <span style={{ color: Colors.red, fontWeight: '600' }}>Youtube</span>
                  ) : null}
                  {type === '3' ? (
                    <span style={{ color: Colors.green, fontWeight: '600' }}>Blog</span>
                  ) : null}
                  {` D-${calculateDates(srchEnd)}`}
                </StyledText> */}
              </Grid>
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <Tooltip title="보기" placement="top">
                      <RemoveRedEye fontSize="small" classes={{ root: classes.icon }} onClick={onClick} />
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="수정" placement="top">
                      <Edit fontSize="small" classes={{ root: classes.icon }} onClick={edit} />
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="복사" placement="top">
                      <FileCopy fontSize="small" classes={{ root: classes.icon }} onClick={copy} />
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <StyledText overflowHidden fontWeight="bold" fontSize="16px">
              {name}
            </StyledText>
          </Grid>
          <Grid item xs={12}>
            <StyledText overflowHidden fontSize="13px" color={Colors.grey5}>
              {shrtDisc}
            </StyledText>
          </Grid>
          <Grid item xs={12}>
            <Box pt={isMD ? 1 : 0}>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <StyledSvg
                      component={SupervisorAccount}
                      color={Colors.grey5}
                      fontSize="20px"
                    />
                    <StyledText overflowHidden fontSize="13px" color={Colors.grey5}>
                      <span style={{ color: Colors.pink }}>{participantsLength}</span>
                      {`/${cnt}명`}
                    </StyledText>
                  </div>
                </Grid>
                <Grid item>
                  <StyledText overflowHidden fontSize="13px" color={Colors.grey5}>
                    {`${proportion}%`}
                  </StyledText>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box height="5px" borderRadius="50px" overflow="hidden" css={{ background: Colors.grey6 }}>
              <Box height="4px" width={`${proportion}%`} css={{ background: Colors.pink2 }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <CopyDialog
        open={copyDialog}
        campaignId={selectedCampaign}
        closeDialog={toggleCopyDialog}
        getCampaigns={getCampaigns}
      />
    </Box>

  );
}

export default CampaignCard;
