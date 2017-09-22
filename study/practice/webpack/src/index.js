
require('./loading.js');

require.ensure(['./ss.js'],function(require){
  require('./a.js')
})