import React from 'react';
import { Box, Grid } from '@material-ui/core';
import StyledImage from '../../../containers/StyledImage';
import StyledButton from '../../../containers/StyledButton';

const specialityTypes = [
  {
    id: 1,
    imgUrl: 'http://image-2.blueweb.co.kr/~herotowncokr/herotowncokr/index/index_whatwedo_photo.jpg',
    title: '사진촬영',
    text1: '포토그래퍼와 스타일리스트의 협업으로',
    text2: '클라이언트의 마음을 사로잡는 최상의 콘텐츠를 제작합니다.',
    link: 'http://herotown.co.kr/photo-product/'
  },
  {
    id: 2,
    imgUrl: 'http://image-2.blueweb.co.kr/~herotowncokr/herotowncokr/index/index_whatwedo_video.jpg',
    title: '영상제작',
    text1: '사진촬영과 영상작업을 동시에 진행합니다. 촬영팀과 영상팀의',
    text2: '협업으로 빠른 속도와 고품질 퀄리티 서비스를 제공합니다',
    link: 'http://herotown.co.kr/video/'
  },
  {
    id: 3,
    imgUrl: 'http://image-2.blueweb.co.kr/~herotowncokr/herotowncokr/index/index_whatwedo_design.jpg',
    title: '디자인',
    text1: '클라이언트와 밀도있는 소통을 통해 원하는 컨셉을 정확히 파악하여',
    text2: '비즈니스에 필요한 시각적 요소를 최고의 비주얼로 만들어드립니다.',
    link: 'http://herotown.co.kr/detail-page/'
  },
];

function HomeSpeciality() {
  return (
    <Box padding="100px 0" color="#333" css={{ background: '#F6F6F6' }}>
      <Box textAlign="center" mb={2} fontSize="36px" fontWeight="700">콘텐츠는 브랜드의 얼굴</Box>
      <Box textAlign="center" fontSize="16px" fontWeight="300">대가들이사는마을은 비즈니스에 필요한 모든 콘텐츠를 최고의 비주얼로 제작해드립니다.</Box>
      <Box marginBottom="50px" textAlign="center" fontSize="16px" fontWeight="300">각 분야 대가들의 클라이언트와 소통하여 만들어낸 최상의 결과물을 직접 확인해보세요.</Box>
      <Box maxWidth="1500px" px={2} margin="0 auto">
        <Grid container spacing={2}>
          {specialityTypes.map(item => (
            <Grid key={item.id} item xs={4}>
              <StyledImage width="100%" src={item.imgUrl} />
              <Box my={4} fontSize="30px" fontWeight="700">{item.title}</Box>
              <Box fontWeight="400">{item.text1}</Box>
              <Box mt={2} mb={4} fontWeight="400">{item.text2}</Box>
              <Box width="150px">
                <StyledButton onClick={() => window.open(item.link, '_blank')}>View More</StyledButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default HomeSpeciality;
