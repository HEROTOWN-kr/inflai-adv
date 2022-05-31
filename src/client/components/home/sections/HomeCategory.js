import React from 'react';
import Slider from 'react-slick';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import SimpleSlider from '../SimpleSlider';
import StyledImage from '../../../containers/StyledImage';
import SlideImage1 from '../../../img/slider/beauty.png';
import SlideImage2 from '../../../img/slider/fashion.png';
import SlideImage3 from '../../../img/slider/food.png';
import SlideImage4 from '../../../img/slider/avatar_1.jpg';
import SlideImage5 from '../../../img/slider/avatar_2.jpg';
import SlideImage6 from '../../../img/slider/avatar_3.jpg';
import SlideImage7 from '../../../img/slider/avatar_4.jpg';
import SlideImage8 from '../../../img/slider/avatar_5.jpg';
import SlideImage9 from '../../../img/slider/avatar_6.jpg';
import SlideImage10 from '../../../img/slider/avatar_7.jpg';
import Instagram from '../../../img/slider/instagram.png';
import Youtube from '../../../img/slider/youtube_social_circle_red.png';
import Naver from '../../../img/slider/naver.png';

const settings = {
  arrows: false,
  infinite: true,
  speed: 30000,
  slidesToShow: 5,
  slidesToScroll: 30,
  autoplay: true,
  autoplaySpeed: 0,
  focusOnSelect: false,
  pauseOnHover: false,
  cssEase: 'linear',
  /* responsive: [
    {
      breakpoint: 600,
      settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false }
    },
    {
      breakpoint: 1280,
      settings: { slidesToShow: 2, slidesToScroll: 1 }
    },
    {
      breakpoint: 1600,
      settings: { slidesToShow: 3, slidesToScroll: 1 }
    }
  ] */
};

const settings2 = {
  arrows: false,
  infinite: true,
  speed: 20000,
  slidesToShow: 5,
  slidesToScroll: 5,
  autoplay: true,
  autoplaySpeed: 0,
  focusOnSelect: false,
  pauseOnHover: false,
  cssEase: 'linear'
  /* responsive: [
    {
      breakpoint: 600,
      settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false }
    },
    {
      breakpoint: 1280,
      settings: { slidesToShow: 2, slidesToScroll: 1 }
    },
    {
      breakpoint: 1600,
      settings: { slidesToShow: 3, slidesToScroll: 1 }
    }
  ] */
};

const categories = [
  {
    id: 1,
    name: '20대 여성',
    likes: '203,567',
    avatar: SlideImage1,
    sns: Instagram,
    hashtags: ['#쇼핑몰', '#웹서비스']
  },
  {
    id: 2,
    name: '30대 여성',
    likes: '211,567',
    avatar: SlideImage2,
    sns: Naver,
    hashtags: ['#생활', '#유아동']
  },
  {
    id: 3,
    name: '20대 여성',
    likes: '663,567',
    avatar: SlideImage3,
    sns: Youtube,
    hashtags: ['#숙박', '#문화']
  },
  {
    id: 4,
    name: '30대 여성',
    likes: '496,567',
    avatar: SlideImage4,
    sns: Instagram,
    hashtags: ['#맛집', '#뷰티']
  },
  {
    id: 5,
    name: '30대 여성',
    likes: '375,567',
    avatar: SlideImage5,
    sns: Youtube,
    hashtags: ['#이벤트', '#교육']
  },
  {
    id: 6,
    name: '30대 여성',
    likes: '582,567',
    avatar: SlideImage6,
    sns: Naver,
    hashtags: ['#주류', '#반려동물']
  },
  {
    id: 7,
    name: '20대 여성',
    likes: '345,567',
    avatar: SlideImage7,
    sns: Instagram,
    hashtags: ['#도서', '#식품']
  },
  {
    id: 8,
    name: '20대 여성',
    likes: '123,567',
    avatar: SlideImage8,
    sns: Youtube,
    hashtags: ['#제품', '#서비스']
  },
  {
    id: 9,
    name: '20대 여성',
    likes: '682,567',
    avatar: SlideImage9,
    sns: Naver,
    hashtags: ['#쇼핑몰', '#웹서비스']
  },
  {
    id: 10,
    name: '30대 여성',
    likes: '856,567',
    avatar: SlideImage10,
    sns: Instagram,
    hashtags: ['#주류', '#반려동물']
  },
];

const categoryTypes = [
  {
    id: 1,
    text: '전체'
  },
  {
    id: 2,
    text: '뷰티/패션'
  },
  {
    id: 3,
    text: 'It/테크'
  },
  {
    id: 4,
    text: '푸드'
  },
];

