<!-- 主属性 -->
## flex-direction 属性
```
flex-direction: 决定项目的排列方向, 有四个选项
  row(默认值): 主轴为水平方向，起点在左端.
  row-reverse: 主轴为水平方向，起点在右端.
  column: 主轴为垂直方向，起点在上沿.
  column-reverse: 主轴为垂直方向，起点在下沿.
```
## justify-content 属性
```
justify-content: 定义项目水平对齐方式,有五个选项
  flex-start(默认值): 左对齐
  flex-end: 右对齐
  center:  居中
  space-between: 两端对齐，项目之间的间隔都相等.
  space-around: 每个项目两侧的间隔相等.所以，项目之间的间隔比项目与边框的间隔大一倍.
```
##  align-items 属性
```
align-items: 定义项目垂直对齐方式,有五个选项
  flex-start: 交叉轴的起点对齐.
  flex-end: 交叉轴的终点对齐.
  center: 交叉轴的中点对齐.
  baseline: 项目的第一行文字的基线对齐.
  stretch(默认值): 如果项目未设置高度或设为auto，将占满整个容器的高度.
```

<!-- 从属性 -->
## flex-grow 属性
```
flex-grow: 默认为0,以实际大小为准, 设置为1,则占据剩余空间, 设置为2,有多个元素时,占据的空间比设置为1的元素多一倍
```
## flex-shrink 属性
```
flex-grow: 默认为1,项目空间不足时,项目将缩小,  设置为0时,该项目不缩小,其他比0大的元素将等比例缩小
```
## flex-basis 属性
```
flex-basis: 分配多余空间前,项目所占据主轴的空间,默认值为 auto, 可设置为跟 width 一样的属性(例如: 20px;)
```
## flex 属性
```
flex属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为0 1 auto.后两个属性可选.
  这个属性有两个快捷值: auto (1 1 auto) 和 none (0 0 auto).
```

