require('./style.scss');
import mainChart from './chart';
const appName = require('../package.json').name;
const form: HTMLFormElement = document.getElementById('form') as HTMLFormElement;

console.info(`%cCreated by Max0n: «${appName}»`, 'color: #fff; font-weight: bold; background: #47c; padding:3px 5px;');
mainChart(document.getElementById('mainChart'));

form.onsubmit = (e: Event) => {
  e.preventDefault();
};
