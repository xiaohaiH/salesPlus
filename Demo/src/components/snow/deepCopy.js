/* 深度拷贝 start */
export const deepCopy= (obj, ...val) => {
  let copy = obj instanceof Array ? [] : {};
  /* 将多个数组或对象集合到一个对象并返回结果 */
  if(val.length){
    val.map((item, i) => {
      for(let key in item){
        if(item.hasOwnProperty(key)){
          if(item[key] === item)continue;
          copy[key] = item[key] instanceof Object ? deepCopy(item[key]) : item[key]
        }
      }
    });
  };
  /* 这块是深度拷贝 */
  for(let key in obj){
    if(obj[key].hasOwnProperty){
      if(obj[key] === obj) continue;
      copy[key] = obj[key] instanceof Object ? deepCopy(obj[key]) : obj[key]
    }
  }
  return copy
}
/* 深度拷贝 end */