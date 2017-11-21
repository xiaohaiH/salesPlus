// import React, { Component } from 'react';
// import { connect } from 'dva';
// import { Link } from 'dva/router';
// import { Card, Select, Button, message, Icon, Dropdown, Menu, Input } from 'antd';
// import MainLayout from '../../components/snow/Layout/index';
// import { SelectOptions } from '../../components/snow/appMethod';
// import styled from './index.less';
// /* 富文本 */
// import { Editor } from 'react-draft-wysiwyg';
// import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// const { Option } = Select
// const { Item: MenuItem, ItemGroup } = Menu


// import PropTypes from 'prop-types';
// import { EditorState, Modifier } from 'draft-js';


// class Home extends Component{
//   /* 富文本上传图片后的回调函数 */
//   uploadCallback(){
//     return new Promise((resolve, inject) => {
//       /* 这一块要做个请求,返回值格式为 data: { link: 'url'} */
//       resolve({data: { link: 'http://dev.salesnow.cn/upload/nchatter/users/salesnow_users20170720122128384.jpg' }})
//     })
//   }
//   /* 改变富文本状态 */
//   editRichText(){
//     const { dispatch, home: { richTextState: { richTextEditing } } } = this.props;
//     dispatch({ type: 'home/changeRichTextValue', payload: { key: 'richTextEditing', value: !richTextEditing } })
//   }
//   /**
//    * @onContentStateChange: { blocks(Array+Object): [] - 每个对象代表一行, entityMap: {} } 参数详解
//    *   blocks: 
//    *     inlineStyleRanges(Array+Object): offset - 文字的偏移量, length - 偏移量结束点, style - 文字偏移量到结束点之间的节点类型
//    *     text(String): 该行的文字
//    *     key(String): 该行对应的 key 值
//    *     type: 该行的类型(如有序列表, 无序列表), 默认 unstyled 
//    *  @entityMap(Object): 用户上传的图片,@用户 之类的非文字性类型
//    *    type: 该对象的类型(如 IMAGE 等)
//    *    mutability: 该对象的值是否可变
//    *    data: 改对象的属性
//    *      value: 该对象的值,具体可以自己打印查看
//    */
//   /* 富文本的值改变后 */
//   onContentStateChange(onContentStateChange) {
//     // console.log('onContentStateChange:', onContentStateChange)
//     dispatch({ type: 'home/changeRichTextValue', payload: { key: 'richTextValue', value: onContentStateChange } })
//   }
//   /* 富文本类别改变 */
//   groupChange(value){
//     const { dispatch } = this.props;
//     dispatch({ type: 'home/changeRichTextValue', payload: value })
//   }
//   /* 提交富文本 */
//   submitRichText(){
//     const { home: { richTextState: { richTextValue, group, richTextEditing } }, dispatch } = this.props;
//     const flag = richTextValue && richTextValue.blocks.map(item => item.text).filter(value => value);
//     if ((flag instanceof Array && !flag.length) || !flag){
//       message.error('输入值不能为空')
//       return false;
//     };
//     const groupFilter = group.find(ele => ele.selected);
//     let params = {
//       richTextValue,
//       group: groupFilter
//     };
//     dispatch({ type: 'home/changeRichTextValue', payload: { key: 'richTextEditing', value: !richTextEditing } });
//     message.success('发布成功');
//     console.log(params)
//   }
//   /* 搜索框状态 */
//   searchboxState(state){
//     if (state === 'show'){
//       Object.assign(this.searchInputBox.style, { display: 'block' })
//       setTimeout(() => {
//         Object.assign(this.searchInputBox.style, { width: '200px' })
//       }, 0);
//     } else if(state === 'none') {
//       Object.assign(this.searchInputBox.style, { width: '22px' })
//       setTimeout(() => {
//         Object.assign(this.searchInputBox.style, { display: 'none' })
//       }, 700);
//     }else{
//       this.searchInput.refs.input.value = '';
//     }
//   }
//   /* 生成筛选列表 */
//   menuOptions(arr = []){
//     if (!(arr instanceof Array)) {
//       throw new Error('数据输入有误--89行');
//       return false
//     };
//     return arr.map((item, key) => {
//       if (item.children) {
//         const options = this.menuOptions(item.children)
//         return (
//           <ItemGroup className={styled.filterGroup} key={key} {...item.attr} title={item.value}>{options}</ItemGroup>
//         )
//       };
//       if (item.placeholder.key) {
//         return <MenuItem key={key} {...item.attr}><span className={styled.check}>{item.placeholder.type && <Icon type={item.placeholder.type} />}</span>{item.value}</MenuItem>
//       }
//       return <MenuItem className={styled.fdsa} key={key} {...item.attr}>{item.value}</MenuItem>
//     })
//   }
//   /* 生成消息列表 */
//   messageOption(arr = []){
//     let result = arr.map((item, key) => {
//       return (
//         <figure key={key} className={styled.messagePanel}>
//           <img src="../../assets.jpg" />
//           <figcaption>
//             <p className={styled.title}>
//               <Link to="/">组别</Link>
//               <span className={styled.divideDot}></span>
//               <Link to="/">人员</Link>
//             </p>
//             <div className={styled.details}>
//               aaaabbbcccddd
//                     </div>
//             <div className={styled.leaveWord}>
//               <p>
//                 <span className={`${styled.cursor}`}>留言</span>
//                 <span className={styled.divideDot}></span>
//                 <span className={styled.publishTime}>2017-07-21 15:21:12</span>
//               </p>
//             </div>
//           </figcaption>
//         </figure>
//       )
//     })
//     return result
//   }
  
