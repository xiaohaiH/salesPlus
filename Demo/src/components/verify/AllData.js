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
        "ss": "aabbcc"
      }, {
        "key": "is-expected-to-close-date",
        "value": "预计关闭日期"
      }, {
        "key": "customer-name",
        "value": "客户名称"
      }, {
        "key": "customer-type",
        "value": "客户类型"
      }, {
        "key": "business-number",
        "value": "商机编号"
      }, {
        "key": "company-name",
        "value": "公司名称"
      }, {
        "key": "amount",
        "value": "金额"
      }, {
        "key": "next-step",
        "value": "下一步"
      }, {
        "key": "source",
        "value": "线索来源"
      }, {
        "key": "sales-stage",
        "value": "销售阶段"
      }, {
        "key": "head",
        "value": "负责人"
      }, {
        "key": "likely",
        "value": "可能性"
      }, {
        "key": "source-of-marketing-activities",
        "value": "营销活动来源"
      }, {
        "key": "creation-time",
        "value": "创建时间"
      }, {
        "key": "modified-time",
        "value": "修改时间"
      }, {
        "key": "the-final-revision",
        "value": "最后修订者"
      }, {
        "key": "whether-by-potential-customers-conversion",
        "value": "是否由潜在客户转换而来"
      }, {
        "key": "predicted-amount",
        "value": "预测金额"
      }, {
        "key": "founder",
        "value": "创建人"
      }, {
        "key": "contact-name",
        "value": "联系人姓名"
      }, {
        "key": "Test02",
        "value": "Test02"
      }, {
        "key": "Test-IMG",
        "value": "Test-IMG"
      }, {
        "key": "number-of-Test",
        "value": "测试自动编号"
      }, {
        "key": "Test3",
        "value": "Test3"
      }, {
        "key": "Test1",
        "value": "测试编号1"
      }, {
        "key": "Test",
        "value": "测试的"
      }, {
        "key": "X3444",
        "value": "X3444"
      }, {
        "key": "Test-field",
        "value": "测试字段"
      }, {
        "key": "text-list-Test",
        "value": "文本列表测试"
      }, {
        "key": "Test-to-find-the",
        "value": "测试查找"
      }, {
        "key": "sales-image",
        "value": "销售图片"
      }, {
        "key": "testgavin",
        "value": "testgavin"
      }, {
        "key": "currency-fields",
        "value": "货币字段"
      }, {
        "key": "lookup-fields",
        "value": "查找字段"
      }, {
        "key": "time-Test",
        "value": "时间测试"
      }, {
        "key": "email",
        "value": "电子邮件"
      }, {
        "key": "time",
        "value": "时间"
      }, {
        "key": "region",
        "value": "地区"
      }, {
        "key": "predicted-class",
        "value": "预测类别"
      }, {
        "key": "whether-to-close",
        "value": "是否关闭"
      }, {
        "key": "drop-down-box-Test",
        "value": "下拉框测试"
      }, {
        "key": "multiple-combination-values",
        "value": "多选组合取值"
      }, {
        "key": "record-type",
        "value": "记录类型"
      }, {
        "key": "the-current-approver",
        "value": "当前审批人"
      }, {
        "key": "description",
        "value": "描述"
      }
    ],
    client: [
      {
        "key": "select-field",
        "value": "选择字段"
      }, {
        "key": "customer-name",
        "value": "客户名称"
      }, {
        "key": "customer-number",
        "value": "客户编号"
      }, {
        "key": "site",
        "value": "网站"
      }, {
        "key": "commonly-used-the-phone",
        "value": "常用电话"
      }, {
        "key": "stock-code",
        "value": "股票代码"
      }, {
        "key": "fax",
        "value": "传真"
      }, {
        "key": "parent-company",
        "value": "母公司"
      }, {
        "key": "phone",
        "value": "备用电话"
      }, {
        "key": "employee-number",
        "value": "雇员数量"
      }, {
        "key": "Commonly-used-Email",
        "value": "常用邮箱"
      }, {
        "key": "owner",
        "value": "备用邮箱"
      }, {
        "key": "industry",
        "value": "所有者"
      }, {
        "key": "evaluate",
        "value": "行业"
      }, {
        "key": "type",
        "value": "评价"
      }, {
        "key": "standard-industrial",
        "value": "类型"
      }, {
        "key": "classification-code",
        "value": "标准产业分类代码"
      }, {
        "key": "annual-revenue",
        "value": "年度营收"
      }, {
        "key": "head",
        "value": "负责人"
      }, {
        "key": "remind-head",
        "value": "提醒负责人"
      }, {
        "key": "modified-time",
        "value": "修改时间"
      }, {
        "key": "creation-time",
        "value": "创建时间"
      }, {
        "key": "the-final-revision",
        "value": "最后修订者"
      }, {
        "key": "whether-by-potential-customers-conversion",
        "value": "是否由潜在客户转换而来"
      }, {
        "key": "founder",
        "value": "创建人"
      }, {
        "key": "integer-test-field",
        "value": "整数测试字段"
      }, {
        "key": "customer-photo",
        "value": "客户照片"
      }, {
        "key": "list",
        "value": "列表"
      }, {
        "key": "test-text",
        "value": "测试文本"
      }, {
        "key": "test",
        "value": "测试自动编号"
      }, {
        "key": "assets",
        "value": "资产"
      }, {
        "key": "city/county",
        "value": "市/县区"
      }, {
        "key": "level-of-industry",
        "value": "一级行业"
      }, {
        "key": "secondary-industry",
        "value": "二级行业"
      }, {
        "key": "test-drop-down-list",
        "value": "测试下拉单"
      }, {
        "key": "contact-time",
        "value": "联系时间"
      }, {
        "key": "the-customer-time",
        "value": "客户时间"
      }, {
        "key": "picture-fields",
        "value": "图片字段"
      }, {
        "key": "image-field",
        "value": "图片字段"
      }, {
        "key": "test-image",
        "value": "测试图片"
      }, {
        "key": "is-set-to-head",
        "value": "是否设为负责人"
      }, {
        "key": "check",
        "value": "复选"
      }, {
        "key": "record-type",
        "value": "记录类型"
      }, {
        "key": "the-current-approver",
        "value": "当前审批人"
      }, {
        "key": "shipping-address",
        "value": "收货地址"
      }, {
        "key": "post-office-box",
        "value": "邮政信箱"
      }, {
        "key": "zip-code",
        "value": "邮政编码"
      }, {
        "key": "national",
        "value": "国家"
      }, {
        "key": "description",
        "value": "描述"
      }
    ],
    potentialClient: [
      {
        "key": "select-field ",
        "value": "选择字段"
      }, {
        "key": "appellation",
        "value": "称谓"
      }, {
        "key": "name",
        "value": "名"
      }, {
        "key": "number",
        "value": "编号"
      }, {
        "key": "name",
        "value": "姓"
      }, {
        "key": "commonly-used-the-phone",
        "value": "常用电话"
      }, {
        "key": "company",
        "value": "公司"
      }, {
        "key": "mobile-phone",
        "value": "手机"
      }, {
        "key": "job-title",
        "value": "职称"
      }, {
        "key": "fax",
        "value": "传真"
      }, {
        "key": "clues-source",
        "value": "线索来源"
      }, {
        "key": "common-Email",
        "value": "常用 Email"
      }, {
        "key": "industry",
        "value": "行业"
      }, {
        "key": "site",
        "value": "网站"
      }, {
        "key": "annual-revenue",
        "value": "年度营收"
      }, {
        "key": "clues-to-state",
        "value": "线索状态"
      }, {
        "key": "employee-number",
        "value": "雇员数量"
      }, {
        "key": "evaluate",
        "value": "评价"
      }, {
        "key": "alternate-Email",
        "value": "备用 Email"
      }, {
        "key": "head",
        "value": "负责人"
      }, {
        "key": "modified-time",
        "value": "修改时间"
      }, {
        "key": "creation-time",
        "value": "创建时间"
      }, {
        "key": "the-final-revision",
        "value": "最后修订者"
      }, {
        "key": "refused-to-Email-harassment",
        "value": "拒绝 Email 骚扰"
      }, {
        "key": "founder",
        "value": "创建人"
      }, {
        "key": "is-set-to-head",
        "value": "是否设为负责人"
      }, {
        "key": "street",
        "value": "街道"
      }, {
        "key": "post-office-box",
        "value": "邮政信箱"
      }, {
        "key": "zip-code",
        "value": "邮政编码"
      }, {
        "key": "city",
        "value": "城市"
      }, {
        "key": "national",
        "value": "国家"
      }, {
        "key": "provincial/state",
        "value": "省/州"
      }, {
        "key": "description",
        "value": "描述"
      }
    ],
    doc: [
      {
        "key": "select-field ",
        "value": "选择字段"
      }, {
        "key": "title",
        "value": "标题"
      }, {
        "key": "folder",
        "value": "文件夹"
      }, {
        "key": "document-number",
        "value": "文档编号"
      }, {
        "key": "head",
        "value": "负责人"
      }, {
        "key": "creation-time",
        "value": "创建时间"
      }, {
        "key": "modified-time",
        "value": "修改时间"
      }, {
        "key": "last-modified",
        "value": "最后修改"
      }, {
        "key": "introduction",
        "value": "简介"
      }, {
        "key": "download-type",
        "value": "下载类型"
      }, {
        "key": "enable",
        "value": "启用"
      }, {
        "key": "name",
        "value": "文件名"
      }, {
        "key": "file-size",
        "value": "文件大小"
      }, {
        "key": "file-type",
        "value": "文件类型"
      }, {
        "key": "version",
        "value": "版本"
      }, {
        "key": "downloaded",
        "value": "下载次数"
      }
    ],
    schedule: [
      {
        "key": "select-field",
        "value": "选择字段"
      }, {
        "key": "subject",
        "value": "主题"
      }, {
        "key": "Send-Reminder",
        "value": "发送提醒"
      }, {
        "key": "head",
        "value": "负责人"
      }, {
        "key": "Start-date-and-Time",
        "value": "开始日期和时间"
      }, {
        "key": "Time-Start",
        "value": "开始时间"
      }, {
        "key": "End-Time",
        "value": "结束时间"
      }, {
        "key": "due-date",
        "value": "截止日期"
      }, {
        "key": "Recurrence",
        "value": "Recurrence"
      }, {
        "key": "associated-with",
        "value": "关联于"
      }, {
        "key": "contact",
        "value": "联系人"
      }, {
        "key": "state",
        "value": "状态"
      }, {
        "key": "state",
        "value": "状态"
      }, {
        "key": "priority",
        "value": "优先级"
      }, {
        "key": "Send-notification",
        "value": "发送通知"
      }, {
        "key": "creation-Time",
        "value": "创建时间"
      }, {
        "key": "modified-Time",
        "value": "修改时间"
      }, {
        "key": "type",
        "value": "类型"
      }, {
        "key": "Visibility",
        "value": "展示"
      }, {
        "key": "Duration",
        "value": "持续时间"
      }, {
        "key": "Duration-Minutes",
        "value": "持续分钟"
      }, {
        "key": "location",
        "value": "地点"
      }, {
        "key": "No-Time",
        "value": "No Time"
      }, {
        "key": "the-final-revision",
        "value": "最后修订者"
      }, {
        "key": "founder",
        "value": "创建人"
      }, {
        "key": "location",
        "value": "位置"
      }, {
        "key": "description",
        "value": "描述"
      }
    ],
    serviceTicker: [
      {
        "key": "select-field ",
        "value": "选择字段"
      }, {
        "key": "title",
        "value": "标题"
      }, {
        "key": "customer-name",
        "value": "客户名称"
      }, {
        "key": "head",
        "value": "负责人"
      }, {
        "key": "product-name",
        "value": "产品名称"
      }, {
        "key": "priority",
        "value": "优先级"
      }, {
        "key": "state",
        "value": "状态"
      }, {
        "key": "severity",
        "value": "严重程度"
      }, {
        "key": "hour",
        "value": "小时"
      }, {
        "key": "creation-time",
        "value": "创建时间"
      }, {
        "key": "category",
        "value": "类别"
      }, {
        "key": "day",
        "value": "天"
      }, {
        "key": "update-record",
        "value": "更新历史记录"
      }, {
        "key": "modified-time",
        "value": "修改时间"
      }, {
        "key": "number",
        "value": "编号"
      }, {
        "key": "the-final-revision",
        "value": "最后修订者"
      }, {
        "key": "contact-name",
        "value": "联系人姓名"
      }, {
        "key": "from-the-customer-portal",
        "value": "来源于客户门户"
      }, {
        "key": "founder",
        "value": "创建人"
      }, {
        "key": "test",
        "value": "测试下拉"
      }, {
        "key": "subject",
        "value": "主题"
      }, {
        "key": "email address",
        "value": "邮件地址"
      }, {
        "key": "image-field",
        "value": "图片字段"
      }, {
        "key": "the-current-approver",
        "value": "当前审批人"
      }, {
        "key": "description",
        "value": "描述"
      }, {
        "key": "solution",
        "value": "解决方案"
      }
    ],
    product: [
      {
        "key": "select-field ",
        "value": "选择字段"
      }, {
        "key": "product-name",
        "value": "产品名称"
      }, {
        "key": "product-number",
        "value": "产品编号"
      }, {
        "key": "effective-product",
        "value": "产品有效"
      }, {
        "key": "product-model",
        "value": "产品型号"
      }, {
        "key": "sales-start-date",
        "value": "销售开始日期"
      }, {
        "key": "manufacturer",
        "value": "生产厂商"
      }, {
        "key": "product-category",
        "value": "产品类别"
      }, {
        "key": "support-start-date",
        "value": "支持开始日期"
      }, {
        "key": "sales-end-date",
        "value": "销售结束日期"
      }, {
        "key": "support-due-date",
        "value": "支持到期日"
      }, {
        "key": "supplier-name",
        "value": "供应商名称"
      }, {
        "key": "site",
        "value": "网站"
      }, {
        "key": "supplier-part-number",
        "value": "供应商部件编号"
      }, {
        "key": "manufacturers-part-number",
        "value": "生产商部件编号"
      }, {
        "key": "product description",
        "value": "产品说明"
      }, {
        "key": "serial-number",
        "value": "序列号"
      }, {
        "key": "creation-time",
        "value": "创建时间"
      }, {
        "key": "accounts",
        "value": "会计科目"
      }, {
        "key": "modified-time",
        "value": "修改时间"
      }, {
        "key": "the-final-revision",
        "value": "最后修订者"
      }, {
        "key": "hi",
        "value": "呵呵"
      }, {
        "key": "price",
        "value": "单价"
      }, {
        "key": "commission-rate",
        "value": "佣金率"
      }, {
        "key": "tax-category",
        "value": "税务类别"
      }, {
        "key": "unit",
        "value": "单位"
      }, {
        "key": "quantity/unit",
        "value": "数量/单位"
      }, {
        "key": "inventory",
        "value": "库存数量"
      }, {
        "key": "reorder-level",
        "value": "再订购水平"
      }, {
        "key": "head",
        "value": "负责人"
      }, {
        "key": "quantity-demanded",
        "value": "需求数量"
      }, {
        "key": "product-image",
        "value": "产品图片"
      }, {
        "key": "description",
        "value": "描述"
      }
    ],
    knowledge: [
      {
        'key': 'select-field',
        'value': '选择字段'
      }, {
        'key': 'product',
        'value': '产品'
      }, {
        'key': 'number',
        'value': '编号'
      }, {
        'key': 'head',
        'value': '负责人'
      }, {
        'key': 'state',
        'value': '状态'
      }, {
        'key': 'category',
        'value': '类别'
      }, {
        'key': 'creation-time',
        'value': '创建时间'
      }, {
        'key': 'modified-time',
        'value': '修改时间'
      }, {
        'key': 'question',
        'value': '问题'
      }, {
        'key': 'the-final-revision',
        'value': '最后修订者'
      }, {
        'key': 'the-answer',
        'value': '答案'
      }, {
        'key': 'scenarios',
        'value': '应用场景'
      }, {
        'key': 'problem-description',
        'value': '问题描述'
      }, {
        'key': 'detailed-answer',
        'value': '详细回答'
      }, {
        'key': 'approval status',
        'value': '审批状态'
      }, {
        'key': 'key-words',
        'value': '关键字'
      }, {
        'key': 'content',
        'value': '内容'
      }, {
        'key': 'title',
        'value': '标题'
      }, {
        'key': 'classification',
        'value': '分类'
      }
    ],
    price: [
      {
        'key': 'select-field',
        'value': '选择字段'
      }, {
        'key': 'price-list-name',
        'value': '价格表名称'
      }, {
        'key': 'enable',
        'value': '启用'
      }, {
        'key': 'price-list-number',
        'value': '价格表编号'
      }, {
        'key': 'creation-time',
        'value': '创建时间'
      }, {
        'key': 'modified-time',
        'value': '修改时间'
      }, {
        'key': 'currency',
        'value': '货币'
      }, {
        'key': 'the-final-revision',
        'value': '最后修订者'
      }, {
        'key': 'description',
        'value': '描述'
      }
    ],
    quote: [
      {
        "key": "select-field",
        "value": "选择字段"
      }, {
        "key": "title",
        "value": "标题"
      }, {
        "key": "sales-opportunity-name",
        "value": "销售机会名称"
      }, {
        "key": "the-quotation-number",
        "value": "报价单编号"
      }, {
        "key": "offer-stage",
        "value": "报价阶段"
      }, {
        "key": "valid-to",
        "value": "有效期至"
      }, {
        "key": "contact",
        "value": "联系人"
      }, {
        "key": "carrier",
        "value": "承运人"
      }, {
        "key": "small-project",
        "value": "小计"
      }, {
        "key": "technology",
        "value": "科技"
      }, {
        "key": "inventory-management",
        "value": "库存管理"
      }, {
        "key": "total",
        "value": "总计"
      }, {
        "key": "tax-type",
        "value": "税务类型"
      }, {
        "key": "discount-rate",
        "value": "折扣金额"
      }, {
        "key": "the-amount",
        "value": "运费和物流附加费"
      }, {
        "key": "freight-and-logistics-surcharge",
        "value": "公司名称"
      }, {
        "key": "company-name",
        "value": "负责人"
      }, {
        "key": "head",
        "value": "创建时间"
      }, {
        "key": "creation-time",
        "value": "修改时间"
      }, {
        "key": "modified-time",
        "value": "调整"
      }, {
        "key": "adjust",
        "value": "货币"
      }, {
        "key": "currency",
        "value": "转换率"
      }, {
        "key": "conversion",
        "value": "最后修订者"
      }, {
        "key": "the-final-revision",
        "value": "税前合计"
      }, {
        "key": "total-pre-tax",
        "value": "账单地址"
      }, {
        "key": "billing-address",
        "value": "收货地址"
      }, {
        "key": "shipping-address",
        "value": "邮政信箱"
      }, {
        "key": "post-office-box",
        "value": "市/县"
      }, {
        "key": "city/county",
        "value": "省/州"
      }, {
        "key": "provincial/state",
        "value": "邮政编码"
      }, {
        "key": "zip-code",
        "value": "国家"
      }, {
        "key": "national",
        "value": "条款及细则"
      }, {
        "key": "terms-and-conditions",
        "value": "条目名称"
      }, {
        "key": "item-name",
        "value": "数量"
      }, {
        "key": "number",
        "value": "标价"
      }, {
        "key": "price",
        "value": "物料注释"
      }, {
        "key": "material notes",
        "value": "折扣"
      }, {
        "key": "discount",
        "value": "折扣率项"
      }, {
        "key": "tax",
        "value": "税"
      }, {
        "key": "freight-percentage",
        "value": "运费百分比"
      }, {
        "key": "vat1",
        "value": "vat1"
      }, {
        "key": "description",
        "value": "描述"
      }
    ],
    bazaar: [
      {
        "key": "select-field",
        "value": "选择字段"
      }, {
        "key": "marketing-activities ",
        "value": "市场活动名称"
      }, {
        "key": "numbering",
        "value": "编号"
      }, {
        "key": "responsible-person",
        "value": "负责人223"
      }, {
        "key": "state",
        "value": "状态"
      }, {
        "key": "type",
        "value": "类型"
      }, {
        "key": "product",
        "value": "产品"
      }, {
        "key": "target-audience",
        "value": "目标受众"
      }, {
        "key": "is-expected-to-close-date",
        "value": "预计关闭日期"
      }, {
        "key": "the-host",
        "value": "主办方"
      }, {
        "key": "scale",
        "value": "规模"
      }, {
        "key": "creation-time",
        "value": "创建时间"
      }, {
        "key": "the-number-has-been-sent",
        "value": "已发送数量"
      }, {
        "key": "modified-time",
        "value": "修改时间"
      }, {
        "key": "the-final-revision",
        "value": "最后修订者"
      }, {
        "key": "implementation",
        "value": "执行方案"
      }, {
        "key": "budget-cost",
        "value": "预算成本"
      }, {
        "key": "actual-cost",
        "value": "实际成本"
      }, {
        "key": "the-expected-response",
        "value": "预期响应"
      }, {
        "key": "earnings",
        "value": "预期收益"
      }, {
        "key": "number-of-expected-sales",
        "value": "预期销售数量"
      }, {
        "key": "actual-sales-quantity",
        "value": "实际销售数量"
      }, {
        "key": "number-of-expected-response",
        "value": "预期响应数量"
      }, {
        "key": "number-of-actual-response",
        "value": "实际响应数量"
      }, {
        "key": "expected-return-on-investment",
        "value": "预期投资回报率"
      }, {
        "key": "real-return-on-investment",
        "value": "实际投资回报率"
      }, {
        "key": "goal-description",
        "value": "目标描述"
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
  if(selectedVal === 'none'){
    return []
  };
  return [
    {
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