<link rel="stylesheet" href="chatter/Public/chatter/bootstrap/css/bootstrap.css">
<link rel="stylesheet" href="layouts/vlayout/modules/AppStore/resources/style/index.css">
<link rel="stylesheet" href="chatter/Public/chatter/fontawesome/css/font-awesome.min.css">
<!--主体-->
  <div class="main">
  	<input type="hidden" value="" name="storageUrl">
  	<input type="hidden" value="" name="pageUrl">
  	<input type="hidden" value="" name="detailsUrl">
    <div class="container-fluid">
      <div class="row-fluid widget_header">
        <div class="span8">
          <h3>应用商店</h3>
        </div>
        <div class="span4">

        </div>
      </div>
      <hr style="visibility:hidden;margin-bottom:0px;">
        {*<div class="row">
            <h3>应用商店</h3>
            <hr>
        </div>*}
      <div class="row">
        <div class="main container-fuild clearfix appStoreBox">
          <!-- 左侧导航栏 -->
          <div class=" row">
              <div class="leftAside col-xs-2 col-sm-2 col-md-2 col-lg-2">
                  <ul></ul>
              </div>
              <!-- 右侧主体内容 -->
              <div class="rightContent col-xs-10 col-sm-10 col-md-10 col-lg-10">
              	<div class="mainTitleNav">
              		<h3>所有应用</h3>
              		<div>
	              		<p>
	              			<input type="text" name="searchApp" placeholder="请输入关键词,按回车键搜索" >
	              			<span id="searchAppBtn" class="add-on search-icon">
	              				<i class="fa fa-search "></i>
	              			</span>
	              		</p>
              		</div>
              	</div>
              	<div class="applicationListBox"></div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<script type="text/javascript">
	function AppStore(){
		this.initEvent()
	};
	AppStore.prototype = {
		/* 初始化需要请求的链接 */
		leftListUrl: 'http://192.168.33.10:8020/?module=AppStore&parent=Settings&view=Settings&interface=get_categorys',
		rightListUrl: 'http://192.168.33.10:8020/?module=AppStore&parent=Settings&view=Settings&interface=get_list',
		pageUrl: 'http://192.168.33.10:8020/?module=AppStore&parent=Settings&view=Settings&interface=get_list',
		productDetailUrl: 'http://192.168.33.10:8020/?module=AppStore&parent=Settings&view=Settings&interface=get_product_details',
		$body: $('body'),
		/**
		 * 封装请求的函数
		**/
		packageingPost: function(url, params, fn){
			$.ajax({
	      url: url,
	      data: params,
	      type: 'POST',
	      success: function(data) {
	        var getData = JSON.parse(data);
	        fn && fn(getData);
	      },
	      error: function(one, two) {
	        console.log(one, two)
	      	fn && fn('error');
	      }
	    });
		},
		/**
		 * 出场动画的开始和结束
		**/
		waitAnimateBegin: function(ele){
			!ele && (ele = this.$body.find('.appStoreBox'));
	    this.waitAnimate = jQuery('<div></div>');
	    this.waitAnimate.progressIndicator({
	      "position": ":html",
	      "blockInfo": {
	        "enabled": true,
	        "elementToBlock": ele
	      }
	    })
		},
		waitAnimateFinish: function(){
    	this.waitAnimate.progressIndicator({ "mode": "hide" });
		},
		/**
		 * 生成左侧列表
		**/
		leftAside: function(obj){
			var $leftAside = $('.leftAside').find('ul');
			/* 遍历生成列表 start */
	    $.each(obj, function(i, data) {
	      var c = data.content.length == 1 && data.content[0].val == data.title;
	      var $li = $('<li></li>').addClass('clearfix').appendTo($leftAside);
	      $li.append('<p />').find('p').append('<span />').attr({ 'class': 'clearfix' + (c ? '' : ' topNav'), 'triangle': 'true' }).find('span:eq(0)').attr('class', 'pull-left').html(data.title);
	      /* 确认有子级菜单数据为真的时候在创建三角符号和子级菜单 */
	      if (c) {
	      	/* 给不包含二级导航的一级导航添加的类名,暂时未做 */
	        $li.addClass('gather');
	      } else {
	        $li.addClass('topNavBox').find('p').append('<i />').find('i').addClass('caret');
	        var $ul = $('<ul />').appendTo($li).attr('class', 'clearfix');
	        $.each(data.content, function(index, val) {
	          $('<li class="secNav" data-id="' + val.id + '" data-type="' + val.type + '" ></li>').data('id', val.id).data('type', val.type).appendTo($ul).html(val.val);
	        });
	      };
	    });
			/* 遍历生成列表 end */
	    /* 设置左侧初始被选中值的激活样式 */
	    $leftAside.find('p:eq(0)').addClass('navActive');
		},
		/**
		 * 左侧列表点击事件
		 * { type: 应用的类型, id: 应用的 id }
		**/
		leftEvent: function(){
			var _this = this;
			/* 请求数据事件 start */
			this.$body.on('click','li.gather,li.secNav',function(e){
        if (!e) var e = window.event;
        e.stopPropagation();
        var $this = $(this);
        /* 清除左侧列表的激活样式,给点击的 li 添加激活样式 start */
        $('.navActive').removeClass('navActive');
        $this.prop('className') === 'secNav' ? $this.parent('ul').prev('p').addClass('navActive') : $this.children('p').addClass('navActive');
        /* 清除左侧列表的激活样式,给点击的 li 添加激活样式 end */
        var resUrl = _this.rightListUrl;
        var type = $this.data('type');
        var id = $this.data('id');
        var params = {
          [type]: id,
          id: id,
          start: 1,
          const: 12
        };
        function appList(data) {
       		_this.waitAnimateFinish();
        	if(data === 'error'){
        		console.error(数据获取失败,请重试);
        		return false
        	};
          var rightContent = _this.rightContent(data)
        };
        _this.packageingPost(resUrl, params, appList);
        _this.waitAnimateBegin(_this.$body.find('.appStoreBox'))
			});
			/* 请求数据事件 end */
			/* 列表收缩事件 start */
	    this.$body.on('click', 'p.topNav', function() {
	    	var $this = $(this);
        /* 清除左侧列表的激活样式,给点击的 li 添加激活样式 start */
        $('.navActive').removeClass('navActive');
        $this.addClass('navActive');
        /* 清除左侧列表的激活样式,给点击的 li 添加激活样式 end */
	      /* 设置三角形的旋转 */
	      var c = $this.attr('triangle');
	      c == 'true' ? $this.attr('triangle', 'false').find('i').css({ 'transform': 'rotate(180deg)' }) : $this.attr('triangle', 'true').find('i').css({ 'transform': 'rotate(0deg)' });
	      $this.next().stop(false, false).slideToggle();
	    })
			/* 列表收缩事件 end */
		},
		/**
		 * 生成右侧内容
		**/
		rightContent: function(obj){
			var $rightContent = $('.applicationListBox');
			$rightContent.children('.productBox').remove();
	    /* 应用商品区域 */
	    var $productBox = $('<div />').attr('class', 'clearfix productBox').prependTo($rightContent);
	    if (obj.content.length) {
	      $.each(obj.content, function(index, val) {
	          var $figure = $('<figure data-id="' + val.id + '" data-type="' + val.type + '" />').data('id', val.id).data('type', val.type).addClass('product col-xs-4 col-sm-4 col-md-4 col-lg-3').appendTo($productBox);
	          $figure.append('<img /><figcaption />').children('img:eq(0)').addClass('img-responsive').attr('src', 'http://shop.salesnow.cn/' + val.aplication_icon).next('figcaption').append('<div />').children('div:eq(0)').append('<h3 style="display: inline-block; font-size:14px; font-weight: bold;" /><span />').find('h3').html(val.aplication_name).next('span').html('(使用人数: ' + val.Installation_totals + ')')
	        });
	      var $pageBtn = $('.pageBtn');
	      if($pageBtn.length){
	      	$pageBtn.find('button').attr({ 'data-total': obj.total, 'data-start': obj.start, 'data-const': obj.const })
	      }else{
		      if (obj.total > obj.const * obj.start) {
		      	var button = '<button data-total="' + obj.total + '" data-start="' + obj.start + '" data-const="' + obj.const + '" />';
			      $('<div />').appendTo($rightContent).addClass('pageBtn').append(button,button).find('button:eq(0)').attr('disabled', 'disabled').addClass('btn btn-primary').html('上一页').next('button').addClass('btn btn-primary').html('下一页');
			    }
			  }
	        /**
	         * 这块是后面存在已安装和免费时启用的.
	        **/
	        // $.each(obj.content, function(index, val) {
	        //    /* 获取是否安装与付费 */
	        //    var IsPay = val.Ispay == 1 ? 'charge' : 'free';
	        //    var IsInstall = val.IsInstall == 1 ? 'install' : 'notInstall';
	        //    var IsFufei = val.Ispay == 1 ? '付费' : '免费';
	        //    var IsAnZhuang = val.IsInstall == 1 ? '已安装 <i class="fa fa-check-circle" aria-hidden="true" />' : '未安装';
	        //    var $figure = $('<figure data-id="' + val.id + '" data-type="' + val.type + '" />').addClass('product col-xs-4 col-sm-4 col-md-4 col-lg-3').data('id', val.id).data('type', val.type).appendTo($productBox);
	        //    $figure.append('<img /><figcaption />').children('img:eq(0)').addClass('img-responsive').attr('src', val.aplication_icon).next('figcaption').append('<p /><p />').children('p:eq(1)').html(val.aplication_name).prev('p').append('<span /> <span />').addClass('clearfix').children('span:eq(0)').addClass(IsPay + ' pull-left').html(IsFufei).next('span').addClass(IsInstall + ' pull-right').html(IsAnZhuang);
	        // })
	    } else {
	      $productBox.append('<h3 />').children('h3').html('暂时没有这款应用!');
	    };
		},
		/**
		 * 右侧滑入,点击,翻页等事件
		**/
		rightEvent: function(){
	    var _this = this;
	    /* 产品滑入事件 start */
	    this.$body.on('mouseover', 'figure', function(){
	      var self = this;
	      new Mask({
	        'parent': $('.productBox'),
	        'backgroundColor': '196,196,196,.6',
	        'zIndex': 10,
	        'opacity': .6
	      });
	      $(this).css({
	        'z-index': 11
	      });
	      new Mask({
	        'parent': $(self),
	        'backgroundColor': '0,0,0,.8',
	        'color': 'white',
	        'zIndex': 12,
	        'fn': function() {
	          var that = this;
	          $('<p />').addClass('detailMoreBox').appendTo(that).append('<span /> <i />').find('span').addClass('glyphicon glyphicon-search').attr('aria-hidden', 'true').addClass('detailMore').siblings('i').addClass('glyphicon glyphicon-plus productDetails').attr('aria-hidden', 'true').addClass('detailMore');
	          var c = $('.productDetails');
	          c.on('click', function() {
	            /* 截流,防止查看详情被多次点击 */
	            if ($(that).children('.detailsBox').length) {
	              return false;
	            };
							/* 判断详情 left 是否超出屏幕 */
							function eleLocation(unit1,unit2){
								return $(document)[unit1]() - $(self).offset()[unit2] > $(self)[unit1]() * 2
							};
					    if (eleLocation('width','left')) {
					      var detailsLeft = 'left';
					      var datailsShadow = '0.5rem';
					    } else {
					      var detailsLeft = 'right';
					      var datailsShadow = '-0.5rem';
					    };
					    /* 判断详情 top 是否超出屏幕 */
					    if (eleLocation('height','top')) {
					      var detailsTop = 'top'
					    } else {
					      var detailsTop = 'bottom'
					    };
	            $('<div />').addClass('detailsBox').css({
					      [detailsLeft]: '100%',
					      [detailsTop]: '0',
					      'box-shadow': datailsShadow + ' 0.5rem 20px 1px #919191',
					      'display': 'block'
					    }).fadeIn('normal').appendTo(that);

            	var box = $('.detailsBox');
							_this.waitAnimateBegin(box);
	            var resUrl = _this.productDetailUrl;
	            var params = {
	              p_id: $(self).data('id')
	            };
	            function detailsCallback(data){
	              _this.waitAnimateFinish();
	            	if(data === 'error'){
	                _this.productDetails('', box, '请求失败,请重新请求');
	                return false
	            	};
	              if (data.status === 1) {
	                if (data.data.length < 1) {
	                  _this.productDetails('', box, '没有找到相关数据');
	                } else {
	                  _this.productDetails(data.data[0], box,);
	                };
	              } else {
	                _this.productDetails('', box, '数据请求失败,请重试');
	              }
	            };
	            _this.packageingPost(resUrl,params,detailsCallback);
	          });
	        }
	      });
	    });
	    /* 产品滑入事件 end */
	    /* 产品滑出事件 start */
	    this.$body.on('mouseleave', 'figure', function(){
	      var _this = this;
	      new Mask({
	        del: $('.productBox'),
	        fn: function() {
	          $(_this).css('z-index', 3);
	        }
	      });
	      new Mask({
	        del: $(_this),
	        fn: function() {
	          $(_this).css('z-index', 3);
	        }
	      });
	    });
	    /* 产品滑出事件 end */
	    /* 翻页事件 start */
	    // 上一页
	    this.$body.on('click','.pageBtn > button:eq(0)',function(){
	      var self = this;
	      var resUrl = _this.pageUrl;
	      var $this = $(this);
	    	_this.waitAnimateBegin();
	      /* 当按钮被禁用时点击其他按钮解除对另外一个按钮的禁用 */
	      $this.next('button').removeAttr('disabled');
				var start = Number($this.attr('data-start'));
				var count = Number($this.attr('data-const'));
	      var params = {
          start: start - 1 <= 0 ? 1 : start - 1,
          const: count
        };
        function prevPage(data) {
	    		_this.waitAnimateFinish();
        	if(data === 'error'){
        		console.error('请求失败,请重新请求');
        		return false
        	};
          if (data.start == 1) {
            $(self).attr('disabled', 'disabled');
          };
          var rightContent = _this.rightContent(data, resUrl);
        };
        _this.packageingPost(resUrl, params, prevPage)
	    });
	    // 下一页
	    this.$body.on('click','.pageBtn > button:eq(1)',function(){
	      var self = this;
	      var resUrl = _this.pageUrl;
	      var $this = $(this);
	    	_this.waitAnimateBegin();
	      /* 当按钮被禁用时点击其他按钮解除对另外一个按钮的禁用 */
	        $this.prev('button').removeAttr('disabled');
	        var total = Number($this.attr('data-total'));
	        var start = Number($this.attr('data-start'));
	        var count = Number($this.attr('data-const'));
	        var params = {
	          start: start + 1 > Math.ceil(total / count) ? Math.ceil(total / count) : start + 1,
	          const: count
	        };
	        function nextPage(data) {
	    			_this.waitAnimateFinish();
	        	if(data === 'error'){
	        		console.error('请求失败,请重新请求');
	        		return false
	        	};
	          if (data.start * data.const >= data.total) {
	            $(self).attr('disabled', 'disabled');
	          };
	          var rightContent = _this.rightContent(data, resUrl)
	        };
	        _this.packageingPost(resUrl, params, nextPage)
	    })
	    /* 翻页事件 end */
		},
		/**
		 * 产品详情页
		 * { details: 产品详情数据, parent: 父节点名称, that: 划入元素的节点, error: 数据请求失败后的显示结果 }
		**/
		productDetails: function(details, parent, error){
	    /* 判断数据是否加载失败 */
	    if (error) {
	      $(parent).append('<div class="detailsResFail">' + error + '</div>');
	      return false;
	    };
	    /* 设置详情页 */
	    var $detailsShow = $('<div />');
	    function eleNode(title,val){
	    	return '<div><h3>' + title + '</h3><p><span>' + val + '</span></p></div>'
	    };
	    function timestamp(time){
	    	return new Date(parseInt(time) * 1000).toLocaleString().replace('/年|月/g','-').replace(/日/,' ');
	    };
	    $detailsShow.append(eleNode('应用名称', details.aplication_name)).append(eleNode('开发日期', timestamp(details.add_time))).append(eleNode('更新日期', timestamp(details.update_time))).append('<div />').find('div:eq(3)').append('<a />').find('a').attr('href', 'http://shop.salesnow.cn/' + details.aplication_path).append('<button />').find('button').addClass('detailBtn btn btn-info').html('<span class="glyphicon glyphicon-cloud-download" style="padding-right:.5rem;" /> 下载').css({ 'padding': '6px 2rem' });
	    // $.each(details, function(index, val) {
	      /*
	       *
	       * alert,测试,后期需删除
	       * "index.php?module=ModuleManager&parent=Settings&view=ModuleImport&mode=appStoreImportUserModuleStep1&record={$Details['id']}"  这个是原下载按钮,具体可根据这个来测试
	       *
	       **/

	      // ;
	      /* 判断是不是下载按钮 */
	      // if (val.title == 'down') {
	      //   $detailsShow.append('<div />').children('div:last-child').append('<a />').find('a').attr('href', val.val).append('<button class="detailBtn" />').find('button').addClass('btn btn-info').html('<span class="glyphicon glyphicon-cloud-download" style="padding-right:.5rem;" /> 下载').css({
	      //     'padding': '6px 2rem'
	      //   });
	      //   return true;
	      // };
	      // /* 判断内容是否有多个段落标签 */
	      // if (val.val instanceof Array) {
	      //   var d = $detailsShow.append('<div />').children('div:last-child').append('<h3 /> <p />').children('h3').html(val.title).next('p');
	      //   $.each(val.val, function(i, ValData) {
	      //     d.append('<span />').find('span:eq(' + i + ')').html(ValData);
	      //   });
	      // } else {
	      //   $detailsShow.append('<div />').children('div:last-child').append('<h3 /><p />').find('h3').html(val.title).next('p').html(val.val);
	      // };
	    // });
	    /* 将数据添加进 body 中 */
	    $(parent).append($detailsShow);
		},
		/**
		 * 应用搜索功能
		**/
		searchApp: function(){
			var _this = this;
			this.$body.on('keyup', 'input[name=""searchApp]', function(e){
				if(!e) e = window.event;
				if(e.keyCode === 13){
					var $this = $(this);
					var value = $this.val().trim();
					_this.searchAppEvent(value)
				}
			});
			this.$body.on('click', '#searchAppBtn', function(){
				var $this = $(this);
				var value = $this.val().trim();
				_this.searchAppEvent(value)
			})
		},
		/**
		 * 应用搜索事件
		**/
		searchAppEvent: function(value){
			if(!value){
				var params = {
	          title : app.vtranslate('JS_MESSAGE'),
	          text: app.vtranslate('JS_GLOBAL_SEARCH_KEY_NULL'),
	          animation: 'show',
	          type: 'error'
	      };
	      snow_Helper_Js.showPnotify(params);
	      return false
	    };
			var _this = this;
	    var url = this.rightListUrl;
	    var params = { "searchVal": value };
	    var searchCallback = function(data){
	    	_this.waitAnimateFinish();
	    	if(data === 'error'){
	    		console.error('请求失败,请重新请求');
	    		return false
	    	};
	    	var rightContent = _this.rightContent(data)
	    };
	    this.packageingPost(url,params,searchCallback);
	    this.waitAnimateBegin()
		},
		/**
		 * 初始化事件
		**/
		initEvent: function(){
			var _this = this;
			var recordNum = 0; ///判断左右数据都加载完成后,删除动画.
			this.waitAnimateBegin();
			/* 初始化左侧列表 */
	    function receptionLeftData(data) {
				++recordNum && (recordNum >= 2 ? _this.waitAnimateFinish() : '');
	    	if(data === 'error'){
	    		console.error('请求失败,请重新请求');
	    		return false
	    	};
	      var leftAside = _this.leftAside(data)
	    };
	    this.packageingPost(this.leftListUrl, { interface: 'get_categorys' }, receptionLeftData);
	    /* 初始化左侧点击事件 */
	    this.leftEvent();
			/* 初始化右侧列表 */
			function receptionRightData(data) {
				++recordNum && (recordNum >= 2 ? _this.waitAnimateFinish() : '');
				if(data === 'error'){
					console.error('请求失败,请重新请求');
					return false
				};
	      var rightContent = _this.rightContent(data)
	    };
	    this.packageingPost(this.rightListUrl, params = { start: 1, const: 12 }, receptionRightData);
	    /* 初始化右侧点击和滑入等事件 */
	    this.rightEvent();
	    /* 初始化右侧应用搜索事件 */
	    this.searchApp()
		}
	};
	$(document).ready(function(){
		var appStore = new AppStore();
	});

  /* 这个是遮罩层函数和参数说明  
    
    这个是遮罩层 
    参数:obj:{
        parent: 要遮罩的父元素,
        backgroundColor: 遮罩层的颜色,以rgba的方式传输
        zIndex: 遮罩层的默认层级,
        // opacity: 设置透明度,
        flag: Number 设置遮罩层数量,
        del: 要删除的节点,写其父元素,
        fn: 回调函数
    }
  */
  function Mask(obj) {
    this.flag = false;
    this.productShade(obj);
  };
  Mask.prototype.productShade = function(obj) {
    /* 设置默认参数 */
    if (!obj) {
      var obj = {
        'parent': $('body'),
        'backgroundColor': '0,0,0,.8',
        'zIndex': 10,
      };
    };
    /* 删除遮罩层 */
    if (obj.del) {
      $(obj.del).children('.zhezhaoceng').remove();
      obj.fn && obj.fn();
      return false;
    };
    /* 截流 */
    var c = obj.parent.children('.zhezhaoceng') && obj.parent.children('.zhezhaoceng').length;
    if (this.flag || c) {
      // console.log('请设置这是第几个遮罩层');
      return false;
    };
    this.flag = true;

    !(obj.parent) && (obj.parent = $('body'));
    !(obj.backgroundColor) && (obj.backgroundColor = '0,0,0,.8');
    !(obj.zIndex) && (obj.zIndex = 10);
    $('<div />').attr('class', 'zhezhaoceng').css({
      'text-align': 'center',
      'line-height': obj.parent.height() + 'px',
      'background-color': 'rgba(' + obj.backgroundColor + ')',
      'width': '100%',
      'height': '100%',
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'display': 'none',
      'z-index': obj.zIndex
    }).appendTo(obj.parent).fadeIn('normal', obj.fn ? obj.fn : "").parents(obj.parent).css({
      'position': 'relative'
    });
  };

</script>
