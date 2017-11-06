/* 设置初始经纬度,定位失败后的使用的经纬度,位置是 长沙市佳天国际南栋 */
var point = {
  lng: 112.992549,
  lat: 28.179251
};
var geoc = new BMap.Geocoder();
var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(e) {
  /* 定位成功以后 */
  if (this.getStatus() === BMAP_STATUS_SUCCESS) {
    /*alert('定位成功');*/
    var map = new MapExp('mapShow', e.point);
    map.showInfo({
      message: '定位成功',
      hintType: 'success'
    });
  } else {
    /*alert('定位失败,请重试');*/
    var map = new MapExp('mapShow', point);
    map.showInfo({
      message: '定位失败,请重试',
      hintType: 'error'
    });
  }
});

function MapExp(mapShow, {
  lng = point.lng,
  lat = point.lat
}) {
  /* 基础配置 */
  this.longitudeInput = $('input[name="longitude_c"]'); /* 经度 Input */
  this.latitudeInput = $('input[name="latitude_c"]'); /* 纬度 Input */
  this.rangeInput = $('input[name="range_c"]'); /* 半径 Input */
  this.addressInput = $('textarea[name="address_c"]'); /* 考勤地点 Input */
  this.map = new BMap.Map(mapShow);
  this.point = new BMap.Point(lng, lat);
  this.map.centerAndZoom(this.point, 18);
  this.map.enableScrollWheelZoom(true);
  this.map.addControl(new BMap.NavigationControl());
  this.map.addControl(new BMap.GeolocationControl());
  /* 初始化清空所有覆盖物 */
  this.delMarker();
  /* 添加各种选项 */
  /* 遮盖物的拖拽事件 */
  var markerDragFn = ({
    lng,
    lat
  }) => {
    this.draging({
      lng,
      lat
    })
  };
  /* 添加考勤地点的事件 */
  var rightHandleFn = ({
    lng,
    lat
  }) => {
    var markerNum = this.map.getOverlays();
    var scope = parseInt(this.rangeInput.val() && this.rangeInput.val().trim());
    var self = this;
    for (var i = 0; i < markerNum.length; i++) {
      if (markerNum[i].getLabel && markerNum[i].getLabel() && markerNum[i].getLabel().content === '已设为考勤地点') {

        /*alert('您已经设置了考勤地点');*/
        this.showModal({
            okFn(e) {
              if (isNaN(scope)) {
                self.redraw({
                  lng,
                  lat,
                  forbidden: false,
                  markerDragFn,
                  type: 'marker'
                });
                self.showInfo({
                  message: '半径输入的数值有误,请重新输入',
                  hintType: 'error',
                });
              } else {
                self.redraw({
                  lng,
                  lat,
                  forbidden: false,
                  markerDragFn,
                  type: 'all'
                })
              }
            },
            cancelFn() {
              var formerLng = markerNum[i].point.lng;
              var formerLat = markerNum[i].point.lat;
              self.map.panTo(new BMap.Point(formerLng, formerLat));
            }
          })
          /* this.showInfo({
             message: '您已经设置了考勤地点',
             hintType: 'info'
           });
           var formerLng = markerNum[i].point.lng;
           var formerLat = markerNum[i].point.lat;
           this.map.panTo(new BMap.Point(formerLng, formerLat));*/
        return false
      }
    };
    if (isNaN(scope)) {
      this.redraw({
        lng,
        lat,
        forbidden: false,
        markerDragFn,
        type: 'marker'
      });
      this.showInfo({
        message: '半径输入的数值有误,请重新输入',
        hintType: 'error',
      });
    } else {
      this.redraw({
        lng,
        lat,
        forbidden: false,
        markerDragFn,
        type: 'all'
      })
    }
  };
  this.addMenu([{
    text: '设置为考勤地点',
    rightHandleFn
  }]);
  /* 判断页面初始化时经纬度是否有值,无值则显示当前位置 start */
  var forgotLng = Number(this.longitudeInput.val()) && Number(this.longitudeInput.val()).toFixed(6);
  var forgotLat = Number(this.latitudeInput.val()) && Number(this.latitudeInput.val()).toFixed(6);
  var forgotScope = Number(this.rangeInput.val()) && Number(this.rangeInput.val()).toFixed(2);
  if (isNaN(forgotLng) || isNaN(forgotLat) || isNaN(forgotScope) || !forgotLng || !forgotLat) {
    this.showInfo({
      message: '输入的数值有误,请重新输入',
      hintType: 'error',
    });
    this.addMarker({
      lng,
      lat,
      animate: true,
      text: '当前所在位置'
    });
    this.map.panTo(new BMap.Point(lng, lat));
  } else {
    this.redraw({
      lng: forgotLng,
      lat: forgotLat,
      radius: forgotScope,
      type: 'all'
    });
    this.map.panTo(new BMap.Point(forgotLng, forgotLat));
  }
  /* 判断页面初始化时经纬度是否有值,无值则显示当前位置 end */
  /*  if (forgotLng && forgotLat && forgotScope) {
      this.redraw({
        lng: forgotLng,
        lat: forgotLat,
        radius: forgotScope,
        type: 'all'
      });
      this.map.panTo(new BMap.Point(forgotLng, forgotLat));
    } else if (forgotLng && forgotLat) {
      this.redraw({
        lng: forgotLng,
        lat: forgotLat,
        type: 'marker'
      });
      this.map.panTo(new BMap.Point(forgotLng, forgotLat));
    } else {
      this.addMarker({
        lng,
        lat,
        animate: true,
        text: '当前所在位置'
      });
      this.map.panTo(new BMap.Point(lng, lat));
    };*/
  /**
   * 初始化 js 事件
   **/
  this.Event();
};
MapExp.prototype = {
  /* 报错事件 */
  error(text = '输入的参数有误,请重试') {
    throw new Error(text)
  },
  /* 提示信息 @message: 提示语, @hintType: 提示的类型, @type: 元素展示或者浏览器右上方展示(默认后者), @ele: 元素展示的类名 */
  showInfo({
    message = '参数有误,请重新输入',
    hintType = 'error',
    type = 'body',
    ele
  }) {
    if (type === 'body') {
      var params = {
        text: message,
        type: hintType
      };
      snow_Helper_Js.showMessage(params);
      return
    };
    var element = $(ele);
    var error = app.vtranslate(message);
    element.validationEngine('showPrompt', error, '', "topLeft", true);
  },
  /* 模态框 */
  showModal({
    message = '您已经设置了考勤地点,是否删除该考勤地点并重新创建',
    okFn,
    cancelFn
  }) {
    snow_Helper_Js.showConfirmationBox({
      'message': message
    }).then(
      function(e) {
        typeof okFn === 'function' && okFn.call(this, e);
      },
      function(error, err) {
        typeof cancelFn === 'function' && cancelFn.call(this, error, err);
      }
    );
  },
  /* js 事件 */
  Event() {
    /* 半径 */
    this.rangeInput.on('change', (e) => {
      e.preventDefault();
      var scope = Number($(e.target).val()) && Number($(e.target).val()).toFixed(2);
      var markerNum = this.map.getOverlays();
      for (var i = 0; i < markerNum.length; i++) {
        if (markerNum[i].getLabel && markerNum[i].getLabel() && markerNum[i].getLabel().content === '已设为考勤地点') {
          var {
            lng,
            lat
          } = markerNum[i].point;
          if (!isNaN(scope)) {
            this.redraw({
              lng,
              lat,
              type: 'all',
              radius: scope
            });
            this.map.panTo(new BMap.Point(lng, lat))
          } else {
            this.showInfo({
              message: '半径输入的数值有误,请重新输入',
              hintType: 'error',
            });
          }
        }
      }
    });
    /* 经纬度 */
    $(this.longitudeInput.selector + ' ,' + this.latitudeInput.selector).on('change', e => {
      e.preventDefault();
      var lng = Number(this.longitudeInput.val()) && Number(this.longitudeInput.val()).toFixed(6);
      var lat = Number(this.latitudeInput.val()) && Number(this.latitudeInput.val()).toFixed(6);
      var radius = Number(this.rangeInput.val()) && Number(this.rangeInput.val()).toFixed(2);
      var markerNum = this.map.getOverlays();
      if (lng && lat) {
        var flag = false;
        for (var i = 0; i < markerNum.length; i++) {
          if (radius || (markerNum[i].V && markerNum[i].V.tagName === 'path')) {
            flag = true;
            break
          }
        };
        if (flag) {
          this.redraw({
            lng,
            lat,
            type: 'all',
            radius
          })
        } else {
          this.redraw({
            lng,
            lat,
            type: 'marker'
          })
        };
        this.map.panTo(new BMap.Point(lng, lat))
      } else {
        this.showInfo({
          message: '经纬度输入的数值有误,请重新输入',
          hintType: 'error',
        });
      }
    });
    /* 搜索考勤地点 */
    this.addressInput.on('keypress', e => {
      e.preventDefault();
      if (e.keyCode === 13) {
        var value = $(e.target).val().trim();
        value && this.searchPlace({
          value
        })
      }
    });
    /* 搜索地点结果面板 */
    $('.searchTitle').on('click', e => {
      var triangle = $(e.target).find('i');
      var resultPanel = $('#searchResult');
      if (triangle.is(':animated') || resultPanel.is(':animated')) return;
      var flag = triangle.data('falg') || triangle.attr('data-flag');
      if (flag === 'on') {
        triangle.css('transform', 'rotate(180deg)').data('flag', 'off').attr('data-flag', 'off')
      } else {
        triangle.css('transform', 'rotate(360deg)').data('flag', 'on').attr('data-flag', 'on')
      };
      resultPanel.slideToggle(500);
    })
  },
  /**
   * 改变坐标点时重新给 input 赋值
   **/
  changePoint({
    lng,
    lat
  }) {
    this.longitudeInput.val(lng);
    this.latitudeInput.val(lat);
  },
  /* @{}: 经纬度, @fn: 回调, @forbidden: 标注是否允许拖拽,默认禁用, @animate: 标注物是否有弹跳动画,默认禁用, @text: 标注物提示语,设为 none 可不添加提示语 */
  addMarker({
    lng,
    lat,
    markerDragFn,
    forbidden = true,
    animate = false,
    text = '已设为考勤地点'
  } = {}) {
    var point = new BMap.Point(lng, lat);
    var marker = new BMap.Marker(point);
    this.map.addOverlay(marker);
    forbidden || marker.enableDragging();
    animate && marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    marker.addEventListener('dragend', e => {
      markerDragFn && markerDragFn.call(this, e.point)
    });
    /* 标志物有动画时向上的偏移量增高 */
    var offsetX = animate ? -35 : -30;
    var offsetY = animate ? -45 : -20;
    if (text === 'none') return;
    var label = new BMap.Label(text, {
      offset: new BMap.Size(offsetX, offsetY)
    });
    marker.setLabel(label);
    return marker
  },
  /* 清除所有覆盖物 @markerName: 删除的标记名字 */
  delMarker() {
    this.map.clearOverlays();
  },
  /**
   * 创建右键菜单
   * list: [{ "text": "菜单值", "fn": "菜单的回调值" }]
   **/
  addMenu(list = []) {
    if (!(list instanceof Array)) {
      console.error('%c 参数应为数组', 'color: red');
    }
    var menu = new BMap.ContextMenu();
    list.map(item => menu.addItem(new BMap.MenuItem(item.text, item.rightHandleFn)));
    this.map.addContextMenu(menu);
  },
  /**
   * 创建圆 @lng,lat: 经纬度, @redius: 圆的半径,默认50米
   **/
  addCircle({
    lng = this.error(),
    lat = this.error(),
    radius = 50,
    circleFn
  }) {
    var point = new BMap.Point(lng, lat);
    var circle = new BMap.Circle(point, radius, {
      strokeColor: 'red',
      strokeWeight: 1,
      storkeOpacity: '.5'
    });
    this.map.addOverlay(circle);
    (typeof circleFn === 'function') && circleFn();
    return circle
  },
  /**
   * 重绘考勤地点 @lng,lat: 经纬度, @radius: 半径, @type: 重绘的类型 path->圆形半径 marker->标注物 all-> 两者皆有(默认 path ), @circleFn: 圆形回调, @markerDragFn: 标记物回调
   **/
  redraw({
    lng = this.error(),
    lat = this.error(),
    radius = 50,
    type = 'path',
    circleFn,
    markerDragFn = this.draging
  }) {
    this.delMarker();
    if (type === 'path') {
      this.addCircle({
        lng,
        lat,
        radius,
        circleFn
      })
    } else if (type === 'marker') {
      this.changePoint({
        lng,
        lat
      });
      this.addMarker({
        lng,
        lat,
        forbidden: false,
        markerDragFn
      })
    } else {
      this.changePoint({
        lng,
        lat
      });
      this.addCircle({
        lng,
        lat,
        radius,
        circleFn
      });
      this.addMarker({
        lng,
        lat,
        forbidden: false,
        markerDragFn
      })
    }
  },
  /**
   * 拖动标记时同时改变圆和标记物的中心点
   **/
  draging({
    lng,
    lat
  }) {
    var markerNum = this.map.getOverlays();
    this.changePoint({
      lng,
      lat
    });
    for (var i = 0; i < markerNum.length; i++) {
      if (markerNum[i].V && markerNum[i].V.tagName === 'path') {
        this.redraw({
          lng,
          lat,
          type: 'all',
          radius: markerNum[i].xa
        })
      }
    };
    return this
  },
  /**
   * 搜索地址定位
   **/
  searchPlace({
    value
  }) {
    var local = new BMap.LocalSearch(this.map, {
      renderOptions: {
        map: this.map,
        panel: 'searchResult'
      }
    });
    // this.map.clearOverlays()
    // console.log(value);
    // alert(123);
    local.search(value);
  }
}