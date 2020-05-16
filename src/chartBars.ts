import Chart from 'chart.js';
import axios from './axios';

Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  draw(ease) {
    Chart.controllers.line.prototype.draw.call(this, ease);

    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      const activePoint = this.chart.tooltip._active[0];
      const tmpCtx = this.chart.ctx;
      const x = activePoint.tooltipPosition().x;
      const topY = this.chart.legend.bottom;
      const bottomY = this.chart.chartArea.bottom;

      // draw line
      tmpCtx.save();
      tmpCtx.beginPath();
      tmpCtx.moveTo(x, topY);
      tmpCtx.lineTo(x, bottomY);
      tmpCtx.lineWidth = 1;
      tmpCtx.strokeStyle = 'rgba(54, 162, 235, 1)';
      tmpCtx.stroke();
      tmpCtx.restore();
    }
  }
});

const element = document.getElementById('stats') as HTMLCanvasElement;
const ctx = element.getContext('2d');

const dataTotal: number[] = [];
const dataDebt: number[] = [];
let debt: number = 5000;
let total: number = 0;

for (let day = 1; debt > 0; day++) {
  const percent = Math.round(debt * 0.07 / 365 * 100) / 100;
  total += percent;
  debt += percent;

  dataTotal.push(Math.floor(total * 100) / 100);
  dataDebt.push(Math.floor(debt * 100) / 100);
  if (day % 15 === 0) {
    debt -= 1400;
    // console.info('-1400');
  }

  // console.info(`#${day} – add: ${percent}, debt: ${Math.floor(debt*100)/100}, total: ${Math.floor(total*100)/100}`);
}


axios.get('get-chart', {
    params: {
      interval: '1d',
      region: 'US',
      symbol: 'AAPL',
      lang: 'en',
      // lang: 'ru',
      range: '2y'
    }
  })
  .then(function (response) {
    // handle success
    console.info(response.data.chart.result[0]);
    makeChart(
      response.data.chart.result[0].timestamp,
      response.data.chart.result[0].indicators.quote[0].close
    );
  })
  .catch(function (error) {
    // handle error
    console.info(error);
  });


function makeChart(labels, data) {
  return new Chart(ctx, {
    // type: 'line',
    type: 'LineWithLine',
    data: {
      // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Green', 'Purple', 'Orange'],
      labels,
      datasets: [
        {
          label: 'Total',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.2)',
          //   'rgba(54, 162, 235, 0.2)',
          //   'rgba(255, 206, 86, 0.2)',
          //   'rgba(75, 192, 192, 0.2)',
          //   'rgba(153, 102, 255, 0.2)',
          //   'rgba(255, 159, 64, 0.2)'
          // ],
          borderColor: 'rgba(54, 162, 235, 1)',
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)',
          //   'rgba(255, 159, 64, 1)'
          // ],
          borderWidth: 1
        },
        // {
        //   label: 'Debt',
        //   data: dataDebt,
        //   backgroundColor: 'rgba(75, 192, 192, 0.2)',
        //   borderColor: 'rgba(75, 192, 192, 1)',
        //   borderWidth: 1
        // }
      ]
    },
    options: {
      responsive: true,
      elements: { point: { radius: 0, hoverRadius: 0 }, line: { tension: 0 } },
      legend: { display: false },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          position: 'right',
          gridLines: {
            // lineWidth: 0,
            // zeroLineWidth: 0,
            drawBorder: false,
            // drawTicks: false,
            tickMarkLength: 0,
            // lineWidth: 0,
            // offsetGridLines: true,
            color: 'rgba(54, 162, 235, 0.1)',
            zeroLineColor: 'red'
          },
          ticks: {
            padding: 10,
            lineHeight: 1.1,
            fontColor: 'rgba(54, 162, 235, 1)'
          }
        }]
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title(tooltipItem) {
            // console.log(data);
            return '$' + Math.trunc(+tooltipItem[0].value * 100) / 100;
          },
          label(tooltipItem) {
            return new Date(+tooltipItem.xLabel * 1000).toLocaleDateString();
          }
        }
      },
      hover: {
        mode: 'nearest',
        intersect: true
      }
    }
  });
}