//   render(){
//     const { location, home: { richTextState: { richTextEditing, group }, filterList } } = this.props;

//     return (
//       <MainLayout location={location} >
//         <div className={styled.box}>
//           <div className={styled.messageBox}>
//             {/* 富文本 */}
//             {
//               richTextEditing ? 
//                 <Card className={styled.richTextBox} bodyStyle={{padding: 0}} bordered={false}>
//                   <Editor
//                     /* 富文本类名 */
//                     wrapperClassName={styled.wrapper}
//                     /* 工具栏类名 */
//                     toolbarClassName={styled.toolbar}
//                     /* 编辑区类名 */
//                     editorClassName={styled.editor}
//                     /* 文本框发生改变时触发事件,会生成 JSON 数据 */
//                     onContentStateChange={this.onContentStateChange.bind(this)}
//                     /* 设置富文本的语言 */
//                     localization={{ locale: 'zh', translations: { 'generic.add': 'Add' } }}
//                     onTab={() => true}
//                     /* 设置工具栏 */
//                     toolbar={{
//                       /* 设置字体样式,加粗 上下标等 */
//                       inline: { inDropdown: false, options: ['bold', 'italic'] },
//                       /* 设置文字的列表(有序,无序,缩进等) */
//                       list: { inDropdown: false, options: ['unordered', 'ordered'] },
//                       /* 清除格式 */
//                       remove: { className: undefined, component: undefined },
//                       /* 是否撤销,恢复上一步操作 */
//                       history: { inDropdown: false },
//                       /* 上传图片 */
//                       image: { uploadCallback: this.uploadCallback.bind(this), uploadEnabled: true },
//                       /* 设置整块编辑区的字体大小 */
//                       blockType: { inDropdown: true, className: styled.hide },
//                       /* 设置整块选中文字的大小 */
//                       fontSize: { inDropdown: true, className: styled.hide },
//                       /* 设置文字的字体 */
//                       fontFamily: { inDropdown: true, className: styled.hide },
//                       /* 设置文字的位置(居中,左对齐等) */
//                       textAlign: { inDropdown: true, className: styled.hide },
//                       /* 设置文字,背景的颜色 */
//                       colorPicker: { inDropdown: true, className: styled.hide },
//                       /* 添加,删除超链接文字 */
//                       link: { inDropdown: false, className: styled.hide },
//                       /* 表情包 */
//                       emoji: { inDropdown: false, className: styled.hide },
//                       /* 内嵌 */
//                       embedded: { className: styled.hide }
//                     }}