const useStyles = makeStyles(theme => ({
  imgSlider: {
    position: 'relative',
    '&::before': {
      zIndex: '1',
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0px',
      display: 'block',
      width: '70px',
      height: '100%',
      background:
          'linear-gradient(90deg,rgba(241,245,252,1) 0%, rgba(241,245,252,0) 100%)'
    },
    '&::after': {
      zIndex: '1',
      content: '""',
      position: 'absolute',
      top: '0',
      right: '0px',
      display: 'block',
      width: '70px',
      height: '100%',
      background:
          'linear-gradient(90deg,rgba(241,245,252,0) 0%, rgba(241,245,252,1) 100%)'
    }
  },
  card: {
    position: 'relative',
    width: '230px',
    // height: '295px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    marginBottom: '6px',
    boxShadow: '-2px 5px 10px 0px rgb(127 149 187 / 20%)'
  },
  iconSmall: {
    fontSize: '1rem',
    color: '#EF5160',
    marginRight: '2px'
  }
}));

function HomeCategory() {
  const classes = useStyles();
  return (
    <Box bgcolor="#f1f5fc" py="160px">
      <Box
        mb="80px"
        color="#222"
        textAlign="center"
        fontSize="50px"
        fontWeight="600"
      >
        당신을 기다리고 있는 인플루언서들을 만나보세요
      </Box>
      <Box width={1500} m="0 auto" className={classes.imgSlider}>
        <Box mb={6} height="300px">
          <Slider {...settings}>
            {categories.map(item => (
              <Box key={item.id} width="100%">
                <Box margin="0 24px" css={{ cursor: 'pointer' }}>
                  <Box className={classes.card}>
                    <Box pt="33px" pb="30px" textAlign="center" borderBottom="2px solid #F6F6F6">
                      <StyledImage width="120px" height="120px" src={item.avatar} />
                      <Box mt="11px" mb="2px" fontSize="17px" fontWeight="900">{item.name}</Box>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                      }}
                      >
                        <Favorite classes={{ fontSizeSmall: classes.iconSmall }} fontSize="small" />
                        <span style={{ fontSize: '15px' }}>{item.likes}</span>
                      </div>
                    </Box>
                    <Box py="10px">
                      <Grid container alignItems="center" justify="center" spacing={1}>
                        {item.hashtags.map(tag => (
                          <Grid item key={tag}>
                            <Box py="2px" px="13px" fontSize="13px" color="#8291b3" borderRadius="15px" border="2px solid #d6e0ef">{tag}</Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                    <img style={{ position: 'absolute', top: '14px', right: '14px' }} width="28px" src={item.sns} alt="noFoto" />
                  </Box>
                  {/* <img
                      src="https://www.celebtion.com/Content/images/mai_celeb_img5.png"
                      style={{
                        width: '230px',
                        height: 'auto',
                        borderRadius: '20px',
                        boxShadow: '-2px 5px 10px 0px rgb(127 149 187 / 20%)'
                      }}
                    /> */}
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
        <Box height="300px">
          <Slider {...settings2} rtl>
            {categories.map(item => (
              <Box key={item.id} width="100%">
                <Box margin="0 24px" css={{ cursor: 'pointer' }}>
                  <Box className={classes.card}>
                    <Box pt="33px" pb="30px" textAlign="center" borderBottom="2px solid #F6F6F6">
                      <StyledImage width="120px" height="120px" src={item.avatar} />
                      <Box mt="11px" mb="2px" fontSize="17px" fontWeight="900">{item.name}</Box>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                      }}
                      >
                        <Favorite classes={{ fontSizeSmall: classes.iconSmall }} fontSize="small" />
                        <span style={{ fontSize: '15px' }}>{item.likes}</span>
                      </div>
                    </Box>
                    <Box py="10px">
                      <Grid container alignItems="center" justify="center" spacing={1}>
                        {item.hashtags.map(tag => (
                          <Grid item key={tag}>
                            <Box py="2px" px="13px" fontSize="13px" color="#8291b3" borderRadius="15px" border="2px solid #d6e0ef">{tag}</Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                    <img style={{ position: 'absolute', top: '14px', right: '14px' }} width="28px" src={item.sns} alt="noFoto" />
                  </Box>
                  {/* <img
                      src="https://www.celebtion.com/Content/images/mai_celeb_img5.png"
                      style={{
                        width: '230px',
                        height: 'auto',
                        borderRadius: '20px',
                        boxShadow: '-2px 5px 10px 0px rgb(127 149 187 / 20%)'
                      }}
                    /> */}
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  /* <Box padding="100px 0" color="#000">
      <Box textAlign="center" mb={2} fontSize="36px" fontWeight="700">인플라이와 함께 합니다</Box>
      <Box marginBottom="50px" textAlign="center" fontSize="16px" fontWeight="300">당신을 기다리고 있는 인플루언서들을 만나보세요</Box>
      <Box mt={2} fontSize="16px">
        <Grid container justify="center" spacing={4}>
          {categoryTypes.map(item => (
            <Grid item key={item.id}>
              <Box>{item.text}</Box>
            </Grid>
          ))}
        </Grid>
        <Box maxWidth="1000px" margin="0 auto">
          <SimpleSlider />
        </Box>
      </Box>
    </Box> */
  );
}

export default HomeCategory;
