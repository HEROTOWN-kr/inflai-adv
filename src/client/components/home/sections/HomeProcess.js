import React from 'react';
import { Box } from '@material-ui/core';

function HomeProcess() {
  return (
    <Box padding="100px 0" color="#fff" css={{ background: '#97DCE3' }}>
      <Box textAlign="center" mb={2} fontSize="36px" fontWeight="700">간편하게 진행되는 인플라이 프로세스</Box>
      <Box marginBottom="50px" textAlign="center" fontSize="16px" fontWeight="300">인플루언서 메칭부터 실시간 캠페인진행까지, 원스톱으로 인플라이하세요.</Box>
    </Box>
  );
}

export default HomeProcess;
