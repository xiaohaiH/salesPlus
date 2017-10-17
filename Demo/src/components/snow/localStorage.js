/* 设置本地存储 */
export const setLocalStorage = (...state) => {
  if(state.length){
    state.map((item) => {
      if(item.constructor === Array || item.constructor !== Object) return false;
      for(var key in item){
        localStorage.setItem(key,item[key])
      }
    })
  }
}

/* 读取本地存储 */
export const readLocalStorage = val => {
    if(val instanceof Array){
      let key = {};
      val.map(item => {
        key[item] = localStorage.getItem(item)
      });
      return key
    }
    if(typeof val === 'string' || typeof val === 'number'){
      return { [val]: localStorage.getItem(val) }
    }
}

/* 删除本地存储 */
export const deleteLocalStorage = val => {
  if(val instanceof Array){
    val.map(item => {
      localStorage.removeItem(item)
    });
    return 'success'
  };
  if(typeof val === 'string' || typeof val === 'number'){
    localStorage.removeItem(item);
    return 'success'
  }
}