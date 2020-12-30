import React from 'react';
import {
  Box, Dialog, useMediaQuery, IconButton, makeStyles, Typography, Grid
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Clear } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../../lib/Сonstants';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '15px',
    right: '14px',
    fontSize: '28px',
    color: '#b9b9b9de'
  },
  paper: {
    margin: '12px',
    width: '100%',
    borderRadius: '2px'
  }
});
const matchUrl = '/Campaign';

const categories = [
  {
    main: { name: '지역', url: `${matchUrl}/Area` },
    sub: [
      { name: '전체', url: `${matchUrl}/Area` },
      { name: '맛집', url: `${matchUrl}/Area/Food` },
      { name: '뷰티', url: `${matchUrl}/Area/Beauty` },
      { name: '숙박', url: `${matchUrl}/Area/Place` },
      { name: '문화', url: `${matchUrl}/Area/Culture` },
      { name: '기타', url: `${matchUrl}/Area/Other` },
    ]
  },
  {
    main: { name: '제품', url: `${matchUrl}/Product` },
    sub: [
      { name: '전체', url: `${matchUrl}/Product` },
      { name: '생활', url: `${matchUrl}/Product/Life` },
      { name: '유아동', url: `${matchUrl}/Product/Child` },
      { name: '뷰티', url: `${matchUrl}/Product/Beauty` },
      { name: '디지털', url: `${matchUrl}/Product/Digital` },
      { name: '패션', url: `${matchUrl}/Product/Fashion` },
      { name: '도서', url: `${matchUrl}/Product/Book` },
      { name: '식품', url: `${matchUrl}/Product/Food` },
    ]
  },
  {
    main: { name: '서비스', url: `${matchUrl}/Service` },
    sub: [
      { name: '전체', url: `${matchUrl}/Service` },
      { name: '쇼핑몰', url: `${matchUrl}/Service/Shopping` },
      { name: '웹서비스', url: `${matchUrl}/Service/Web` },
      { name: '이벤트', url: `${matchUrl}/Service/Event` },
      { name: '교육', url: `${matchUrl}/Service/Education` },
    ]
  },
];

function CategoryDialog(props) {
  const { open, closeDialog } = props;
  const history = useHistory();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  function clickCategory(url) {
    history.push(url);
    closeDialog();
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      // maxWidth="sm"
      onClose={closeDialog}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Box padding="20px" fontSize="18px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
          카테고리
        <Clear onClick={closeDialog} classes={{ root: classes.root }} />
      </Box>
      <Box px={2} py={2}>
        {categories.map(item => (
          <Box key={item.main.name} mb={2}>
            <Box paddingBottom="2px" fontSize="16px" fontWeight="500" borderBottom={`1px solid ${Colors.black}`} onClick={() => clickCategory(item.main.url)}>{item.main.name}</Box>
            <Grid container>
              {item.sub.map((subItem, subIndex) => (
                <Grid key={subItem.name} item xs={6}>
                  <Box
                    p={1}
                    borderBottom={`1px solid ${Colors.grey8}`}
                    borderRight={subIndex % 2 ? 'medium none color' : `1px solid ${Colors.grey8}`}
                    fontSize="14px"
                    color="#444"
                    fontWeight="300"
                    onClick={() => clickCategory(subItem.url)}
                  >
                    {subItem.name}
                  </Box>
                </Grid>
              ))}
              {item.sub.length % 2 ? (
                <Grid item xs={6}>
                  <Box height="37px" borderBottom={`1px solid ${Colors.grey8}`} />
                </Grid>
              ) : null}
            </Grid>
          </Box>
        ))}

      </Box>
    </Dialog>
  );
}

export default CategoryDialog;
