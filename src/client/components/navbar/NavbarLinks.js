import React, { useContext, useEffect, useState } from 'react';
import {
  Box, ClickAwayListener, Grid, Hidden, Popper
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as Scroll from 'react-scroll';
import AuthContext from '../../context/AuthContext';

const Scroller = Scroll.scroller;

const defaultMenuLinks = [
  {
    text: '인플루언서 모집',
    link: '/Campaign'
  },
  {
    text: '요금제',
    link: '/Membership'
  },
  {
    text: '인플루언서 관리',
    link: '/Profile/CampaignInfo'
  },
  /* {
    text: 'MembershipNew',
    link: '/MembershipNew'
  }, */
  /* {
    text: 'InstaDialog',
    link: '/InstaDialog'
  }, */
];

function NavbarLinks() {
  const history = useHistory();
  const { isAuthenticated } = useContext(AuthContext);
  const [menuLinks, setMenuLinks] = useState(defaultMenuLinks);

  /* useEffect(() => {
    if (isAuthenticated) {
      setMenuLinks([...defaultMenuLinks, {
        text: '캠페인 관리',
        link: '/Profile/CampaignInfo'
      }]);
    } else {
      setMenuLinks(defaultMenuLinks);
    }
  }, [isAuthenticated]); */

  return (
    <Hidden smDown>
      <Box pl={8}>
        <Grid container spacing={6}>
          {menuLinks.map(link => (
            <Grid item key={link.text}>
              <Link
                className="link"
                to={link.link}
              >
                {link.text}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Hidden>
  );
}

export default NavbarLinks;
