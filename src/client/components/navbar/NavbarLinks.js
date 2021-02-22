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
    text: '홍보하기',
    link: '/Campaign'
  },
  {
    text: '멤버십',
    link: '/Membership'
  },
  {
    text: '캠페인 관리',
    link: '/Profile/CampaignInfo'
  },
  /* {
    text: 'LoginNew',
    link: '/LoginNew'
  },
  {
    text: 'SignUpNew',
    link: '/SignUpNew'
  },
  {
    text: 'Join',
    link: '/Join'
  },
  {
    text: 'Activate',
    link: '/Activate/17d325b554fd95143e18be66cc172725:b1a7d695fdec720c92ceb32fbbda6da1'
  },
  {
    text: 'Reset',
    link: '/Reset/17d325b554fd95143e18be66cc172725:b1a7d695fdec720c92ceb32fbbda6da1'
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
