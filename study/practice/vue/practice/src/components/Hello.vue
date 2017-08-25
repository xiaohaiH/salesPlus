<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <!-- 这个是表单自动提交 start -->
    <!-- <form ref='myForm' action='http://www.baidu.com' method='get'>
      <input type="text">
      <input type="submit" value="123">
    </form> -->
    <!-- 这个是表单自动提交 end -->
    <ul :style='ulStyle.name'>
      <li class="a">1</li>
      <li class="a">2</li>
      <li class="a">3</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      ulStyle: {
        name: ''
      }
    }
  },
  created(){
    this.$nextTick(()=>{
      this.submitForm();
    });
    this.test();
  },
  methods: {
    submitForm(){
      // this.$refs.myForm.submit();
    },

    test(){
      /* 两种方式修改 data 中的值,推荐使用第二种 */
      this.ulStyle.name = 'background:red;';
      this.$set(this.ulStyle,'name','background:violet;');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
.a{
  display: block;
}

a {
  color: #42b983;
}
</style>
