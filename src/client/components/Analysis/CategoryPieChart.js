import React from 'react';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { PieChart } from 'react-minimal-pie-chart';

function CategoryPieChart(props) {
  const { detectData, process } = props;

  return (
    <React.Fragment>
      {process ? (
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <React.Fragment>
          {detectData && detectData.length ? (
            <Box height="350px">
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
            <Grid container alignItems="center" justify="center" style={{ height: '100%' }}>
              <Grid item>
                로딩 중...
              </Grid>
            </Grid>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default CategoryPieChart;
