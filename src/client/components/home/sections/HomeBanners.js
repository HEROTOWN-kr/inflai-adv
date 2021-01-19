import React from 'react';
import { Box } from '@material-ui/core';
import Slider from 'react-slick';
import webBanner1 from '../../../img/banners/webBanner1.jpg';
import webBanner2 from '../../../img/banners/webBanner2.jpg';
import webBanner3 from '../../../img/banners/webBanner3.jpg';
import webBanner4 from '../../../img/banners/webBanner4.jpg';
import webBanner5 from '../../../img/banners/webBanner5.jpg';
import mobWebBanner1 from '../../../img/banners/mobWebBanner1.jpg';
import mobWebBanner2 from '../../../img/banners/mobWebBanner2.jpg';
import mobWebBanner3 from '../../../img/banners/mobWebBanner3.jpg';
import mobWebBanner4 from '../../../img/banners/mobWebBanner4.jpg';
import mobWebBanner5 from '../../../img/banners/mobWebBanner5.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StyledImage from '../../../containers/StyledImage';

const banners = [
  {
    id: 1,
    src: mobWebBanner1
  },
  {
    id: 2,
    src: mobWebBanner2
  },
  {
    id: 3,
    src: mobWebBanner3
  },
  {
    id: 4,
    src: mobWebBanner4
  },
  {
    id: 5,
    src: mobWebBanner5
  }
];

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  // beforeChange: () => setDragging(true),
  // afterChange: () => setDragging(false),
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1, slidesToScroll: 1, arrows: false,
      }
    },
    {
      breakpoint: 960,
      settings: { slidesToShow: 2, slidesToScroll: 1 }
    },
    {
      breakpoint: 1280,
      settings: { slidesToShow: 2, slidesToScroll: 1 }
    },
    {
      breakpoint: 1600,
      settings: { slidesToShow: 3, slidesToScroll: 1 }
    },
    {
      breakpoint: 1920,
      settings: { slidesToShow: 3, slidesToScroll: 1 }
    },
    /* {
      breakpoint: 10000,
      settings: 'unslick'
    }, */
  ]
};

function HomeBanners() {
  function openLink(item) {

  }

  return (
    <Box px={2} margin="0 -8px">
      <Slider {...settings}>
        {banners.map(item => (
          <Box key={item.id} width="100%">
            <Box margin="0 8px" onClick={() => window.open('http://pf.kakao.com/_FBNgM', '_blank')}>
              <StyledImage width="100%" src={item.src} />
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default HomeBanners;
