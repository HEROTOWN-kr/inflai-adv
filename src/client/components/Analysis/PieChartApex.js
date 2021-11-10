import React from 'react';
import Chart from 'react-apexcharts';

const defaultOptions = {
  colors: [
    '#A6386A',
    '#C9A64D',
    '#355DA4',
    '#4D5360',
    '#FF912E',
    '#5F9A6C',
    '#9EFFFF',
    '#EE90BB',
    '#1F6FD0',
    '#1F6FD0',
    '#FFC600'
  ],
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  legend: {
    position: 'bottom',
    horizontalAlign: 'center'
  }
};

const defaultSeries = [44, 55, 13, 43, 22];

function PieChartApex(props) {
  const { series, colors, labels } = props;

  const options = { ...defaultOptions, colors, labels };

  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      width="100%"
      height={350}
    />
  );
}

export default PieChartApex;
