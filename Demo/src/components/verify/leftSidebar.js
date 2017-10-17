export const sidebarData = () => {
  const result = {
    code: 'success',
    data: [{
        val: '首页',
        icon: 'area-chart',
        jump: '/home'
      },
      {
        val: '销售',
        icon: 'pie-chart',
        children: [{
            val: '销售一',
            icon: 'bar-chart',
            jump: '/home/sell/:sell'
  
          },
          {
            val: '销售二',
            icon: 'dot-chart',
            jump: '/home/sell/:sell'
          },
          {
            val: '销售三',
            icon: 'bars',
            jump: '/home/sell/:sell'
          },
        ]
      },
      {
        val: '服务支持',
        icon: 'book',
        children: [{
            val: '服务支持一',
            icon: 'edit',
            children: [{
                val: '服务支持一一',
                icon: 'ellipsis',
                jump: '/home/:server/:server'
              },
              {
                val: '服务支持二二',
                icon: 'smile-o',
                jump: '/home/:server/:server'
              },
              {
                val: '服务支持三三',
                icon: 'mobile',
                jump: '/home/:server/:server'
              }
            ]
          },
          {
            val: '服务支持二',
            icon: 'setting',
            jump: '/home/:server'
          },
          {
            val: '服务支持三',
            icon: 'share-alt',
            jump: '/home/:server'
          },
          {
            val: '服务支持四',
            icon: 'shopping-cart',
            jump: '/home/:server'
          }
        ]
      },
      {
        val: '分析',
        icon: 'cloud-download',
        jump: '/home/analyze'
      },
      {
        val: '市场营销',
        icon: 'calendar',
        jump: '/home/market'
      },
      {
        val: '运营',
        icon: 'cloud',
        jump: '/home/operation'
      },
      {
        val: '工具',
        icon: 'code',
        jump: '/home/tool'
      },
      {
        val: 'cutOff',
        icon: 'desktop'
      },
      {
        val: '企业协同',
        icon: 'credit-card',
        jump: '/home/corporate-synergy'
      },
      {
        val: '回收站',
        icon: 'delete',
        jump: '/home/recycle-bin'
      }
    ]
  }; 
  return result
}