require('./less/main.less');
require('./scss/main.scss');
require('./style/main.css');
const test = ({a = 5,b = 10}={}) => {
  console.log(a,b)
};
test();
class A {
  handle({name = 'xiaohai'}){
    this.name = name;
  }
}
const a = new A();
a.handle({});
console.log(a);

class B extends A{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    alert(123);
  }
};
new B().handleClick();