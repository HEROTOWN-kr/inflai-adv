import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@material-ui/core';
import StyledBackDrop from '../../containers/StyledBackDrop';

function Activate() {
  const [activated, setActivated] = useState(false);
  const [savingMode, setSavingMode] = useState(true);

  function toggleSavingMode() {
    setSavingMode(!savingMode);
  }

  const params = useParams();
  const { hash } = params;

  useEffect(() => {
    axios.post('/api/TB_ADVERTISER/activate', { hash }).then((res) => {
      if (res.status === 200) {
        setActivated(true);
        setSavingMode(false);
      }
    }).catch((err) => {
      setSavingMode(false);
      alert(err.response.data.message);
    });
  }, []);

  return (
    <React.Fragment>
      {savingMode ? null : (
        <Box mt="65px" textAlign="center" fontSize="23px">
          {activated
            ? '인증되었습니다! 로그인 해주세요.'
            : '인증에러가 발생되었습니다. 인플라이에 문의해주세요'
            }
        </Box>
      )}
      <StyledBackDrop open={savingMode} handleClose={toggleSavingMode} />
    </React.Fragment>
  );
}

export default Activate;
