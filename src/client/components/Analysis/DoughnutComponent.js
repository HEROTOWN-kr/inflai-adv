import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function DoughnutComponent(props) {
  // const { data } = props;

  const data = {
    labels: ['red', 'blue'],
    datasets: [
      {
        label: '# of Votes',
        data: [19, 5],
        backgroundColor: [
          'rgba(0, 212, 181)',
          'rgba(0, 0, 0, 0.2)',
        ]
      },
    ],
  };

  const options = {
    legend: {
      display: false
    },
    responsive: false,
    cutoutPercentage: 65 // толщина полоски
  };

  return (
    <Doughnut width={120} height={120} data={data} options={options} />
  );
}

export default DoughnutComponent;
