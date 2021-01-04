import Slider from 'react-slick';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Box } from '@material-ui/core';
import SlideImage1 from '../../img/slider/beauty.png';
import SlideImage2 from '../../img/slider/fashion.png';
import SlideImage3 from '../../img/slider/food.png';
import Instagram from '../../img/slider/instagram.png';
import Youtube from '../../img/slider/youtube.png';
import Naver from '../../img/slider/naver.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  dots: true,
  responsive: [
    {
      breakpoint: 768,
      settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
    },
    {
      breakpoint: 960,
      settings: { slidesToShow: 2, slidesToScroll: 1, infinite: false }
    },
    /* {
      breakpoint: 1024,
      settings: { slidesToShow: 3, slidesToScroll: 3, infinite: false }
    } */
  ]
  // centerMode: true
};

const influencers = [
  {
    url: SlideImage1,
    name: 'INSTAGRAM',
    type: '푸드',
    socialImage: Instagram,
    tags: '#둘둘치킨 #맛집 #일상'
  },
  {
    url: SlideImage2,
    name: 'YOUTUBE',
    type: '뷰티',
    socialImage: Youtube,
    tags: '#디올 #입생로랑 #수분크림 #립스틱'
  },
  {
    url: SlideImage3,
    name: 'BLOG',
    type: '패션',
    socialImage: Naver,
    tags: '#랄프로렌 #핸드메이드코트 #캐시미어'
  },
  {
    url: SlideImage1,
    name: 'INSTAGRAM',
    type: '푸드',
    socialImage: Instagram,
    tags: '#둘둘치킨 #맛집 #일상'
  },
  {
    url: SlideImage2,
    name: 'YOUTUBE',
    type: '뷰티',
    socialImage: Youtube,
    tags: '#디올 #입생로랑 #수분크림 #립스틱'
  },
  {
    url: SlideImage3,
    name: 'BLOG',
    type: '패션',
    socialImage: Naver,
    tags: '#랄프로렌 #핸드메이드코트 #캐시미어'
  },
];

function SimpleSlider(props) {
  return (
    <Slider {...settings} className="slider-influencer">
      {
          influencers.map(person => (
            <Box p={2} key={person.url} className="card-item">
              <Paper className="paper-item">
                <div className="item-content">
                  <img src={person.url} className="avatar" />
                  <Box my={3} className="social-name">{person.name}</Box>
                  <Box className="social-type">{person.type}</Box>
                  <Box my={3}>
                    <img src={person.socialImage} className="social-image" />
                  </Box>
                  <Box className="social-tags">{person.tags}</Box>
                </div>
              </Paper>
            </Box>
          ))
      }
    </Slider>
  );
}

export default SimpleSlider;
