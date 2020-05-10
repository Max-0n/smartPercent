require('./style.scss');
import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';
import mainChart from './chart';
const appName = require('../package.json').name;
const form: HTMLFormElement = document.getElementById('form') as HTMLFormElement;

Array.from(document.getElementsByClassName('mdc-text-field')).forEach(mdcTextField => {
  new MDCTextField(mdcTextField);
});
Array.from(document.getElementsByClassName('mdc-button')).forEach(mdcButton => {
  new MDCRipple(mdcButton);
});

console.info(`%cCreated by Max0n: «${appName}»`, 'color: #fff; font-weight: bold; background: #47c; padding:3px 5px;');
mainChart(document.getElementById('mainChart'));

form.onsubmit = (e: Event) => {
  e.preventDefault();
};
