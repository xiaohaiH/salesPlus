# fetch 请求后的参数
```
text()：返回字符串
json()：返回一个JSON对象
formData()：返回一个FormData对象
blob()：返回一个blob对象
arrayBuffer()：返回一个二进制数组
例: 
  fetch(url).then(data => data.json()).then(data => showUCode)  将获取的数据变成 json 格式传给后代使用
```
# 设置post 请求和请求体
```
fetch(url,{method: 'POST', header: {'Content-Type': 'application/x-www-form-urlencoded'}, body: 请求体}).then()...
```
# 捕捉错误
```
 fetch(url).then(data => data.json()).then(UCode).catch(func....)
```
# 指定 cookie 同 HTTP 一起发送
```
fetch(url, {credentials: 'include'})
```
# 指定某种机制下发送请求
```
有三个参数: 
  同域请求: same-origin
  默认值: no-cors
  向部署了 cors 机制的服务器跨域请求: cors

例:  fetch(url, {mode: 'cors'})
```
# 禁止浏览器缓存数据
```
fetch(url, {cache: 'reload'})
```