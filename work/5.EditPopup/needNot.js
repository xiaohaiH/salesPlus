// /* 获取编辑页面中某个字段的值作为 url 参数传入弹出框 */
// $('.relatedPopup').off();
// $(document).ready(function() {
//   $('.relatedPopup').off();
//   $('.relatedPopup').off().on('mousedown', function(e) {
//     if (!e) e = window.event;
//     e.preventDefault();
//     /* 错误气泡 */
//     /* 获取 url 路径 start */
//     var sourceModule = app.getModuleName();
//     var popupReferenceModule = $('input[name="popupReferenceModule"]').val();
//     var sourceFieldElement = $('input[class="sourceField"]');
//     var sourceField = sourceFieldElement.attr('name');
//     var sourceRecordElement = $('input[name="record"]');
//     var sourceRecordId = '';
//     if (sourceRecordElement.length > 0) {
//       sourceRecordId = sourceRecordElement.val();
//     };
//     var url = {
//         'module': popupReferenceModule,
//         'src_module': sourceModule,
//         'src_field': sourceField,
//         'src_record': sourceRecordId,
//         'view': 'Popup',
//         // 'triggerEventName': 'postSelection5316',
//         // 'selectedModuleId': ''
//       }
//       /* 获取 url 路径 end */


//     /* 获取所需要的参数 start */
//     var title = $('input[name="title"]');
//     var lastname = $('input[name="lastname"]');
//     var department = $('input[name="department"]');
//     /* 未填写参数时给予提示 start */
//     console.log(title, lastname, department);
//     if (!title.val()) {
//       var error = app.vtranslate('JS_GLOBAL_SEARCH_KEY_NULL');
//       title.validationEngine('showPrompt', error, '', "topLeft", true);
//       return false
//     };
//     if (!lastname.val()) {
//       var error = app.vtranslate('JS_GLOBAL_SEARCH_KEY_NULL');
//       lastname.validationEngine('showPrompt', error, '', "topLeft", true);
//       return false
//     };
//     if (!department.val()) {
//       var error = app.vtranslate('JS_GLOBAL_SEARCH_KEY_NULL');
//       department.validationEngine('showPrompt', error, '', "topLeft", true);
//       return false
//     };
//     /* 未填写参数时给予提示 end */
//     url['title'] = title.val();
//     url['lastname'] = lastname.val();
//     url['department'] = department.val();
//     /* 获取所需要的参数 end */
//     var params = 'index.php?' + $.param(url);
//     /* url 进行加密处理 */
//     console.log(params);
//     app.encode(params, function(res) {
//       window.open(res, 'windowName', 'width=900,height=650,resizable=0,scrollbars=1')
//     })
//   })
// })
