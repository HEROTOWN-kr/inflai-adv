import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Colors } from '../../../lib/Сonstants';

function LikeCommentBarGraph(props) {
  const [statistics, setStatistics] = useState({
    likeStats: [],
    commentsStats: []
  });
  const [process, setProcess] = useState(false);
  const { INS_ID } = props;

  async function getStatistics() {
    setProcess(true);
    const InstaData = await axios.get('/api/TB_INSTA/detail', {
      params: { INS_ID }
    });
    const { data } = InstaData.data;
    setStatistics(data);
    setProcess(false);
  }

  useEffect(() => {
    if (INS_ID) {
      getStatistics();
    }
  }, [INS_ID]);

  const data = {
    datasets: [{
      label: '좋아요수',
      type: 'line',
      data: statistics.likeStats,
      fill: false,
      borderColor: Colors.red2,
      backgroundColor: Colors.red2,
      pointBorderColor: Colors.red2,
      pointBackgroundColor: Colors.red2,
      pointHoverBackgroundColor: Colors.red2,
      pointHoverBorderColor: Colors.red2,
      yAxisID: 'y-axis-2'
    }, {
      label: '댓글수',
      type: 'bar',
      data: statistics.commentsStats,
      fill: false,
      backgroundColor: Colors.green2,
      borderColor: Colors.green2,
      hoverBackgroundColor: Colors.green2,
      hoverBorderColor: Colors.green2,
      yAxisID: 'y-axis-1'
    }]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false
          },
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'],
        }
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        }
      ]
    }
  };

  const plugins = [{
    afterDraw: (chartInstance, easing) => {
      const { ctx } = chartInstance.chart;
      // ctx.fillText('This text drawn by a plugin', 100, 100);
    }
  }];

  return (
    <div>
      {
        process ? <CircularProgress /> : (
          <Bar
            height={310}
            data={data}
            options={options}
          />
        )
      }
    </div>
  );
}

export default LikeCommentBarGraph;
