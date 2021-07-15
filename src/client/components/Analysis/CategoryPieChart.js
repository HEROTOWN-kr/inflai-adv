import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';

function CategoryPieChart(props) {
  const [detectData, setDetectData] = useState([]);
  const [process, setProcess] = useState(false);
  const { INS_ID, setMaxStatVal } = props;

  async function getGoogleVisionData(INS_ID) {
    setProcess(true);
    const { host } = window.location;

    const googleData = await axios.get('/api/TB_INSTA/getGoogleDataNew', {
      params: { INS_ID, host }
    });
    const { statistics } = googleData.data;
    setDetectData(statistics);
    if (statistics && statistics[0]) setMaxStatVal(statistics[0].description);
    setProcess(false);
  }

  useEffect(() => {
    if (INS_ID) {
      getGoogleVisionData(INS_ID);
    }
  }, [INS_ID]);


  return (
    <React.Fragment>
      {process ? <CircularProgress /> : (
        <div>
          {detectData && detectData.length ? (
            <Box height="400px">
              <PieChart
                data={detectData}
                animate="true"
                animationDuration="800"
                label={({ dataEntry }) => `${dataEntry.description} : ${dataEntry.value}%`}
                labelStyle={index => ({
                  fill: detectData[index].color,
                  fontSize: '6px',
                  fontFamily: 'sans-serif',
                })}
                radius={35}
                labelPosition={120}
              />
            </Box>
          ) : (
            <Box textAlign="center">
                로딩 중...
            </Box>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default CategoryPieChart;
