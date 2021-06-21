import React from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
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
  const { data, height } = props;

  return (
    <Bar height={height || 200} data={data} options={options} />
  );
}

export default BarComponent;
