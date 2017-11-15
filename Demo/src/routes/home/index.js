import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Select, Button, message, Icon, Dropdown, Menu, Input } from 'antd';
import MainLayout from '../../components/snow/Layout/index';
import { SelectOptions } from '../../components/snow/appMethod';
import styled from './index.less';
/* 富文本 */
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const { Option } = Select
const { Item: MenuItem, ItemGroup } = Menu


import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';

class Home extends Component{
  /* 富文本上传图片后的回调函数 */
  uploadCallback(){
    return new Promise((resolve, inject) => {
      /* 这一块要做个请求,返回值格式为 data: { link: 'url'} */
      resolve({data: { link: 'http://dev.salesnow.cn/upload/nchatter/users/salesnow_users20170720122128384.jpg' }})
    })
  }
  /* 改变富文本状态 */
  editRichText(){
    const { dispatch, home: { richTextState: { richTextEditing } } } = this.props;
    dispatch({ type: 'home/changeRichTextValue', payload: { key: 'richTextEditing', value: !richTextEditing } })
  }
  /**
   * @onContentStateChange: { blocks(Array+Object): [] - 每个对象代表一行, entityMap: {} } 参数详解
   *   blocks: 
   *     inlineStyleRanges(Array+Object): offset - 文字的偏移量, length - 偏移量结束点, style - 文字偏移量到结束点之间的节点类型
   *     text(String): 该行的文字
   *     key(String): 该行对应的 key 值
   *     type: 该行的类型(如有序列表, 无序列表), 默认 unstyled 
   *  @entityMap(Object): 用户上传的图片,@用户 之类的非文字性类型
   *    type: 该对象的类型(如 IMAGE 等)
   *    mutability: 该对象的值是否可变
   *    data: 改对象的属性
   *      value: 该对象的值,具体可以自己打印查看
   */
  /* 富文本的值改变后 */
  onContentStateChange(onContentStateChange) {
    // console.log('onContentStateChange:', onContentStateChange)
    dispatch({ type: 'home/changeRichTextValue', payload: { key: 'richTextValue', value: onContentStateChange } })
  }
  /* 富文本类别改变 */
  groupChange(value){
    const { dispatch } = this.props;
    dispatch({ type: 'home/changeRichTextValue', payload: value })
  }
  /* 提交富文本 */
  submitRichText(){
    const { home: { richTextState: { richTextValue, group, richTextEditing } }, dispatch } = this.props;
    const flag = richTextValue && richTextValue.blocks.map(item => item.text).filter(value => value);
    if ((flag instanceof Array && !flag.length) || !flag){
      message.error('输入值不能为空')
      return false;
    };
    const groupFilter = group.find(ele => ele.selected);
    let params = {
      richTextValue,
      group: groupFilter
    };
    dispatch({ type: 'home/changeRichTextValue', payload: { key: 'richTextEditing', value: !richTextEditing } });
    message.success('发布成功');
    console.log(params)
  }
  /* 搜索框状态 */
  searchboxState(state){
    if (state === 'show'){
      Object.assign(this.searchInput.style, { display: 'block' })
      setTimeout(() => {
        Object.assign(this.searchInput.style, { width: '200px' })
      }, 0);
    } else {
      Object.assign(this.searchInput.style, { width: 0 })
      setTimeout(() => {
        Object.assign(this.searchInput.style, { display: 'none' })
      }, 800);
    }
  }
  
