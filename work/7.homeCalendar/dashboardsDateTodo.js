/* @ele: 盛放日历的元素, @toDo(Array): 待办事项日期, @prevMonth(元素): 上个月按钮, @nextMonth(元素): 下个月按钮, @title(元素): 当前展示的年月, @goback: 返回当月 */
function GenerateDate({
	ele,
	toDo,
	prevMonth,
	nextMonth,
	title,
	goback
}) {
	this.ele = ele;
	this.prevMonthBtn = prevMonth;
	this.nextMonthBtn = nextMonth;
	this.title = title;
	this.goback = goback || $('.goback');
	if (prevMonth && nextMonth) {
		this.paging();
	}
	this.ele.html(this.generateCalendar({
		toDo
	}));
};
GenerateDate.prototype = {
	/* @className: class 类名, @value: 元素值 */
	template: function(className, value) {
		return '<p class="dateBox"><span class="' + className + '">' + value + '</span></p>';
	},
	/* @curDate: 当前日期 */
	generateCalendar: function({
		toDo,
		curDate
	}) {
		toDo = toDo || [];
		var _setDate = curDate || new Date();
		var _getCurYear = _setDate.getFullYear();
		var _getCurMonth = _setDate.getMonth();
		var _getCurDate = _setDate.getDate();
		var _getCurFirstDay = new Date(_getCurYear, _getCurMonth, 1).getDay();
		var toDay = new Date().toLocaleString().split(' ')[0];
		var calendar = '';
		Number(toDay.split('-')[0]) === _getCurYear && (toDay.split('-')[1] - 1) === _getCurMonth ? this.title.html(_getCurYear + '年' + (_getCurMonth + 1) + '月') : this.title.html(_getCurYear + '年' + (_getCurMonth + 1) + '月' + '<span class="goback">回到今天</span>')

		for (var i = 1; i <= 42; i++) {
			var calendarList = new Date(_getCurYear, _getCurMonth, i - _getCurFirstDay);
			var calendarYear = calendarList.getFullYear();
			var calendarMonth = calendarList.getMonth();
			var calendarDate = calendarList.getDate();
			if (_getCurMonth === calendarMonth) {
				/* 翻页后选中日期改为当月第1天 start */
				if (toDay.split('-')[1] - 1 !== calendarMonth && calendarDate === 1) {
					calendar += toDo.find((i) => i === calendarDate) ? this.template('curDate selected backlog', calendarDate) : this.template('curDate selected', calendarDate);
					continue;
				};
				/* 翻页后选中日期改为当月第1天 end */
				if (toDay === calendarList.toLocaleString().split(' ')[0]) {
					calendar += toDo.find((i) => i === calendarDate) ? this.template('curDate selected backlog', calendarDate) : this.template('curDate selected', calendarDate)
				} else {
					calendar += toDo.find((i) => i === calendarDate) ? this.template('curMonth backlog', calendarDate) : this.template('curMonth', calendarDate)
				}
			} else {
				calendar += toDo.find((i) => i === calendarDate) ? this.template('otherMonth', calendarDate) : this.template('otherMonth', calendarDate)
			}
		}
		return calendar;
	},
	/* 翻页事件 */
	paging: function() {
		var self = this;
		$('body').on('click', this.prevMonthBtn.selector + ', ' + this.nextMonthBtn.selector, function(e) {
			var prevBtnClass = self.prevMonthBtn.attr('class');
			var curEle = $(e.target).hasClass(prevBtnClass);
			var getCurDate = self.title.html().split(/年|月/);
			var params = {};
			var fn = function fn(data) {
				curEle ? self.ele.html(self.generateCalendar({
					curDate: new Date(getCurDate[0], getCurDate[1] - 2, 1)
				})) : self.ele.html(self.generateCalendar({
					curDate: new Date(getCurDate[0], getCurDate[1], 1)
				}));
			}
			fn()
				// self.request({
				// 	url: '',
				// 	data: params,
				// 	fn
				// })
		});
		$('body').on('click', this.goback.selector, function(e) {
			var _date = new Date().toLocaleString().split(' ')[0];
			var year = _date.split('-')[0];
			var month = _date.split('-')[1];
			var date = _date.split('-')[2];
			var params = {
				year,
				month,
				date
			};
			console.log(params);
			var fn = function fn(data) {
				self.ele.html(self.generateCalendar({
					curDate: new Date(year, month - 1, date)
				}));
			};
			fn()
				// self.request({
				// 	url: '',
				// 	data: params,
				// 	fn
				// })
		})
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
				typeof fn === 'function' && fn(data)
			},
			error: function(error) {
				console.trace(error)
			}
		})
	}
};
$(document).ready(function() {
	new GenerateDate({
		ele: $('.dateShowBox'),
		toDo: [1, 4],
		prevMonth: $('.upMonth'),
		nextMonth: $('.downMonth'),
		title: $('.calendarTitle'),
		goback: $('.goback')
	})
})