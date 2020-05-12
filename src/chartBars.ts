import Chart from 'chart.js';

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


const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Green', 'Purple', 'Orange'],
    labels: dataTotal,
    datasets: [
      {
        label: 'Total',
        data: dataTotal,
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
    legend: { display: false },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
