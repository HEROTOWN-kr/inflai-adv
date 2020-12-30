import React, { useContext, useState } from 'react';
import {
  Hidden, Grid, Drawer, Box, Button, makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import UserMenuItems from '../UserMenuItems';
import AuthContext from '../../../context/AuthContext';


function MobileUserMenu(props) {
  const { history } = props;
  const { isAuthenticated } = useContext(AuthContext);

  const [openMenu, setOpenMenu] = useState(false);
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    list: {
      width: 250,
    }
  }));
  const classes = useStyles();

  const toggleDrawer = open => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenMenu(open);
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {
          isAuthenticated ? (
            <UserMenuItems {...props} />
          ) : (
            <Box my={2}>
              <Grid container justify="center">
                <Grid item xs={7}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push('/Join/Type')}
                  >
                      로그인 | 회원가입
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )
        }
    </div>
  );

  return (
    <Hidden mdUp>
      <Grid item xs={6}>
        <Grid container justify="flex-end">
          <Grid item>
            <div onClick={toggleDrawer(true)} className="menu-icon">
              <MenuIcon />
            </div>
          </Grid>
        </Grid>
        <Drawer anchor="right" open={openMenu} onClose={toggleDrawer(false)}>
          {sideList()}
        </Drawer>
      </Grid>
      <Grid item xs={1} />
    </Hidden>
  );
}

export default MobileUserMenu;