  render(){
    const { location, home: { richTextState: { richTextEditing, group } } } = this.props;
    const list = (
      <Menu>
        <ItemGroup className={styled.filterGroup} title="显示">
          <MenuItem className={styled.fdsa}>aabbcc</MenuItem>
          <MenuItem className={styled.fdsa}>31321</MenuItem>
        </ItemGroup>
        <ItemGroup className={styled.filterGroup} title="排序标准">
          <MenuItem className={styled.fdsa}>fda21</MenuItem>
          <MenuItem className={styled.fdsa}>aavv21</MenuItem>
          <MenuItem className={styled.fdsa}>5456fdsa</MenuItem>
        </ItemGroup>
      </Menu>
    );
    return (
      <MainLayout location={location} >
        <div className={styled.box}>
          <div className={styled.messageBox}>
            {/* 富文本 */}
            {
              richTextEditing ? 
                <Card className={styled.richTextBox} bodyStyle={{padding: 0}} bordered={false}>
                  <Editor
                    /* 富文本类名 */
                    wrapperClassName={styled.wrapper}
                    /* 工具栏类名 */
                    toolbarClassName={styled.toolbar}
                    /* 编辑区类名 */
                    editorClassName={styled.editor}
                    /* 文本框发生改变时触发事件,会生成 JSON 数据 */
                    onContentStateChange={this.onContentStateChange.bind(this)}
                    /* 设置富文本的语言 */
                    localization={{ locale: 'zh', translations: { 'generic.add': 'Add' } }}
                    onTab={() => true}
                    /* 设置工具栏 */
                    toolbar={{
                      /* 设置字体样式,加粗 上下标等 */
                      inline: { inDropdown: false, options: ['bold', 'italic'] },
                      /* 设置文字的列表(有序,无序,缩进等) */
                      list: { inDropdown: false, options: ['unordered', 'ordered'] },
                      /* 清除格式 */
                      remove: { className: undefined, component: undefined },
                      /* 是否撤销,恢复上一步操作 */
                      history: { inDropdown: false },
                      /* 上传图片 */
                      image: { uploadCallback: this.uploadCallback.bind(this), uploadEnabled: true },
                      /* 设置整块编辑区的字体大小 */
                      blockType: { inDropdown: true, className: styled.hide },
                      /* 设置整块选中文字的大小 */
                      fontSize: { inDropdown: true, className: styled.hide },
                      /* 设置文字的字体 */
                      fontFamily: { inDropdown: true, className: styled.hide },
                      /* 设置文字的位置(居中,左对齐等) */
                      textAlign: { inDropdown: true, className: styled.hide },
                      /* 设置文字,背景的颜色 */
                      colorPicker: { inDropdown: true, className: styled.hide },
                      /* 添加,删除超链接文字 */
                      link: { inDropdown: false, className: styled.hide },
                      /* 表情包 */
                      emoji: { inDropdown: false, className: styled.hide },
                      /* 内嵌 */
                      embedded: { className: styled.hide }
                    }}

                    /* 设置提及 */
                    mention={{
                      separator: ' ',
                      trigger: '@',
                      caseSensitive: true,
                      suggestions: [
                        { text: 'one', value: '老九门', url: 'http://www.baidu.com' }
                      ]
                    }}
                  />
                  <div className={styled.richTextSubmitBox}>
                    <div>
                      <span>发表到</span>
                      <Select onChange={this.groupChange.bind(this)} className={styled.group} defaultValue="公共组">
                        {
                          SelectOptions(group)
                        }
                      </Select>
                    </div>
                    <div className={styled.richTextBtnBox}>
                      <Button onClick={this.editRichText.bind(this)}>取消</Button>
                      <Button onClick={this.submitRichText.bind(this)}>发送</Button>
                    </div>
                  </div>
                </Card>
              :
                <div onClick={this.editRichText.bind(this)} className={styled.richTextPlaceholder}>发布消息</div>
            }
            {/* 主体内容 */}
            <div className={styled.content}>
              <div className={styled.filterBox}>
                <span className={styled.searchBox}>
                  <Icon onClick={() => this.searchboxState.bind(this)('show')} type="search" className={styled.search} />
                  <span ref={(input) => this.searchInput = input} className={styled.beginSearch}>
                    <label>
                      <Icon type="search" onClick={() => this.searchboxState.bind(this)('none')} className={styled.search} />
                      <Input type="text" placeholder="请输入摘要,按回车搜索" name="search" id="success" />
                      <Icon type="close" className={styled.close} />
                    </label>
                  </span>
                </span>
                <span className={styled.spaceLine}></span>
                <Dropdown getPopupContainer={() => document.getElementsByClassName(styled.filterConditionBox)[0]} trigger={['click']} overlay={list}>
                  <p className={styled.filterConditionBox}>
                    <span className={styled.fixationCondition}>显示</span>
                    <span className={styled.classes}>类别</span>
                    <Icon type="down" />
                  </p>
                </Dropdown>
              </div>
              <section>
              </section>
            </div>
          </div>
          <div className={styled.NCharBox}>
            NChar
            <Card bordered={false}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </div>
        </div>
      </MainLayout>
    )
  }
}

export default connect(({ home }) => ({ home}))(Home)