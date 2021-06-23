import React from 'react';
import { Bar } from 'react-chartjs-2';

const defaultOptions = {
  legend: {
    display: false
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function BarComponent(props) {
  const { data, height, options } = props;

  return (
    <Bar height={height || 200} data={data} options={options || defaultOptions} />
  );
}

export default BarComponent;
