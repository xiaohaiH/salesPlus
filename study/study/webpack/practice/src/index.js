function component(){
  var element = document.createElement('div');
  element.innerHTML = '第一个js文件';
  return element;
};
document.body.appendChild(component());