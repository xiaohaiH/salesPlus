/* @ele: 盛放日历的元素, @toDo(Array): 待办事项日期, @prevMonth(元素): 上个月按钮, @nextMonth(元素): 下个月按钮, @title(元素): 当前展示的年月, @goback: 返回当月, @backlog: 跳转到待办事项的元素 */
function GenerateDate({
		ele,
		prevMonth,
		nextMonth,
		title,
		goback,
		backlog
		}) {
	this.url = 'index.php?module=Calendar&action=GetSchedule'; ///日历请求的链接.
	this.ele = ele;
	this.prevMonthBtn = prevMonth;
	this.nextMonthBtn = nextMonth;
	this.title = title;
	this.goback = goback;
	this.backlog = backlog;
	if (prevMonth && nextMonth) {
		this.paging();
	};
	var self = this;
	var date = new Date().toLocaleString().split(' ')[0].split('-');
	var params = {
		year: date[0],
		month: date[1]
	};
	this.request({
		url: this.url,
		data: params,
		fn: function(error, data) {
			if (error) {
				self.hint('初始化日历失败', 'error')
				self.ele.html(self.generateCalendar());
				return false;
			};
			if (data.code) {
				self.ele.html(self.generateCalendar({
					toDo: data.toDo
				}));
			} else {
				self.hint('初始化日历失败', 'error');
				self.ele.html(self.generateCalendar())
			}
		}
	})
};
GenerateDate.prototype = {
	/* @className: class 类名, @value: 元素值 */
	template: function(className, value, attr) {
		var flag = '';
		for (var key in attr) {
			flag += ('data-' + key) + '="' + attr[key] + '"'
		};
		return '<p class="dateBox"><span class="' + className + '" ' + flag + '>' + value + '</span></p>';
	},
	/* @message: 全局提示语, @type: 提示类型 */
	hint: function(message, type) {
		var message = app.vtranslate(message || '没写提示语');
		var params = {
			text: message,
			type: type || 'info'
		};
		snow_Helper_Js.showMessage(params);
	},
	/* @curDate: 当前日期, @toDo(Object): 待办事项的日期, curDate(new Date): 当天的日期 */
	generateCalendar: function({
			toDo,
			curDate
			} = {}) {
		toDo = toDo || {};
		var _setDate = curDate || new Date();
		var _getCurYear = _setDate.getFullYear();
		var _getCurMonth = _setDate.getMonth();
		var _getCurDate = _setDate.getDate();
		var _getCurFirstDay = new Date(_getCurYear, _getCurMonth, 1).getDay();
		var toDay = new Date().toLocaleString().split(' ')[0];
		var calendar = '';
		Number(toDay.split('/')[0]) === _getCurYear && (toDay.split('/')[1] - 1) === _getCurMonth ? this.title.html(_getCurYear + '年' + (_getCurMonth + 1) + '月') : this.title.html(_getCurYear + '年' + (_getCurMonth + 1) + '月' + '<span class="goback">回到今天</span>')

		for (var i = 1; i <= 42; i++) {
			var calendarList = new Date(_getCurYear, _getCurMonth, i - _getCurFirstDay);
			var calendarYear = calendarList.getFullYear();
			var calendarMonth = calendarList.getMonth();
			var calendarDate = calendarList.getDate();
			if (_getCurMonth === calendarMonth) {
				var toDoflag = Object.values(toDo);
				var backlog = toDoflag.find((obj) => obj.date === calendarDate); ///当天有待办事项.
				/* 翻页后不是当月选中日期改为当月第1天 start */
				if (toDay.split('/')[1] - 1 !== calendarMonth && calendarDate === 1) {
					calendar += backlog ? this.template('curDate selected backlog', calendarDate, {
						'url': backlog.url
					}) : this.template('curDate selected', calendarDate);
					continue;
				};
				/* 翻页后选不是当月中日期改为当月第1天 end */
				if (toDay === calendarList.toLocaleString().split(' ')[0]) {
					calendar += backlog ? this.template('curDate selected backlog', calendarDate, {
						'url': backlog.url
					}) : this.template('curDate selected', calendarDate)
				} else {
					calendar += backlog ? this.template('curMonth backlog', calendarDate, {
						'url': backlog.url
					}) : this.template('curMonth', calendarDate)
				}
			} else {
				calendar += backlog ? this.template('otherMonth', calendarDate) : this.template('otherMonth', calendarDate)
			}
		}
		return calendar;
	},
	/* event 事件 */
	paging: function() {
		var self = this;
		/* 左右翻页事件 */
		$('body').on('click', this.prevMonthBtn.selector + ', ' + this.nextMonthBtn.selector, function(e) {
			var _this = this;
			var flag = $(this).data('flag');
			if (flag) {
				self.hint('请求中....', 'info');
				return false
			} else {
				$(this).data('flag', true).siblings('.changeMonth').data('flag', true);
				$(this).siblings('span').find('.goback').length && $(this).siblings('span').find('.goback').data('flag', true)
			}
			var prevBtnClass = self.prevMonthBtn.attr('class');
			var curEle = $(e.target).hasClass(prevBtnClass);
			var getCurDate = self.title.html().split(/年|月/);
			var date = new Date(getCurDate[0], curEle ? getCurDate[1] - 2 : Number(getCurDate[1]), 1).toLocaleString().split(' ')[0].split('-');
			var params = {
				year: date[0],
				month: date[1]
			};
			var fn = function fn(error, data) {
				$(_this).data('flag', false).siblings('.changeMonth').data('flag', false);
				$(_this).siblings('span').find('.goback').length && $(_this).siblings('span').find('.goback').data('flag', false);
				if (error) {
					self.hint('请求日历失败,请重试', 'error');
					return false
				};
				if (data.code) {
					curEle ? self.ele.html(self.generateCalendar({
						curDate: new Date(getCurDate[0], getCurDate[1] - 2, 1),
						toDo: data.toDo
					})) : self.ele.html(self.generateCalendar({
						curDate: new Date(getCurDate[0], getCurDate[1], 1),
						toDo: data.toDo
					}));
				} else {
					self.hint('请求日历失败,请重试', 'error')
				}
			}
			self.request({
				url: self.url,
				data: params,
				fn
			})
		});
		/* 回到当月事件 */
		$('body').on('click', this.goback.selector, function(e) {
			var _this = this;
			var flag = $(this).data('flag');
			if (flag) {
				self.hint('请求中....', 'info');
				return false
			} else {
				$(this).data('flag', true).parent('span').siblings('.changeMonth').data('flag', false);
			}
			var _date = new Date().toLocaleString().split(' ')[0].split('/');
			var year = _date[0];
			var month = _date[1];
			var date = _date[2];
			var params = {
				year: new Date().toLocaleString().split(' ')[0],
			};
			var fn = function fn(error, data) {
				$(_this).data('flag', false).parent('span').siblings('.changeMonth').data('flag', false);
				if (error) {
					self.hint('返回今天请求失败,请重试', 'error');
					return false
				};
				if (data.code) {
					console.log(year, month, date)
					self.ele.html(self.generateCalendar({
						curDate: new Date(year, month - 1, date),
						toDo: data.toDo
					}));
				} else {
					self.hint('返回今天请求失败,请重试', 'error');
				}
			};
			self.request({
				url: self.url,
				data: params,
				fn
			})
		});
		/* 跳转待办事项事件 */
		$('body').on('click', this.backlog.selector, function(e) {
			var url = $(this).data('url');
			window.location.href = url
		});
	},
	request: function({
			url,
			data,
			fn,
			type = 'POST',
			dataType = 'json'
			}) {
		$.ajax({
			url,
			data,
			type,
			dataType,
			success: function(data) {
				//if (data.code == 1) {
					typeof fn === 'function' && fn('', data)
				//}
			},
			error: function(error) {
				console.trace(error);
				typeof fn === 'function' && fn(error)
			}
		})
	}
};
$(document).ready(function() {
	new GenerateDate({
		ele: $('.dateShowBox'),
		prevMonth: $('.upMonth'),
		nextMonth: $('.downMonth'),
		title: $('.calendarTitle'),
		goback: $('.goback'),
		backlog: $('.backlog')
	})
})