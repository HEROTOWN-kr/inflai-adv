import React from 'react';
import { Box, Grid } from '@material-ui/core';
import SimpleSlider from '../SimpleSlider';

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

function HomeCategory() {
  return (
    <Box padding="100px 0" color="#000">
      <Box textAlign="center" mb={2} fontSize="36px" fontWeight="700">이제는 인플라이</Box>
      <Box marginBottom="50px" textAlign="center" fontSize="16px" fontWeight="300">당신을 기다리고있는 인플루언서들을 만나보세요</Box>
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
    </Box>
  );
}

export default HomeCategory;
