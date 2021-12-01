import React, { Fragment } from 'react';
import { Box, Grid } from '@material-ui/core';
import { Bar, HorizontalBar } from 'react-chartjs-2';
import MapGraph from '../../campaign/Graphs/MapGraph';
import CategoryPieChart from '../CategoryPieChart';


const options = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

const barData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

function createDataSet(props) {
  const {
    labels, data, backgroundColor, borderColor
  } = props;

  return {
    labels,
    datasets: [
      {
        label: '조회수',
        data,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };
}

function LocationPart(props) {
  const { classes, data, isMD } = props || {};
  const { countryData, countryLineData } = data || {};

  const dataSet = createDataSet(countryLineData);

  return (
    <Grid container spacing={isMD ? 3 : 2}>
      <Grid item xs={12} md={6}>
        <Box p={3} bgcolor="#FFF">
          <Box className={classes.boxTitle}>국가별 동영상 조회수</Box>
          <MapGraph mapData={countryData} />
        </Box>
        <Box p={2} bgcolor="#F2F2F2">
          <Box className={classes.reportText}>
            최근 1년 동안 유튜브 채널의 국가 별로 개별된 모두 영상의 조회수를 보실 수 있습니다.
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} style={{ height: 'inherit' }}>
        <Box p={3} bgcolor="#FFF" height="100%" boxSizing="border-box">
          <HorizontalBar height={isMD ? 150 : 250} data={dataSet} options={options} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default LocationPart;