//                     /* 设置提及 */
//                     mention={{
//                       separator: ' ',
//                       trigger: '@',
//                       caseSensitive: true,
//                       suggestions: [
//                         { text: 'one', value: '老九门', url: 'http://www.baidu.com' }
//                       ]
//                     }}
//                   />
//                   <div className={styled.richTextSubmitBox}>
//                     <div>
//                       <span>发表到</span>
//                       <Select onChange={this.groupChange.bind(this)} className={styled.group} defaultValue="公共组">
//                         {
//                           SelectOptions(group)
//                         }
//                       </Select>
//                     </div>
//                     <div className={styled.richTextBtnBox}>
//                       <Button onClick={this.editRichText.bind(this)}>取消</Button>
//                       <Button onClick={this.submitRichText.bind(this)}>发送</Button>
//                     </div>
//                   </div>
//                 </Card>
//               :
//                 <div onClick={this.editRichText.bind(this)} className={styled.richTextPlaceholder}>发布消息</div>
//             }
//             {/* 主体内容 */}
//             <div className={styled.content}>
//               <div className={styled.filterBox}>
//                 <span className={styled.searchBox}>
//                   <Icon onClick={() => this.searchboxState.bind(this)('show')} type="search" className={styled.search} />
//                   <span ref={(input) => this.searchInputBox = input} className={styled.beginSearch}>
//                     <label>
//                       <Icon type="search" onClick={() => this.searchboxState.bind(this)('none')} className={styled.search} />
//                       <Input ref={(input) => this.searchInput = input} type="text" placeholder="请输入摘要,按回车搜索" name="search" id="success" />
//                       <Icon onClick={() => this.searchboxState.bind(this)('clear')} type="close" className={styled.close} />
//                     </label>
//                   </span>
//                 </span>
//                 <span className={styled.spaceLine}></span>
//                 <Dropdown getPopupContainer={() => document.getElementsByClassName(styled.filterConditionBox)[0]} trigger={['click']} overlay={<Menu>{this.menuOptions(filterList)}</Menu>}>
//                   <p className={styled.filterConditionBox}>
//                     <span className={styled.fixationCondition}>显示</span>
//                     <span className={styled.classes}>类别</span>
//                     <Icon type="down" />
//                   </p>
//                 </Dropdown>
//               </div>
//               <section>
//                 {
//                   this.messageOption([1,1,1,1,1,1,1,1,1,1,1,1,1])
//                 }
//               </section>
//             </div>
//           </div>
//           <div className={styled.NCharBox}>
//             NChar
//             <Card bordered={false}>
//               <p>Card content</p>
//               <p>Card content</p>
//               <p>Card content</p>
//             </Card>
//           </div>
//         </div>
//       </MainLayout>
//     )
//   }
// }

// export default connect(({ home }) => ({ home}))(Home)
import React from 'react'
import EXIF from 'exif-js'
// import Figure from 'components/DataEntry/Figure/'
// import Toast from 'components/Feedback/Toast/'
import './uploader.less'

// 统计img总数 防止重复
let imgNumber = 0;

// 生成唯一的id
const getUuid = () => {
    return 'img-' + new Date().getTime() + '-' + imgNumber++;
};

// 内置的一个获取图片key的format方法
const getImgKey = (item) => (item.imgKey);

