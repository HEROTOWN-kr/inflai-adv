import React, { useState } from 'react';
import {
  Box, Button, Dialog, Grid, IconButton, makeStyles, useMediaQuery
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { Colors } from '../../../lib/Сonstants';
import StyledImage from '../../../containers/StyledImage';
import Instagram from '../../../img/instagram-icon.png';
import Youtube from '../../../img/youtube-square.png';
import Naver from '../../../img/icon_blog_url.png';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#b9b9b9de'
  },
  paper: {
    margin: '12px',
    maxWidth: '300px',
    width: '100%',
    borderRadius: '2px'
  },
  button: {
    padding: 0,
    minWidth: 0
  },
});

function CampaignCopyDialog(props) {
  const {
    open, closeDialog, copy
  } = props;

  const [type, setType] = useState(null);

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function close() {
    if (type) setType(null);
    closeDialog();
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      fullScreen={fullScreen}
      open={open}
      onClose={close}
      aria-labelledby="responsive-dialog-title"
    >
      <Box p="15px" fontSize="16px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
          캠페인 복사
        <IconButton size="medium" classes={{ root: classes.root }} onClick={close}>
          <Clear />
        </IconButton>
      </Box>
      <Box px={2} py={2} textAlign="center" boxSizing="border-box">
        SNS를 선택해주세요
        <Box m="0 auto" mt={2} width={240}>
          <Grid container justify="space-between">
            <Grid item>
              <Box
                p={1}
                border={`2px solid ${type === '1' ? 'red' : 'transparent'}`}
                onClick={() => setType('1')}
              >
                <StyledImage width="40px" height="40px" src={Instagram} />
              </Box>
            </Grid>
            <Grid item>
              <Box
                p={1}
                border={`2px solid ${type === '2' ? 'red' : 'transparent'}`}
                onClick={() => setType('2')}
              >
                <StyledImage width="40px" height="40px" src={Youtube} />
              </Box>
            </Grid>
            <Grid item>
              <Box
                p={1}
                border={`2px solid ${type === '3' ? 'red' : 'transparent'}`}
                onClick={() => setType('3')}
              >
                <StyledImage width="40px" height="40px" src={Naver} />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={4}>
          <Box width="110px" m="0 auto">
            <Button
              fullWidth
              color="primary"
              variant="contained"
              disabled={type === null}
              onClick={() => copy(type)}
            >
              복사
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default CampaignCopyDialog;
