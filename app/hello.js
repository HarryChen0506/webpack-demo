//hello.js

import info from './assets/info.json';

module.exports = function (){
    var dom_hello = document.createElement('div');
    dom_hello.textContent = info.text+"再加一行测试,刷新成功了！";   
    return dom_hello;
} 