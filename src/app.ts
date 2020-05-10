require('./style.scss');
import mainChart from './chart';
const appName = require('../package.json').name;

console.info(`%cCreated by Max0n: «${appName}»`, 'color: #fff; font-weight: bold; background: #47c; padding:3px 5px;');
mainChart(document.getElementById('mainChart'));
