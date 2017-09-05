function component(){
  var element = document.createElement('div');
  element.innerHTML = '第一个js文件';
  return element;
};
// alert(123)
document.body.appendChild(component());