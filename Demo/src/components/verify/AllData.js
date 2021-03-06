/* Header 头部模态框->下拉列表的数据 */
export const HeaderModalSelect = data => {
  if(!data){
    return {
      code: 'success',
      data: [
        {
          val: '请选择模块',
          value: 'none',
          selected: true
        },
        {
          val: '联系人',
          value: 'linkMan',
          selected: false
        },
        {
          val: '客户',
          value: 'client',
          selected: false
        },
        {
          val: '销售机会',
          value: 'market',
          selected: false
        },
        {
          val: '潜在客户',
          value: 'potentialClient',
          selected: false
        },
        {
          val: '文档',
          value: 'doc',
          selected: false
        },
        {
          val: '日程',
          value: 'schedule',
          selected: false
        },
        {
          val: '服务单',
          value: 'serviceTicker',
          selected: false
        },
        {
          val: '产品',
          value: 'product',
          selected: false
        },
        {
          val: '知识库',
          value: 'knowledge',
          selected: false
        },
        {
          val: '价格表',
          value: 'price',
          selected: false
        },
        {
          val: '报价单',
          value: 'quote',
          selected: false
        },
        {
          val: '销售订单',
          value: 'salesOrder',
          selected: false
        },
        {
          val: '发票',
          value: 'bill',
          selected: false
        },
        {
          val: '市场活动',
          value: 'bazaar',
          selected: false
        },
        {
          val: '用户',
          value: 'user',
          selected: false
        },
        {
          val: '服务合同',
          value: 'servicePact',
          selected: false
        },
        {
          val: '服务',
          value: 'service',
          selected: false
        },
        {
          val: '资产',
          value: 'asset',
          selected: false
        },
        {
          val: '评论',
          value: 'comment',
          selected: false
        },
        {
          val: '短信',
          value: 'note',
          selected: false
        },
        {
          val: '查重设置',
          value: 'examineSetting',
          selected: false
        },
        {
          val: '企业协同',
          value: 'enterprise',
          selected: false
        },
        {
          val: '服务请求',
          value: 'serverRequest',
          selected: false
        },
        {
          val: '我的消息中心',
          value: 'information',
          selected: false
        },
        {
          val: '采购订单',
          value: 'purchaseTicket',
          selected: false
        },
        {
          val: '项目任务',
          value: 'projectTask',
          selected: false
        },
        {
          val: '项目',
          value: 'project',
          selected: false
        },
        {
          val: '客户小组',
          value: 'clientGroup',
          selected: false
        },
        {
          val: 'knowledgerecord',
          value: 'knowledgerecord',
          selected: false
        },
        {
          val: '业务机会小组',
          value: 'businessGroup',
          selected: false
        },
        {
          val: '个案小组',
          value: 'individualGroup',
          selected: false
        },
        {
          val: '供应商',
          value: 'supplier',
          selected: false
        },
        {
          val: '项目里程碑',
          value: 'projectMilestone',
          selected: false
        },
      ]
    }
  }
}
/* Header 头部模态框->三级联动->一级(select) */
export const HeaderModalFirstLinkage = selectedVal => {
  const data = {
    linkMan: [
      {
        "key": "Select-field",
        "value": "选择字段"
      }, {
        "key": "sales-opportunity-name",
        "value": "销售机会名称",
        "type": 'V'
      }, {
        "key": "is-expected-to-close-date",
        "value": "预计关闭日期",
        "type": 'V'
      }, {
        "key": "customer-name",
        "value": "客户名称",
        "type": 'V'
      }, {
        "key": "customer-type",
        "value": "客户类型",
        "type": 'V'
      }, {
        "key": "business-number",
        "value": "商机编号",
        "type": 'V'
      }, {
        "key": "company-name",
        "value": "公司名称",
        "type": 'V'
      }, {
        "key": "amount",
        "value": "金额",
        "type": 'V'
      }, {
        "key": "next-step",
        "value": "下一步",
        "type": 'V'
      }, {
        "key": "source",
        "value": "线索来源",
        "type": 'V'
      }, {
        "key": "sales-stage",
        "value": "销售阶段",
        "type": 'V'
      }, {
        "key": "head",
        "value": "负责人",
        "type": 'V'
      }, {
        "key": "likely",
        "value": "可能性",
        "type": 'V'
      }, {
        "key": "source-of-marketing-activities",
        "value": "营销活动来源",
        "type": 'V'
      }, {
        "key": "creation-time",
        "value": "创建时间",
        "type": 'T'
      }, {
        "key": "modified-time",
        "value": "修改时间",
        "type": 'T'
      }, {
        "key": "the-final-revision",
        "value": "最后修订者",
        "type": 'V'
      }, {
        "key": "whether-by-potential-customers-conversion",
        "value": "是否由潜在客户转换而来",
        "type": 'V'
      }, {
        "key": "predicted-amount",
        "value": "预测金额",
        "type": 'V'
      }, {
        "key": "founder",
        "value": "创建人",
        "type": 'V'
      }, {
        "key": "contact-name",
        "value": "联系人姓名",
        "type": 'V'
      }, {
        "key": "Test02",
        "value": "Test02",
        "type": 'DT'
      }, {
        "key": "Test-IMG",
        "value": "Test-IMG",
        "type": 'DT'
      }, {
        "key": "number-of-Test",
        "value": "测试自动编号",
        "type": 'DT'
      }, {
        "key": "Test3",
        "value": "Test3",
        "type": 'DT'
      }, {
        "key": "Test1",
        "value": "测试编号1",
        "type": 'DT'
      }, {
        "key": "Test",
        "value": "测试的",
        "type": 'DT'
      }, {
        "key": "X3444",
        "value": "X3444",
        "type": 'DT'
      }, {
        "key": "Test-field",
        "value": "测试字段",
        "type": 'DT'
      }, {
        "key": "text-list-Test",
        "value": "文本列表测试",
        "type": 'DT'
      }, {
        "key": "Test-to-find-the",
        "value": "测试查找",
        "type": 'DT'
      }, {
        "key": "sales-image",
        "value": "销售图片",
        "type": 'DT'
      }, {
        "key": "testgavin",
        "value": "testgavin",
        "type": 'DT'
      }, {
        "key": "currency-fields",
        "value": "货币字段",
        "type": 'DT'
      }, {
        "key": "lookup-fields",
        "value": "查找字段",
        "type": 'DT'
      }, {
        "key": "time-Test",
        "value": "时间测试",
        "type": 'DT'
      }, {
        "key": "email",
        "value": "电子邮件",
        "type": 'DT'
      }, {
        "key": "time",
        "value": "时间",
        "type": 'DT'
      }, {
        "key": "region",
        "value": "地区",
        "type": 'DT'
      }, {
        "key": "predicted-class",
        "value": "预测类别",
        "type": 'DT'
      }, {
        "key": "whether-to-close",
        "value": "是否关闭",
        "type": 'DT'
      }, {
        "key": "drop-down-box-Test",
        "value": "下拉框测试",
        "type": 'DT'
      }, {
        "key": "multiple-combination-values",
        "value": "多选组合取值",
        "type": 'V'
      }, {
        "key": "record-type",
        "value": "记录类型",
        "type": 'V'
      }, {
        "key": "the-current-approver",
        "value": "当前审批人",
        "type": 'V'
      }, {
        "key": "description",
        "value": "描述",
        "type": 'V'
      }
    ],
    client: [
      {
        "key": "select-field",
        "value": "选择字段"
      }, {
        "key": "customer-name",
        "value": "客户名称",
        "type": 'V'
      }, {
        "key": "customer-number",
        "value": "客户编号",
        "type": 'V'
      }, {
        "key": "site",
        "value": "网站",
        "type": 'V'
      }, {
        "key": "commonly-used-the-phone",
        "value": "常用电话",
        "type": 'V'
      }, {
        "key": "stock-code",
        "value": "股票代码",
        "type": 'V'
      }, {
        "key": "fax",
        "value": "传真",
        "type": 'V'
      }, {
        "key": "parent-company",
        "value": "母公司",
        "type": 'V'
      }, {
        "key": "phone",
        "value": "备用电话",
        "type": 'V'
      }, {
        "key": "employee-number",
        "value": "雇员数量",
        "type": 'V'
      }, {
        "key": "Commonly-used-Email",
        "value": "常用邮箱",
        "type": 'V'
      }, {
        "key": "owner",
        "value": "备用邮箱",
        "type": 'V'
      }, {
        "key": "industry",
        "value": "所有者",
        "type": 'V'
      }, {
        "key": "evaluate",
        "value": "行业",
        "type": 'V'
      }, {
        "key": "type",
        "value": "评价",
        "type": 'V'
      }, {
        "key": "standard-industrial",
        "value": "类型",
        "type": 'V'
      }, {
        "key": "classification-code",
        "value": "标准产业分类代码",
        "type": 'V'
      }, {
        "key": "annual-revenue",
        "value": "年度营收",
        "type": 'V'
      }, {
        "key": "head",
        "value": "负责人",
        "type": 'V'
      }, {
        "key": "remind-head",
        "value": "提醒负责人",
        "type": 'V'
      }, {
        "key": "modified-time",
        "value": "修改时间",
        "type": 'DT'
      }, {
        "key": "creation-time",
        "value": "创建时间",
        "type": 'DT'
      }, {
        "key": "the-final-revision",
        "value": "最后修订者",
        "type": 'V'
      }, {
        "key": "whether-by-potential-customers-conversion",
        "value": "是否由潜在客户转换而来",
        "type": 'V'
      }, {
        "key": "founder",
        "value": "创建人",
        "type": 'V'
      }, {
        "key": "integer-test-field",
        "value": "整数测试字段",
        "type": 'V'
      }, {
        "key": "customer-photo",
        "value": "客户照片",
        "type": 'V'
      }, {
        "key": "list",
        "value": "列表",
        "type": 'V'
      }, {
        "key": "test-text",
        "value": "测试文本",
        "type": 'V'
      }, {
        "key": "test",
        "value": "测试自动编号",
        "type": 'V'
      }, {
        "key": "assets",
        "value": "资产",
        "type": 'V'
      }, {
        "key": "city/county",
        "value": "市/县区",
        "type": 'V'
      }, {
        "key": "level-of-industry",
        "value": "一级行业",
        "type": 'V'
      }, {
        "key": "secondary-industry",
        "value": "二级行业",
        "type": 'V'
      }, {
        "key": "test-drop-down-list",
        "value": "测试下拉单",
        "type": 'V'
      }, {
        "key": "contact-time",
        "value": "联系时间",
        "type": 'T'
      }, {
        "key": "the-customer-time",
        "value": "客户时间",
        "type": 'DT'
      }, {
        "key": "picture-fields",
        "value": "图片字段",
        "type": 'V'
      }, {
        "key": "image-field",
        "value": "图片字段",
        "type": 'V'
      }, {
        "key": "test-image",
        "value": "测试图片",
        "type": 'V'
      }, {
        "key": "is-set-to-head",
        "value": "是否设为负责人",
        "type": 'V'
      }, {
        "key": "check",
        "value": "复选",
        "type": 'V'
      }, {
        "key": "record-type",
        "value": "记录类型",
        "type": 'V'
      }, {
        "key": "the-current-approver",
        "value": "当前审批人",
        "type": 'V'
      }, {
        "key": "shipping-address",
        "value": "收货地址",
        "type": 'V'
      }, {
        "key": "post-office-box",
        "value": "邮政信箱",
        "type": 'V'
      }, {
        "key": "zip-code",
        "value": "邮政编码",
        "type": 'V'
      }, {
        "key": "national",
        "value": "国家",
        "type": 'V'
      }, {
        "key": "description",
        "value": "描述",
        "type": 'V'
      }
    ],
    market: [
      {
        "key": "select-field",
        "value": "选择字段"
      }, {
        "key": "market-name",
        "value": "销售名称",
        "type": 'V'
      }, {
        "key": "market-number",
        "value": "销售编号",
        "type": 'V'
      }, {
        "key": "site",
        "value": "网站",
        "type": 'V'
      }, {
        "key": "commonly-used-the-phone",
        "value": "常用电话",
        "type": 'V'
      }, {
        "key": "stock-code",
        "value": "股票代码",
        "type": 'V'
      }, {
        "key": "fax",
        "value": "传真",
        "type": 'V'
      }, {
        "key": "parent-company",
        "value": "母公司",
        "type": 'V'
      }, {
        "key": "phone",
        "value": "备用电话",
        "type": 'V'
      }, {
        "key": "employee-number",
        "value": "雇员数量",
        "type": 'V'
      }, {
        "key": "Commonly-used-Email",
        "value": "常用邮箱",
        "type": 'V'
      }, {
        "key": "owner",
        "value": "备用邮箱",
        "type": 'V'
      }, {
        "key": "industry",
        "value": "所有者",
        "type": 'V'
      }, {
        "key": "evaluate",
        "value": "行业",
        "type": 'V'
      }, {
        "key": "type",
        "value": "评价",
        "type": 'V'
      }, {
        "key": "standard-industrial",
        "value": "类型",
        "type": 'V'
      }, {
        "key": "classification-code",
        "value": "标准产业分类代码",
        "type": 'V'
      }, {
        "key": "annual-revenue",
        "value": "年度营收",
        "type": 'V'
      }, {
        "key": "head",
        "value": "负责人",
        "type": 'V'
      }, {
        "key": "remind-head",
        "value": "提醒负责人",
        "type": 'V'
      }, {
        "key": "modified-time",
        "value": "修改时间",
        "type": 'DT'
      }, {
        "key": "creation-time",
        "value": "创建时间",
        "type": 'DT'
      }, {
        "key": "the-final-revision",
        "value": "最后修订者",
        "type": 'V'
      }, {
        "key": "whether-by-potential-customers-conversion",
        "value": "是否由潜在客户转换而来",
        "type": 'V'
      }, {
        "key": "founder",
        "value": "创建人",
        "type": 'V'
      }, {
        "key": "integer-test-field",
        "value": "整数测试字段",
        "type": 'V'
      }, {
        "key": "customer-photo",
        "value": "客户照片",
        "type": 'V'
      }, {
        "key": "list",
        "value": "列表",
        "type": 'V'
      }, {
        "key": "test-text",
        "value": "测试文本",
        "type": 'V'
      }, {
        "key": "test",
        "value": "测试自动编号",
        "type": 'V'
      }, {
        "key": "assets",
        "value": "资产",
        "type": 'V'
      }, {
        "key": "city/county",
        "value": "市/县区",
        "type": 'V'
      }, {
        "key": "level-of-industry",
        "value": "一级行业",
        "type": 'V'
      }, {
        "key": "secondary-industry",
        "value": "二级行业",
        "type": 'V'
      }, {
        "key": "test-drop-down-list",
        "value": "测试下拉单",
        "type": 'V'
      }, {
        "key": "contact-time",
        "value": "联系时间",
        "type": 'T'
      }, {
        "key": "the-customer-time",
        "value": "客户时间",
        "type": 'DT'
      }, {
        "key": "picture-fields",
        "value": "图片字段",
        "type": 'V'
      }, {
        "key": "image-field",
        "value": "图片字段",
        "type": 'V'
      }, {
        "key": "test-image",
        "value": "测试图片",
        "type": 'V'
      }, {
        "key": "is-set-to-head",
        "value": "是否设为负责人",
        "type": 'V'
      }, {
        "key": "check",
        "value": "复选",
        "type": 'V'
      }, {
        "key": "record-type",
        "value": "记录类型",
        "type": 'V'
      }, {
        "key": "the-current-approver",
        "value": "当前审批人",
        "type": 'V'
      }, {
        "key": "shipping-address",
        "value": "收货地址",
        "type": 'V'
      }, {
        "key": "post-office-box",
        "value": "邮政信箱",
        "type": 'V'
      }, {
        "key": "zip-code",
        "value": "邮政编码",
        "type": 'V'
      }, {
        "key": "national",
        "value": "国家",
        "type": 'V'
      }, {
        "key": "description",
        "value": "描述",
        "type": 'V'
      }
    ],
    potentialClient: [
      {
        "key": "select-field ",
        "value": "选择字段"
      }, {
        "key": "appellation",
        "value": "称谓",
        "type": 'V'
      }, {
        "key": "number",
        "value": "编号",
        "type": 'V'
      }, {
        "key": "name",
        "value": "姓",
        "type": 'V'
      }, {
        "key": "commonly-used-the-phone",
        "value": "常用电话",
        "type": 'V'
      }, {
        "key": "company",
        "value": "公司",
        "type": 'V'
      }, {
        "key": "mobile-phone",
        "value": "手机",
        "type": 'V'
      }, {
        "key": "job-title",
        "value": "职称",
        "type": 'V'
      }, {
        "key": "fax",
        "value": "传真",
        "type": 'V'
      }, {
        "key": "clues-source",
        "value": "线索来源",
        "type": 'V'
      }, {
        "key": "common-Email",
        "value": "常用 Email",
        "type": 'V'
      }, {
        "key": "industry",
        "value": "行业",
        "type": 'V'
      }, {
        "key": "site",
        "value": "网站",
        "type": 'V'
      }, {
        "key": "annual-revenue",
        "value": "年度营收",
        "type": 'V'
      }, {
        "key": "clues-to-state",
        "value": "线索状态",
        "type": 'V'
      }, {
        "key": "employee-number",
        "value": "雇员数量",
        "type": 'V'
      }, {
        "key": "evaluate",
        "value": "评价",
        "type": 'V'
      }, {
        "key": "alternate-Email",
        "value": "备用 Email",
        "type": 'V'
      }, {
        "key": "head",
        "value": "负责人",
        "type": 'V'
      }, {
        "key": "modified-time",
        "value": "修改时间",
        "type": 'T'
      }, {
        "key": "creation-time",
        "value": "创建时间",
        "type": 'T'
      }, {
        "key": "the-final-revision",
        "value": "最后修订者",
        "type": 'T'
      }, {
        "key": "refused-to-Email-harassment",
        "value": "拒绝 Email 骚扰",
        "type": 'V'
      }, {
        "key": "founder",
        "value": "创建人",
        "type": 'V'
      }, {
        "key": "is-set-to-head",
        "value": "是否设为负责人",
        "type": 'V'
      }, {
        "key": "street",
        "value": "街道",
        "type": 'V'
      }, {
        "key": "post-office-box",
        "value": "邮政信箱",
        "type": 'V'
      }, {
        "key": "zip-code",
        "value": "邮政编码",
        "type": 'V'
      }, {
        "key": "city",
        "value": "城市",
        "type": 'V'
      }, {
        "key": "national",
        "value": "国家",
        "type": 'V'
      }, {
        "key": "provincial/state",
        "value": "省/州",
        "type": 'V'
      }, {
        "key": "description",
        "value": "描述",
        "type": 'V'
      }
    ],
    doc: [
      {
        "key": "select-field ",
        "value": "选择字段"
      }, {
        "key": "title",
        "value": "标题",
        "type": "V"
      }, {
        "key": "folder",
        "value": "文件夹",
        "type": "V"
      }, {
        "key": "document-number",
        "value": "文档编号",
        "type": "V"
      }, {
        "key": "head",
        "value": "负责人",
        "type": "V"
      }, {
        "key": "creation-time",
        "value": "创建时间",
        "type": "DT"
      }, {
        "key": "modified-time",
        "value": "修改时间",
        "type": "D"
      }, {
        "key": "last-modified",
        "value": "最后修改",
        "type": "V"
      }, {
        "key": "introduction",
        "value": "简介",
        "type": "V"
      }, {
        "key": "download-type",
        "value": "下载类型",
        "type": "V"
      }, {
        "key": "enable",
        "value": "启用",
        "type": "T"
      }, {
        "key": "name",
        "value": "文件名",
        "type": "V"
      }, {
        "key": "file-size",
        "value": "文件大小",
        "type": "DT"
      }, {
        "key": "file-type",
        "value": "文件类型",
        "type": "V"
      }, {
        "key": "version",
        "value": "版本",
        "type": "V"
      }, {
        "key": "downloaded",
        "value": "下载次数",
        "type": "V"
      }
    ],
    schedule: [
      {
        "key": "select-field",
        "value": "选择字段"
      }, {
        "key": "subject",
        "value": "主题",
        "type": "V"
      }, {
        "key": "Send-Reminder",
        "value": "发送提醒",
        "type": "V"
      }, {
        "key": "head",
        "value": "负责人",
        "type": "V"
      }, {
        "key": "Start-date-and-Time",
        "value": "开始日期和时间",
        "type": "DT"
      }, {
        "key": "Time-Start",
        "value": "开始时间",
        "type": "T"
      }, {
        "key": "End-Time",
        "value": "结束时间",
        "type": "T"
      }, {
        "key": "due-date",
        "value": "截止日期",
        "type": "D"
      }, {
        "key": "Recurrence",
        "value": "Recurrence",
        "type": "D"
      }, {
        "key": "associated-with",
        "value": "关联于",
        "type": "D"
      }, {
        "key": "contact",
        "value": "联系人",
        "type": "V"
      }, {
        "key": "state",
        "value": "状态",
        "type": "V"
      }, {
        "key": "priority",
        "value": "优先级",
        "type": "V"
      }, {
        "key": "Send-notification",
        "value": "发送通知",
        "type": "D"
      }, {
        "key": "creation-Time",
        "value": "创建时间",
        "type": "T"
      }, {
        "key": "modified-Time",
        "value": "修改时间",
        "type": "T"
      }, {
        "key": "type",
        "value": "类型",
        "type": "V"
      }, {
        "key": "Visibility",
        "value": "展示",
        "type": "V"
      }, {
        "key": "Duration",
        "value": "持续时间",
        "type": "DT"
      }, {
        "key": "Duration-Minutes",
        "value": "持续分钟",
        "type": "DT"
      }, {
        "key": "location",
        "value": "地点",
        "type": "V"
      }, {
        "key": "No-Time",
        "value": "No Time",
        "type": "T"
      }, {
        "key": "the-final-revision",
        "value": "最后修订者",
        "type": "V"
      }, {
        "key": "founder",
        "value": "创建人",
        "type": "V"
      }, {
        "key": "description",
        "value": "描述",
        "type": "V"
      }
    ],
    serviceTicker: [
      {
        "key": "select-field ",
        "value": "选择字段"
      }, {
        "key": "title",
        "value": "标题",
        "type": "V"
      }, {
        "key": "customer-name",
        "value": "客户名称",
        "type": "V"
      }, {
        "key": "head",
        "value": "负责人",
        "type": "V"
      }, {
        "key": "product-name",
        "value": "产品名称",
        "type": "V"
      }, {
        "key": "priority",
        "value": "优先级",
        "type": "V"
      }, {
        "key": "state",
        "value": "状态",
        "type": "V"
      }, {
        "key": "severity",
        "value": "严重程度",
        "type": "V"
      }, {
        "key": "hour",
        "value": "小时",
        "type": "V"
      }, {
        "key": "creation-time",
        "value": "创建时间",
        "type": "T"
      }, {
        "key": "category",
        "value": "类别",
        "type": "V"
      }, {
        "key": "day",
        "value": "天",
        "type": "V"
      }, {
        "key": "update-record",
        "value": "更新历史记录",
        "type": "V"
      }, {
        "key": "modified-time",
        "value": "修改时间",
        "type": "T"
      }, {
        "key": "number",
        "value": "编号",
        "type": "V"
      }, {
        "key": "the-final-revision",
        "value": "最后修订者",
        "type": "V"
      }, {
        "key": "contact-name",
        "value": "联系人姓名",
        "type": "V"
      }, {
        "key": "from-the-customer-portal",
        "value": "来源于客户门户",
        "type": "V"
      }, {
        "key": "founder",
        "value": "创建人",
        "type": "DT"
      }, {
        "key": "test",
        "value": "测试下拉",
        "type": "V"
      }, {
        "key": "subject",
        "value": "主题",
        "type": "V"
      }, {
        "key": "email address",
        "value": "邮件地址",
        "type": "V"
      }, {
        "key": "image-field",
        "value": "图片字段",
        "type": "V"
      }, {
        "key": "the-current-approver",
        "value": "当前审批人",
        "type": "V"
      }, {
        "key": "description",
        "value": "描述",
        "type": "V"
      }, {
        "key": "solution",
        "value": "解决方案",
        "type": "DT"
      }
    ],
    product: [
      {
        "key": "select-field ",
        "value": "选择字段"
      }, {
        "key": "product-name",
        "value": "产品名称",
        "type": "V"
      }, {
        "key": "product-number",
        "value": "产品编号",
        "type": "V"
      }, {
        "key": "effective-product",
        "value": "产品有效",
        "type": "V"
      }, {
        "key": "product-model",
        "value": "产品型号",
        "type": "V"
      }, {
        "key": "sales-start-date",
        "value": "销售开始日期",
        "type": "T"
      }, {
        "key": "manufacturer",
        "value": "生产厂商",
        "type": "V"
      }, {
        "key": "product-category",
        "value": "产品类别",
        "type": "V"
      }, {
        "key": "support-start-date",
        "value": "支持开始日期",
        "type": "V"
      }, {
        "key": "sales-end-date",
        "value": "销售结束日期",
        "type": "T"
      }, {
        "key": "support-due-date",
        "value": "支持到期日",
        "type": "T"
      }, {
        "key": "supplier-name",
        "value": "供应商名称",
        "type": "V"
      }, {
        "key": "site",
        "value": "网站",
        "type": "V"
      }, {
        "key": "supplier-part-number",
        "value": "供应商部件编号",
        "type": "V"
      }, {
        "key": "manufacturers-part-number",
        "value": "生产商部件编号",
        "type": "V"
      }, {
        "key": "product description",
        "value": "产品说明",
        "type": "V"
      }, {
        "key": "serial-number",
        "value": "序列号",
        "type": "V"
      }, {
        "key": "creation-time",
        "value": "创建时间",
        "type": "T"
      }, {
        "key": "accounts",
        "value": "会计科目",
        "type": "V"
      }, {
        "key": "modified-time",
        "value": "修改时间",
        "type": "T"
      }, {
        "key": "the-final-revision",
        "value": "最后修订者",
        "type": "V"
      }, {
        "key": "hi",
        "value": "呵呵",
        "type": "V"
      }, {
        "key": "price",
        "value": "单价",
        "type": "V"
      }, {
        "key": "commission-rate",
        "value": "佣金率",
        "type": "V"
      }, {
        "key": "tax-category",
        "value": "税务类别",
        "type": "V"
      }, {
        "key": "unit",
        "value": "单位",
        "type": "V"
      }, {
        "key": "quantity/unit",
        "value": "数量/单位",
        "type": "V"
      }, {
        "key": "inventory",
        "value": "库存数量",
        "type": "V"
      }, {
        "key": "reorder-level",
        "value": "再订购水平",
        "type": "V"
      }, {
        "key": "head",
        "value": "负责人",
        "type": "V"
      }, {
        "key": "quantity-demanded",
        "value": "需求数量",
        "type": "V"
      }, {
        "key": "product-image",
        "value": "产品图片",
        "type": "V"
      }, {
        "key": "description",
        "value": "描述",
        "type": "V"
      }
    ],
    knowledge: [
      {
        "key": "select-field",
        "value": "选择字段"
      }, {
        "key": "product",
        "value": "产品",
        "type": "V"
      }, {
        "key": "number",
        "value": "编号",
        "type": "V"
      }, {
        "key": "head",
        "value": "负责人",
        "type": "DT"
      }, {
        "key": "state",
        "value": "状态",
        "type": "V"
      }, {
        "key": "category",
        "value": "类别",
        "type": "V"
      }, {
        "key": "creation-time",
        "value": "创建时间",
        "type": "T"
      }, {
        "key": "modified-time",
        "value": "修改时间",
        "type": "T"
      }, {
        "key": "question",
        "value": "问题",
        "type": "V"
      }, {
        "key": "the-final-revision",
        "value": "最后修订者",
        "type": "V"
      }, {
        "key": "the-answer",
        "value": "答案",
        "type": "V"
      }, {
        "key": "scenarios",
        "value": "应用场景",
        "type": "V"
      }, {
        "key": "problem-description",
        "value": "问题描述",
        "type": "V"
      }, {
        "key": "detailed-answer",
        "value": "详细回答",
        "type": "V"
      }, {
        "key": "approval status",
        "value": "审批状态",
        "type": "V"
      }, {
        "key": "key-words",
        "value": "关键字",
        "type": "V"
      }, {
        "key": "content",
        "value": "内容",
        "type": "V"
      }, {
        "key": "title",
        "value": "标题",
        "type": "V"
      }, {
        "key": "classification",
        "value": "分类",
        "type": "V"
      }
    ],
    price: [
      {
        "key": "select-field",
        "value": "选择字段"
      }, {
        "key": "price-list-name",
        "value": "价格表名称",
        "type": "V"
      }, {
        "key": "enable",
        "value": "启用",
        "type": "V"
      }, {
        "key": "price-list-number",
        "value": "价格表编号",
        "type": "V"
      }, {
        "key": "creation-time",
        "value": "创建时间",
        "type": "T"
      }, {
        "key": "modified-time",
        "value": "修改时间",
        "type": "DT"
      }, {
        "key": "currency",
        "value": "货币",
        "type": "V"
      }, {
        "key": "the-final-revision",
        "value": "最后修订者",
        "type": "V"
      }, {
        "key": "description",
        "value": "描述",
        "type": "V"
      }
    ],
    quote: [
      {
        "key": "select-field",
        "value": "选择字段"
      }, {
        "key": "title",
        "value": "标题",
        "type": "V"
      }, {
        "key": "sales-opportunity-name",
        "value": "销售机会名称",
        "type": "V"
      }, {
        "key": "the-quotation-number",
        "value": "报价单编号",
        "type": "V"
      }, {
        "key": "offer-stage",
        "value": "报价阶段",
        "type": "V"
      }, {
        "key": "valid-to",
        "value": "有效期至",
        "type": "V"
      }, {
        "key": "contact",
        "value": "联系人",
        "type": "V"
      }, {
        "key": "carrier",
        "value": "承运人",
        "type": "V"
      }, {
        "key": "small-project",
        "value": "小计",
        "type": "V"
      }, {
        "key": "technology",
        "value": "科技",
        "type": "V"
      }, {
        "key": "inventory-management",
        "value": "库存管理",
        "type": "V"
      }, {
        "key": "total",
        "value": "总计",
        "type": "V"
      }, {
        "key": "tax-type",
        "value": "税务类型",
        "type": "V"
      }, {
        "key": "discount-rate",
        "value": "折扣金额",
        "type": "V"
      }, {
        "key": "the-amount",
        "value": "运费和物流附加费",
        "type": "V"
      }, {
        "key": "freight-and-logistics-surcharge",
        "value": "公司名称",
        "type": "V"
      }, {
        "key": "company-name",
        "value": "负责人",
        "type": "V"
      }, {
        "key": "head",
        "value": "创建时间",
        "type": "T"
      }, {
        "key": "creation-time",
        "value": "修改时间",
        "type": "T"
      }, {
        "key": "modified-time",
        "value": "调整",
        "type": "V"
      }, {
        "key": "adjust",
        "value": "货币",
        "type": "V"
      }, {
        "key": "currency",
        "value": "转换率",
        "type": "V"
      }, {
        "key": "conversion",
        "value": "最后修订者",
        "type": "V"
      }, {
        "key": "the-final-revision",
        "value": "税前合计",
        "type": "V"
      }, {
        "key": "total-pre-tax",
        "value": "账单地址",
        "type": "V"
      }, {
        "key": "billing-address",
        "value": "收货地址",
        "type": "V"
      }, {
        "key": "shipping-address",
        "value": "邮政信箱",
        "type": "V"
      }, {
        "key": "post-office-box",
        "value": "市/县",
        "type": "V"
      }, {
        "key": "city/county",
        "value": "省/州",
        "type": "V"
      }, {
        "key": "provincial/state",
        "value": "邮政编码",
        "type": "V"
      }, {
        "key": "zip-code",
        "value": "国家",
        "type": "V"
      }, {
        "key": "national",
        "value": "条款及细则",
        "type": "V"
      }, {
        "key": "terms-and-conditions",
        "value": "条目名称",
        "type": "V"
      }, {
        "key": "item-name",
        "value": "数量",
        "type": "V"
      }, {
        "key": "number",
        "value": "标价",
        "type": "V"
      }, {
        "key": "price",
        "value": "物料注释",
        "type": "V"
      }, {
        "key": "material notes",
        "value": "折扣",
        "type": "V"
      }, {
        "key": "discount",
        "value": "折扣率项",
        "type": "V"
      }, {
        "key": "tax",
        "value": "税",
        "type": "V"
      }, {
        "key": "freight-percentage",
        "value": "运费百分比",
        "type": "V"
      }, {
        "key": "vat1",
        "value": "vat1",
        "type": "V"
      }, {
        "key": "description",
        "value": "描述",
        "type": "V"
      }
    ],
    bazaar: [
      {
        "key": "select-field",
        "value": "选择字段"
      }, {
        "key": "marketing-activities ",
        "value": "市场活动名称",
        "type": "V"
      }, {
        "key": "numbering",
        "value": "编号",
        "type": "V"
      }, {
        "key": "responsible-person",
        "value": "负责人223",
        "type": "V"
      }, {
        "key": "state",
        "value": "状态",
        "type": "V"
      }, {
        "key": "type",
        "value": "类型",
        "type": "V"
      }, {
        "key": "product",
        "value": "产品",
        "type": "V"
      }, {
        "key": "target-audience",
        "value": "目标受众",
        "type": "V"
      }, {
        "key": "is-expected-to-close-date",
        "value": "预计关闭日期",
        "type": "D"
      }, {
        "key": "the-host",
        "value": "主办方",
        "type": "V"
      }, {
        "key": "scale",
        "value": "规模",
        "type": "V"
      }, {
        "key": "creation-time",
        "value": "创建时间",
        "type": "T"
      }, {
        "key": "the-number-has-been-sent",
        "value": "已发送数量",
        "type": "V"
      }, {
        "key": "modified-time",
        "value": "修改时间",
        "type": "T"
      }, {
        "key": "the-final-revision",
        "value": "最后修订者",
        "type": "V"
      }, {
        "key": "implementation",
        "value": "执行方案",
        "type": "V"
      }, {
        "key": "budget-cost",
        "value": "预算成本",
        "type": "V"
      }, {
        "key": "actual-cost",
        "value": "实际成本",
        "type": "V"
      }, {
        "key": "the-expected-response",
        "value": "预期响应",
        "type": "V"
      }, {
        "key": "earnings",
        "value": "预期收益",
        "type": "V"
      }, {
        "key": "number-of-expected-sales",
        "value": "预期销售数量",
        "type": "V"
      }, {
        "key": "actual-sales-quantity",
        "value": "实际销售数量",
        "type": "V"
      }, {
        "key": "number-of-expected-response",
        "value": "预期响应数量",
        "type": "V"
      }, {
        "key": "number-of-actual-response",
        "value": "实际响应数量",
        "type": "V"
      }, {
        "key": "expected-return-on-investment",
        "value": "预期投资回报率",
        "type": "V"
      }, {
        "key": "real-return-on-investment",
        "value": "实际投资回报率",
        "type": "V"
      }, {
        "key": "goal-description",
        "value": "目标描述",
        "type": "V"
      }
    ]
  }
  if(!data[selectedVal]){
    console.log('我进入了返回空数据的判断')
    return []
  };
  return {
    code: 'success',
    data: data[selectedVal]
  }
}
/* Header 头部模态框->三级联动->二级(select) */
export const HeaderModalSecondLinkage = selectedVal => {
  if (selectedVal === 'none' || !selectedVal){
    return [
      {
        "key": "none",
        "value": "none"
      }
    ]
  };
  return [
    {
      "key": "none",
      "value": "none"
    }, {
      "key": "equals",
      "value": "等于"
    }, {
      "key": "is-not-equal-to",
      "value": "不等于"
    }, {
      "key": "started",
      "value": "开始于"
    }, {
      "key": "ends-with",
      "value": "结束于"
    }, {
      "key": "contains",
      "value": "包含"
    }, {
      "key": "does-not-include",
      "value": "不包含"
    }, {
      "key": "empty",
      "value": "为空"
    }, {
      "key": "not-empty",
      "value": "不为空"
    }
  ]
}
/**
 *	Header 头部模态框->三级联动->三级(select)
 *	@selectedVal: 一级联动的值, @condition: 二级联动的值(条件), @names: name 属性
 */
