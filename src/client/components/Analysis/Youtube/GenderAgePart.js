import React from 'react';
import { Box, Grid } from '@material-ui/core';
import CategoryPieChart from '../CategoryPieChart';
import BarComponent from '../BarComponent';

const green = 'rgba(24, 219, 168, 1)';
const greenBg = 'rgba(24, 219, 168, 0.2)';
const violet = 'rgba(144, 71, 255, 1)';
const violetBg = 'rgba(144, 71, 255, 0.2)';

const barOptions = {
  scales: {
    xAxes: [
      {
        gridLines: { display: false }
      }
    ],
    yAxes: [
      {
        gridLines: {
          drawBorder: false,
          drawTicks: false
        },
      }
    ]
  }
};

function GenderAgePart(props) {
  const {
    classes, genderDemographic, ageDemographic, process
  } = props || {};

  const subscribersGainedData = {
    labels: ageDemographic.labels,
    datasets: [{
      label: '연령 비울',
      data: ageDemographic.count,
      backgroundColor: greenBg,
      borderColor: green,
      borderWidth: 1,
    }]
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Box p={3} bgcolor="#FFF">
          <Box className={classes.boxTitle}>성별 비율</Box>
          <CategoryPieChart detectData={genderDemographic} process={process} />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box p={3} bgcolor="#FFF">
          <Box className={classes.boxTitle}>연령 비율</Box>
          <BarComponent height={153} data={subscribersGainedData} options={barOptions} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default GenderAgePart;
