//main.js  入口函数
import './styles/index.css';

var dom_hello = require('./hello');
document.getElementById('app').appendChild(dom_hello());
$(function (){
    console.log('jqury',$("#app").css('border',"1px solid red"))
})