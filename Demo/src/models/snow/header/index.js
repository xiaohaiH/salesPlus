import { HeaderModalSelect } from '../../../components/verify/AllData';

export default {
  namespace: 'headerAside',
  state: {
    // 高级搜索模态框的状态
    advancedSearchModal: false,
    // 模态框标题 select 框的数据
    modalSelectData: [],
    // 模态框内容的数据
    modalContentData: []
  },
  effects: {
    *pressEnter({ payload }, { call, put }){
      if(!payload) return ;
      alert('您正在搜索:' + payload)
    },
    /* 请求模态框下拉列表的数据 */
    *resModalData(action, { call, put }){
      const { code, data } = yield call(HeaderModalSelect);
      if(code === 'success'){
        yield put({ type: 'changeModalSelectData', payload: data })
      }
    },
    /* 模态下拉框数据改变后 */
    *moduleChange({ payload }, { call, put }){
      yield put({ type: 'getModalContentData', payload: moduleChange(payload) })
    }
  },
  reducers: {
    advancedSearchModalManage({ advancedSearchModal, ...state}){
      return {
        ...state,
        advancedSearchModal: !advancedSearchModal
      }
    },
    changeModalSelectData({ ...state }, { payload: modalSelectData }){
      return {
        ...state,
        modalSelectData
      }
    },
    getModalContentData({ modalContentData, ...state }, { payload }){
      return {
        ...state,
        modalContentData: payload
      }
    }
  },
  subscriptions: {}
};