export const HeaderModalThreeLinkage = (selectedVal, condition, names) => {
  if (selectedVal === 'none' || condition === 'none' || condition === 'empty'){
    return []
  }else if(selectedVal === 'T'){
    return {
      selector: 'DatePicker',
      startDate: new Date().toLocaleString().replace(/-/g, '/').split(' ')[0],
      format: 'YYYY/MM/DD',
      attr: {
        names
      }
    }
  } else if (selectedVal === 'D') {
    return {
      selector: 'MonthPicker',
      startDate: new Date().toLocaleString().replace(/-/g, '/').split(' ')[0],
      format: 'YYYY/MM',
      attr: {
        names
      }
    }
  } else if (selectedVal === 'DT') {
    return {
      selector: 'RangePicker',
      startDate: new Date().toLocaleString().replace(/-/g, '/').split(' ')[0],
      format: 'YYYY/MM/DD',
      attr: {
        names
      }
    }
  } else {
    return {
      selector: 'Input',
      attr: {
        names
      }
    }
  }
}
/**
*	首页筛选列表的值
*/
export const HomeFilterList = () => {
  return {
    code: 'success',
    data: [
      {
        value: '显示',
        key: 'show',
        children: [
          {
            value: '所有更新',
            key: 'allUpdate',
            placeholder: {
              type: 'check',
              key: true
            }
          },
          {
            value: '小组',
            key: 'group',
            placeholder: {
              type: '',
              key: true
            }
          },
          {
            value: '文件',
            key: 'file',
            placeholder: {
              type: '',
              key: true
            }
          }
        ]
      },
      {
        value: '排序标准',
        key: 'sortNorm',
        children: [
          {
            value: '最新帖子',
            key: 'latestPost',
            placeholder: {
              type: 'check',
              key: true
            }
          },
          {
            value: '最新回复',
            key: 'latestReply',
            placeholder: {
              type: '',
              key: true
            }
          }
        ]
      },
      {
        value: '只是想给你看看',
        key: 'thinkusee',
        placeholder: {
          type: '',
          key: true
        }
      }
    ]
  }
}