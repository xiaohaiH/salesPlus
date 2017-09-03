import _ from 'lodash';
function component(){
  var element = document.createElement('div');
  
  element.innerHTML = _.join(['第一个', 'js文件'], '');
  return element;
};
document.body.appendChild(component());