function moduleChange(module){
  console.log(module)
  const operation = {
    linkMan(){
      return [
        {
          eleOne: {
            selector: 'select',
            sources: [
              {
                "key": "Select-field",
                "value": "选择字段"
              }, {
                "key": "sales-opportunity-name",
                "value": "销售机会名称"
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
            ]
          },
          eleTwo: {
            selector: 'select',
            sources: [
              {
                "key": 'none',
                "value": 'none'
              }
            ],
            attr: {
              name: 'select2'
            }
          },
          eleThree: {
            selector: 'input',
            attr: {
              name: 'select3'
            }
          }
        }
      ]
    },
    client(){
      return [
        {
          eleOne: {
            selector: 'select',
            sources: [
              {
                key: 'aaa',
                value: '啊啊啊',
              }
            ],
            attr: {
              name: 'select1',
            }
          },
          eleTwo: {
            selector: 'DatePicker',
            format: 'YYYY/MM/DD',
            startDate: '2017/10/10',
            attr: {
              name: 'settingDate'
            }
          },
          eleThree: {
            selector: 'input',
            attr: {
              name: 'select3'
            }
          }
        }
      ]
      
    },
    market(){
      return [
        {
          eleOne: {
            selector: 'select',
            sources: [
              {
                key: 'aaa',
                value: '啊啊啊',
              }
            ],
            attr: {
              name: 'select1',
            }
          },
          eleTwo: {
            selector: 'DatePicker',
            format: 'YYYY/MM/DD',
            startDate: '2017/10/10',
            attr: {
              name: 'settingDate'
            }
          },
          eleThree: {
            selector: 'input',
            attr: {
              name: 'select3'
            }
          }
        }
      ]
      
    },
    potentialClient(){
      return [
        {
          eleOne: {
            selector: 'select',
            sources: [
              {
                key: 'aaa',
                value: '啊啊啊',
              }
            ],
            attr: {
              name: 'select1',
            }
          },
          eleTwo: {
            selector: 'DatePicker',
            format: 'YYYY/MM/DD',
            startDate: '2017/10/10',
            attr: {
              name: 'settingDate'
            }
          },
          eleThree: {
            selector: 'input',
            attr: {
              name: 'select3'
            }
          }
        }
      ]
      
    },
    doc(){
      return [
        {
          eleOne: {
            selector: 'select',
            sources: [
              {
                key: 'aaa',
                value: '啊啊啊',
              }
            ],
            attr: {
              name: 'select1',
            }
          },
          eleTwo: {
            selector: 'DatePicker',
            format: 'YYYY/MM/DD',
            startDate: '2017/10/10',
            attr: {
              name: 'settingDate'
            }
          },
          eleThree: {
            selector: 'input',
            attr: {
              name: 'select3'
            }
          }
        }
      ]
      
    },
    schedule(){
      return [
        {
          eleOne: {
            selector: 'select',
            sources: [
              {
                key: 'aaa',
                value: '啊啊啊',
              }
            ],
            attr: {
              name: 'select1',
            }
          },
          eleTwo: {
            selector: 'DatePicker',
            format: 'YYYY/MM/DD',
            startDate: '2017/10/10',
            attr: {
              name: 'settingDate'
            }
          },
          eleThree: {
            selector: 'input',
            attr: {
              name: 'select3'
            }
          }
        }
      ]
      
    },
    serviceTicker(){
      return [
        {
          eleOne: {
            selector: 'select',
            sources: [
              {
                key: 'aaa',
                value: '啊啊啊',
              }
            ],
            attr: {
              name: 'select1',
            }
          },
          eleTwo: {
            selector: 'DatePicker',
            format: 'YYYY/MM/DD',
            startDate: '2017/10/10',
            attr: {
              name: 'settingDate'
            }
          },
          eleThree: {
            selector: 'input',
            attr: {
              name: 'select3'
            }
          }
        }
      ]
      
    },
    product(){
      return [
        {
          eleOne: {
            selector: 'select',
            sources: [
              {
                key: 'aaa',
                value: '啊啊啊',
              }
            ],
            attr: {
              name: 'select1',
            }
          },
          eleTwo: {
            selector: 'DatePicker',
            format: 'YYYY/MM/DD',
            startDate: '2017/10/10',
            attr: {
              name: 'settingDate'
            }
          },
          eleThree: {
            selector: 'input',
            attr: {
              name: 'select3'
            }
          }
        }
      ]
      
    },
    knowledge(){
      return [
        {
          eleOne: {
            selector: 'select',
            sources: [
              {
                key: 'aaa',
                value: '啊啊啊',
              }
            ],
            attr: {
              name: 'select1',
            }
          },
          eleTwo: {
            selector: 'DatePicker',
            format: 'YYYY/MM/DD',
            startDate: '2017/10/10',
            attr: {
              name: 'settingDate'
            }
          },
          eleThree: {
            selector: 'input',
            attr: {
              name: 'select3'
            }
          }
        }
      ]
      
    },
    price(){
      return [
        {
          eleOne: {
            selector: 'select',
            sources: [
              {
                key: 'aaa',
                value: '啊啊啊',
              }
            ],
            attr: {
              name: 'select1',
            }
          },
          eleTwo: {
            selector: 'DatePicker',
            format: 'YYYY/MM/DD',
            startDate: '2017/10/10',
            attr: {
              name: 'settingDate'
            }
          },
          eleThree: {
            selector: 'input',
            attr: {
              name: 'select3'
            }
          }
        }
      ]
      
    },
    quote(){
      return [
        {
          eleOne: {
            selector: 'select',
            sources: [
              {
                key: 'aaa',
                value: '啊啊啊',
              }
            ],
            attr: {
              name: 'select1',
            }
          },
          eleTwo: {
            selector: 'DatePicker',
            format: 'YYYY/MM/DD',
            startDate: '2017/10/10',
            attr: {
              name: 'settingDate'
            }
          },
          eleThree: {
            selector: 'input',
            attr: {
              name: 'select3'
            }
          }
        }
      ]
      
    },
  }
  return operation[module]()
}


let asdf = {
  linkman: [
    {
      "key": "Select-field",
      "value": "选择字段"
    }, {
      "key": "sales-opportunity-name",
      "value": "销售机会名称"
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
  ]
}
var s = `var arr = ;

var abc = arr.replace(/(<[^>]*>)/g, '\\\\\\').replace(/\\\\\\*/g, ',').split(',');
var abb = abc.slice(1, abc.length - 1);
ddd = ["select-field ", "product-name", "product-number", "effective-product", "product-model", "sales-start-date", "manufacturer", "product-category", "support-start-date", "sales-end-date", "support-due-date", "supplier-name", "site", "supplier-part-number", "manufacturers-part-number", "product description", "serial-number", "creation-time", "accounts", "modified-time", "the-final-revision", "hi", "price", "commission-rate", "tax-category", "unit", "quantity/unit", "inventory", "reorder-level", "head", "quantity-demanded", "product-image", "description"];
console.log(abb.length, ddd.length);
var kkk = abb.map((item, index) => {
	return {
		key: ddd[index],
		value: item
	}
})
console.log(JSON.stringify(kkk));`