import React, { useState } from 'react';
import {
  Box, Grid, Tooltip, useMediaQuery, useTheme
} from '@material-ui/core';
import {
  Edit, FileCopy, RemoveRedEye, SupervisorAccount
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import StyledImage from '../../../containers/StyledImage';
import noImage from '../../../img/noImage.png';
import noFound from '../../../img/notFound400_316.png';
import StyledText from '../../../containers/StyledText';
import { Colors } from '../../../lib/Сonstants';
import StyledSvg from '../../../containers/StyledSvg';
import CopyDialog from '../../profile/pages/CampaignInfo/CopyDialog';

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

function CampaignCopyCard(props) {
  const {
    AD_ID, getCampaigns, image, type, srchEnd, name, report, campaignType,
    shrtDisc, participantsLength, cnt, proportion
  } = props;

  const [selectedCampaign, setSelectedCampaign] = useState(0);
  const [copyDialog, setCopyDialog] = useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));


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


  return (
    <Box border="1px solid #eaeaea" overflow="hidden" borderRadius="10px" onClick={copy}>
      <StyledImage width="100%" height="auto" src={image || noImage} onError={event => event.target.setAttribute('src', noFound)} />
      <Box borderTop="1px solid #eaeaea" p={isMD ? 3 : 1}>
        <Grid container spacing={isMD ? 2 : 1}>
          <Grid item xs={12}>
            <Grid container justify="space-between" alignItems="flex-end">
              <Grid item>
                <Grid container>
                  <Grid item>
                    <Box mr="4px" color={snsTypes[type].color} fontWeight="600">{snsTypes[type].text}</Box>
                  </Grid>
                  <Grid item>
                    {` D-${calculateDates(srchEnd)}`}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <StyledText overflowHidden fontWeight="bold" fontSize="16px">
              {campaignType === '2' ? (
                <span style={{ color: '#00b605' }}>[공동구매] </span>
              ) : null}
              { report === '1' ? (
                <span style={{ color: '#0027ff' }}>[기자단] </span>
              ) : null}
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

export default CampaignCopyCard;
