import React, { useContext } from 'react';
import { Box, Grid, Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MobileUserMenu from './MobileView/MobileUserMenu';
import UserMenuPopper from './UserMenuPopper';
import AuthContext from '../../context/AuthContext';


function UserMenu(props) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Hidden smDown>
      {
          isAuthenticated ? (
            <UserMenuPopper {...props} />
          ) : (
            <Link
              className="link"
              to="/Login"
            >
                로그인 | 회원가입
            </Link>
          )
        }
    </Hidden>
  );
}

function NavbarUserMenu(props) {
  return (
    <>
      <UserMenu {...props} />
      <MobileUserMenu {...props} />
    </>
  );
}

export default NavbarUserMenu;
