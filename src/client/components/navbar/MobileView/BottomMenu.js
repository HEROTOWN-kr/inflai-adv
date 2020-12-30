import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../../lib/Сonstants';
import StyledText from '../../../containers/StyledText';
import CategoryDialog from './CategoryDialog';

const MenuCategory = [
  {
    icon: 'icon: home; ratio: 1.2',
    text: '홈',
    link: '/'
  },
  {
    icon: 'icon: menu; ratio: 1.2',
    text: '카테고리',

  },
  {
    icon: 'icon: heart; ratio: 1.2',
    text: '스크랩북',
    link: '/Profile/Favorite'
  },
  {
    icon: 'icon: info; ratio: 1.2',
    text: '회원정보수정',
    link: '/Profile/UserInfo'
  },
  {
    icon: 'icon: user; ratio: 1.2',
    text: '마이페이지',
    link: '/Profile/MyPage'
  },
];

function BottomMenu() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const history = useHistory();

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function clickMenuButton(item) {
    if (item.link) {
      history.push(item.link);
    } else {
      toggleDialog();
    }
  }

  return (
    <Box
      position="fixed"
      bottom="0"
      zIndex="1"
      borderTop={`1px solid ${Colors.grey7}`}
      width="100%"
      css={{ backgroundColor: Colors.white }}
    >
      <Grid container>
        {MenuCategory.map(item => (
          <Grid key={item.text} item style={{ width: '20%' }}>
            <Box py={1} textAlign="center" onClick={() => clickMenuButton(item)}>
              <span uk-icon={item.icon} />
              <StyledText fontSize="12" lineHeight="1.4em">{item.text}</StyledText>
            </Box>
          </Grid>
        ))}
      </Grid>
      <CategoryDialog open={dialogOpen} closeDialog={toggleDialog} />
    </Box>
  );
}

export default BottomMenu;
