import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { config } from '../configurator/configurator';
import InputList from '../Chart/pieGraph';
ChartJS.register(ArcElement, Tooltip, Legend);

const pieData = config.widgets.filter(x => x.type === 'pie').flat()[0];
const calculatePercentage = (value, total) => ((value / total) * 100).toFixed(2);
const options= {
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const dataArr = ctx.chart.data.datasets[0].data;
        const total = dataArr.reduce((acc, data) => acc + data, 0);
        const percentage = calculatePercentage(value, total);
        return percentage + '%';
      },
      color: 'white', // Customize the label text color
      display: true,
    },
  },
};

const data = {
  labels: pieData.labels,
  datasets: pieData.dataSource,
  options: options,
};

export default function Piechart() {
  return (
    <div className='border my-3'>
      <div className='container'>
        <h4 className='py-3'>{pieData.title}</h4>
        <div class="d-flex justify-content-center">
          <Pie data={data} options={options}   />

        </div>
        <div>

          <InputList props={pieData.dataSource} />
        </div>
      </div>
    </div>
  )

}