class Uploader extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            imgArray: [] // 图片已上传 显示的数组
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleReUpload = this.handleReUpload.bind(this);
        this.compress = this.compress.bind(this);
        this.processData = this.processData.bind(this);
    }
    componentDidMount () {
        // 判断是否有初始化的数据传入
        const {data} = this.props;

        if(data && data.length > 0){
            this.setState({imgArray: data});
        }
    }
    componentWillUnmount () {
        this._isMounted = true;
    }
    handleReUpload (id) {
        // 根据id重新上传
        const {imgArray} = this.state;

        const errorItem = imgArray.filter((item)=>{
            if(item.id === id) return true;
        })[0];

        // set新的state
        errorItem.status = 1;
        this.setState({imgArray});

        // 检查是否是ios ios图片使用canvas压缩之后图片size为0 原因未知
        // 解决办法更改服务端使用base64上传图片
        let canCompress = true;
        // ios
        if(!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            canCompress = false;
        }

        if(canCompress){
            this.compress(errorItem, this.processData);
        } else {
            this.processFormDataForIos(errorItem);
        }
    }
    handleDelete(id) {
        this.setState((previousState)=>{
            previousState.imgArray = previousState.imgArray.filter((item)=>(item.id !== id));
            return previousState;
        });
    }
    handleProgress (id, e) {
        // 监听上传进度 操作DOM 显示进度
        const number = Number.parseInt((e.loaded / e.total) * 100) + '%';
        const text = document.querySelector('#text-'+id);

        if(text) text.innerHTML = number;
    }
    handleUploadEnd (data, response, status) {
        // 隐藏进度
        const text = document.querySelector('#text-'+ data.uuid);
        if(text) text.innerHTML = '';

        // 处理页面卸载的情况
        if(this._isMounted) return;

        // 准备一条标准数据
        const _this = this;
        const obj = {
            id: data.uuid,
            uuid: data.uuid,
            imgKey: response ? response.data.key : '',
            imgUrl: '',
            name: data.file.name,
            dataUrl: data.dataUrl,
            compressedDataUrl: data.compressedDataUrl,
            blob: data.blob,
            file: data.file,
            formData: data.formData,
            status: status
        };

        // 更改状态
        this.setState((previousState)=>{
            previousState.imgArray = previousState.imgArray.map((item)=>{
                if(item.id === data.uuid){
                    item = obj;
                }

                return item;
            });
            return previousState;
        });

        // 上传下一个
        const nextUpload = this.uploadGen.next();
        if(!nextUpload.done){

            // 检查是否是ios ios图片使用canvas压缩之后图片size为0 原因未知
            // 解决办法更改服务端使用base64上传图片
            let canCompress = true;
            // ios
            if(!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
                canCompress = false;
            }

            nextUpload.value.map((item)=>{
                if(canCompress){
                    _this.compress(item, _this.processData);
                } else {
                    _this.processFormDataForIos(item);
                }
            });
        }
    }
    handleInputChange (event) {
        const {typeArray, max, maxSize} = this.props;
        const {imgArray} = this.state;
        const _this = this;
        const uploadedImgArray = []; // 真正在页面显示的图片数组
        const uploadQueue = []; // 图片上传队列 这个队列是在图片选中到上传之间使用的 上传完成则清除

        // event.target.files是个类数组对象 需要转成数组方便处理
        const selectedFiles = Array.prototype.slice.call(event.target.files).map((item)=>(item));

        // 检查文件个数 页面显示的图片个数不能超过限制
        if(imgArray.length + selectedFiles.length > max){
            // Toast.error('最多只能选择'+max+'张图片', 2000, undefined, false);
            // 清空input
            this.refs.input.value = null;
            return;
        }

        let imgPass = {typeError: false, sizeError: false};

        // 循环遍历检查图片 类型、尺寸检查
        selectedFiles.map((item)=>{
            // 图片类型检查
            if(typeArray.indexOf(item.type.split('/')[1]) === -1){
                imgPass.typeError = true;
            }
            // 图片尺寸检查
            if(item.size > maxSize * 1024){
                imgPass.sizeError = true;
            }

            // 为图片加上位移id
            const uuid = getUuid();
            // 页面显示加入数据
            this.transformFileToDataUrl(item, (data, orientation = 1)=>{
                // 上传队列加入该数据
                uploadQueue.push({uuid: uuid, file: item, dataUrl: data, orientation: orientation});

                uploadedImgArray.push({ // 显示在页面的数据的标准格式
                    id: uuid, // 图片唯一id
                    dataUrl: data, // 图片的base64编码
                    imgKey: '', // 图片的key 后端上传保存使用
                    imgUrl: '', // 图片真实路径 后端返回的
                    name: item.name, // 图片的名字
                    orientation: orientation, // 图片旋转
                    status: 1 // status表示这张图片的状态 1：上传中，2上传成功，3：上传失败
                });
            });
        });

        // 有错误跳出
        if(imgPass.typeError){
            // Toast.error('不支持文件类型', 2000, undefined, false);
            this.refs.input.value = null;
            return;
        }

        if(imgPass.sizeError){
            // Toast.error('文件大小超过限制', 2000, undefined, false);
            this.refs.input.value = null;
            return;
        }

        // 检查是否是ios ios图片使用canvas压缩之后图片size为0 原因未知
        let canCompress = true;
        // ios
        if(!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            canCompress = false;
        }

        const timer = setInterval(function () {
            if(uploadedImgArray.length === selectedFiles.length){
                clearInterval(timer);

                // 没错误准备上传
                // 页面先显示一共上传图片个数
                _this.setState({imgArray: imgArray.concat(uploadedImgArray)});

                // 通过该函数获取每次要上传的数组
                _this.uploadGen = _this.uploadGenerator(uploadQueue);
                // 第一次要上传的数量
                const firstUpload = _this.uploadGen.next();
                // 清空input
                _this.refs.input.value = null;

                // 真正开始上传流程
                firstUpload.value.map((item)=>{
                    /**
                     * 图片上传分成5步
                     * 图片转dataUrl
                     * 压缩
                     * 处理数据格式
                     * 准备数据上传
                     * 上传
                     *
                     * 前两步是回调的形式 后面是同步的形式
                     */
                    if(canCompress){
                        _this.compress(item, _this.processData);
                    } else {
                        _this.processFormDataForIos(item);
                    }
                });
            }
        }, 20);
    }
    *uploadGenerator (uploadQueue) {
        /**
         * 多张图片并发上传控制规则
         * 上传1-max数量的图片
         * 设置一个最大上传数量
         * 保证最大只有这个数量的上传请求
         *
         */
            // 最多只有三个请求在上传
        const {maxUploadSize} = this.props;

        if(uploadQueue.length > maxUploadSize){

            const result = [];

            for(let i = 0; i < uploadQueue.length; i++){
                // 第一次return maxUploadSize数量的图片
                if(i < maxUploadSize){
                    result.push(uploadQueue[i]);

                    if(i === maxUploadSize - 1){
                        yield result;
                    }
                } else {
                    yield [uploadQueue[i]];
                }
            }

        } else {
            yield uploadQueue.map((item)=>(item));
        }
    }
    transformFileToDataUrl (file, callback) {
        /**
         * 图片上传流程的第一步
         * @param data file文件
         */
        let orientation;

        // 封装好的函数
        const reader = new FileReader();

        // ⚠️ 这是个回调过程 不是同步的
        reader.onload = function(e) {
            const result = e.target.result;

            EXIF.getData(file, function() {
                EXIF.getAllTags(this);
                orientation = EXIF.getTag(this, 'Orientation');
                callback(result, orientation);
            });

        };

        reader.readAsDataURL(file);
    }
    compress (data, callback) {
        /**
         * 压缩图片
         * @param data file文件 数据会一直向下传递
         * @param callback 下一步回调
         */
        const {compressionRatio, compress} = this.props;
        const imgCompassMaxSize = 200 * 1024; // 超过 200k 就压缩
        const imgFile = data.file;
        const orientation = data.orientation;
        const img = new window.Image();

        img.src = data.dataUrl;

        img.onload = function () {

            let drawWidth, drawHeight, width, height;

            drawWidth = this.naturalWidth;
            drawHeight = this.naturalHeight;

            // 改变一下图片大小
            let maxSide = Math.max(drawWidth, drawHeight);

            if (maxSide > 1024) {
                let minSide = Math.min(drawWidth, drawHeight);
                minSide = minSide / maxSide * 1024;
                maxSide = 1024;
                if (drawWidth > drawHeight) {
                    drawWidth = maxSide;
                    drawHeight = minSide;
                } else {
                    drawWidth = minSide;
                    drawHeight = maxSide;
                }
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = width = drawWidth;
            canvas.height = height = drawHeight;
            // 判断图片方向，重置 canvas 大小，确定旋转角度，iphone 默认的是 home 键在右方的横屏拍摄方式
            switch (orientation) {
                // 1 不需要旋转
                case 1: {
                    ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
                    ctx.clearRect(0, 0, width, height);
                    ctx.drawImage(img, 0, 0, width, height);
                    break;
                }
                // iphone 横屏拍摄，此时 home 键在左侧 旋转180度
                case 3: {
                    ctx.clearRect(0, 0, width, height);
                    ctx.translate(0, 0);
                    ctx.rotate(Math.PI);
                    ctx.drawImage(img, -width, -height, width, height);
                    break;
                }
                // iphone 竖屏拍摄，此时 home 键在下方(正常拿手机的方向) 旋转90度
                case 6: {
                    canvas.width = height;
                    canvas.height = width;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.translate(0, 0);
                    ctx.rotate(90 * Math.PI / 180);
                    ctx.drawImage(img, 0, -height, width, height);
                    break;
                }
                // iphone 竖屏拍摄，此时 home 键在上方 旋转270度
                case 8: {
                    canvas.width = height;
                    canvas.height = width;
                    ctx.clearRect(0, 0, width, height);
                    ctx.translate(0, 0);
                    ctx.rotate(-90 * Math.PI / 180);
                    ctx.drawImage(img, -width, 0, width, height);
                    break;
                }
                default: {
                    ctx.clearRect(0, 0, width, height);
                    ctx.drawImage(img, 0, 0, width, height);
                    break;
                }
            }

            let compressedDataUrl;

            if(compress && imgFile.length > imgCompassMaxSize){
                compressedDataUrl = canvas.toDataURL(imgFile.type, (compressionRatio / 100));
            } else {
                compressedDataUrl = canvas.toDataURL(imgFile.type, 1);
            }

            data.compressedDataUrl = compressedDataUrl;

            callback(data);
        }
    }
    processData (data) {
        // 为了兼容性 处理数据
        const dataURL = data.compressedDataUrl;
        const imgFile = data.file;
        const binaryString = window.atob(dataURL.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const intArray = new Uint8Array(arrayBuffer);

        for (let i = 0, j = binaryString.length; i < j; i++) {
            intArray[i] = binaryString.charCodeAt(i);
        }

        const fileData = [intArray];

        let blob;

        try {
            blob = new Blob(fileData, { type: imgFile.type });
        } catch (error) {
            window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;
            if (error.name === 'TypeError' && window.BlobBuilder){
                const builder = new window.BlobBuilder();
                builder.append(arrayBuffer);
                blob = builder.getBlob(imgFile.type);
            } else {
                throw new Error('版本过低，不支持上传图片');
            }
        }

        // blob 转file
        const fileOfBlob = new File([blob], imgFile.name);
        data.blob = fileOfBlob;

        this.processFormData(data);
    }
    processFormData (data) {
        // 准备上传数据
        const formData = new FormData();
        const imgFile = data.file;
        const blob = data.blob;

        // type
        formData.append('type', imgFile.type);
        // size
        formData.append('size', blob.size);
        // name
        formData.append('name', imgFile.name);
        // lastModifiedDate
        formData.append('lastModifiedDate', imgFile.lastModifiedDate);
        // append 文件
        formData.append('file', blob);

        data.formData = formData;

        this.uploadImg(data);
    }
    processFormDataForIos(data){
        const formData = new FormData();
        const imgFile = data.file;

        // type
        formData.append('type', imgFile.type || 'image/jpeg"');
        // size
        formData.append('size', imgFile.size);
        // name
        formData.append('name', imgFile.name);
        // lastModifiedDate
        formData.append('lastModifiedDate', imgFile.lastModifiedDate);
        // append 文件
        formData.append('file', imgFile);

        data.formData = formData;

        this.uploadImg(data);
    }
    uploadImg (data) {
        // 开始发送请求上传
        const _this = this;
        const xhr = new XMLHttpRequest();
        console.log(this.props)
        const {uploadUrl} = this.props;
        const formData = data.formData;

        // 进度监听
        xhr.upload.addEventListener('progress', _this.handleProgress.bind(_this, data.uuid), false);
        // xhr.addEventListener("error", _this.handleUploadEnd(data, undefined, 3), false);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                // 根据接口返回不同 处理请求数据不同
                // 一般来说 后端会返回给你图片的key 提交的时候，也要提交key
                // const result = JSON.parse(xhr.responseText);
                const result = {
                    status: 'ok',
                    code: 200,
                    data: {
                        url: '',
                        key: 'imgKey'
                    }
                };

                if (xhr.status === 200 || xhr.status === 201) {
                    // 上传成功
                    _this.handleUploadEnd(data, result, 2);
                } else {
                    // 上传失败
                    _this.handleUploadEnd(data, undefined, 3);
                }
            }
        };

        xhr.open('POST', uploadUrl , true);
        xhr.send(formData);
    }
    getImgArray (format = getImgKey) {
        // 获取图片数据，供使用者调用
        const {imgArray} = this.state;

        return imgArray.map(format);
    }
    getUploadStatus () {
        // 获取目前上传状态
        // 1 全部上传成功 2 有图片正在上传 3 有图片上传失败
        const {imgArray} = this.state;
        let uploadingArray = 0;
        let errorArray = 0;

        imgArray.map((item)=>{
            switch (item.status) {
                case 1: {
                    uploadingArray++;
                    break;
                }
                case 3: {
                    errorArray++;
                    break;
                }
                default:
                    break;
            }
        });

        return (uploadingArray || errorArray) > 0 ? errorArray > 0 ? 3 : 2 : 1 ;
    }
    getImagesListDOM () {
        // 处理显示图片的DOM
        const {max, labelName, prefixCls} = this.props;
        const _this = this;
        const result = [];
        const uploadingArray = [];
        const imgArray = this.state.imgArray;

        imgArray.map((item)=>{
            result.push(
                <Figure
                    key={item.id} {...item}
                    onDelete={_this.handleDelete}
                    onError={_this.handleReUpload}
                />
            );

            // 正在上传的图片
            if(item.status === 1){
                uploadingArray.push(item);
            }
        });

        // 图片数量达到最大值
        if(result.length >= max ) return result;

        let onPress = ()=>{_this.refs.input.click();};

        // 简单的显示文案逻辑判断
        let text = labelName;

        if(imgArray.length > 0){
            // 上传成功 / 上传总数
            text = (imgArray.filter((item)=>{if(item.status === 2) return true}).length) + '/' + imgArray.length;
        }

        result.push(
            <div key="button" className={`${prefixCls}-button`} onClick={onPress}>
                <span key="icon" className="fa fa-camera" />
                <p className="text">{text}</p>
            </div>
        );

        return result;
    }
    render () {
        const {prefixCls} = this.props;
        const imagesList = this.getImagesListDOM();

        return (
            <div className={prefixCls}>
                {imagesList}
                <input
                    ref="input" type="file"
                    className="file-input" name="image"
                    accept="image/*" multiple="multiple"
                    onChange={this.handleInputChange}
                />
            </div>
        )
    }
}

Uploader.propTypes = {
    prefixCls: React.PropTypes.string, // class前缀
    compress: React.PropTypes.bool, // 是否进行图片压缩
    compressionRatio: React.PropTypes.number, // 图片压缩比例 单位：%
    data: React.PropTypes.array, // 初始化数据 其中的每个元素必须是标准化数据格式
    max: React.PropTypes.number, // 最大上传图片数
    maxSize: React.PropTypes.number, // 图片最大体积 单位：KB
    maxUploadSize: React.PropTypes.number, // 最大同时上传数目
    typeArray: React.PropTypes.array, // 支持图片类型数组
    labelName: React.PropTypes.string, // 上传图片按钮提示文案
};

Uploader.defaultProps = {
    prefixCls: 'zby-uploader',
    compress: true,
    compressionRatio: 20,
    data: [],
    max: 9,
    maxSize: 10 * 1024, // 10MB
    maxUploadSize: 3,
    typeArray: ['jpeg', 'jpg', 'png', 'gif'],
    labelName: '上传图片'
};

export default Uploader