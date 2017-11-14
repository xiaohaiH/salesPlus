{*<!--
/*********************************************************************************
  ** The contents of this file are subject to the snow CRM Public License Version 1.0
   * ("License"); You may not use this file except in compliance with the License
   * The Original Code is:  snow CRM Open Source
   * The Initial Developer of the Original Code is snow.
   * Portions created by snow are Copyright (C) snow.
   * All Rights Reserved.
  *
 ********************************************************************************/
-->*}
<div class="gridster">
	<ul class="myScrollArea">

		{assign var=COLUMNS value=2}
		{assign var=ROW value=1}
		{foreach from=$WIDGETS item=WIDGET name=count}
			{assign var=WIDGETDOMID value=$WIDGET->get('linkid')}
			{if $WIDGET->getName() eq 'MiniList'}
				{assign var=WIDGETDOMID value=$WIDGET->get('linkid')|cat:'-':$WIDGET->get('widgetid')}
			{elseif $WIDGET->getName() eq 'Notebook'}
				{assign var=WIDGETDOMID value=$WIDGET->get('linkid')|cat:'-':$WIDGET->get('widgetid')}
			{/if}
			<li id="{$WIDGETDOMID}" {if $smarty.foreach.count.index % $COLUMNS == 0 and $smarty.foreach.count.index != 0} {assign var=ROWCOUNT value=$ROW+1}
				data-row="{$WIDGET->getPositionRow($ROWCOUNT)}" {else} data-row="{$WIDGET->getPositionRow($ROW)}" {/if}
				{assign var=COLCOUNT value=($smarty.foreach.count.index % $COLUMNS)+1}
				data-col="{$WIDGET->getPositionCol($COLCOUNT)}"
				data-sizex="{if $NCHAT_PERMISSION} {$WIDGET->getWidth()} {else} 1{/if}" data-sizey="{$WIDGET->getHeight()}"
				class="dashboardWidget dashboardWidget_{$smarty.foreach.count.index}" data-url="{$WIDGET->getUrl()}" data-mode="open" data-name="{$WIDGET->getName()}">
			</li>
		{/foreach}
		<style type="text/css">
      .scheduleBox{
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      /* 年月日 */
      .scheduleBox .scheduleTitle{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: auto;
      }
      .scheduleBox .scheduleTitle span{
        font-size: 14px;
      }
      .scheduleBox .scheduleTitle .changeMonth{
        width: 0;
        height: 0;
        border: 7px solid transparent;
      }
      .scheduleBox .scheduleTitle .upMonth{
        border-right-color: #999;
      }
      .scheduleBox .scheduleTitle .downMonth{
        border-left-color: #999;
      }
      /* 展示日期 */
      .scheduleBox .scheduleContent{
  	    background: #f4f8f9;
  	    flex: 5 1 auto;
  	    display: flex;
  	    flex-direction: column;
      }
      .scheduleBox .scheduleContent .weekTitle{
      	flex: auto;
        display: flex;
        justify-content: space-between;
        text-align: center;
        align-items: center;
      }
      .scheduleBox .scheduleContent .weekTitle span{
        flex: 1 1 calc(100% / 7);
      }
      .scheduleBox .scheduleContent .dateShowBox{
        display: flex;
        justify-content: space-between;
        flex-flow: row wrap;
        flex: 4 1 auto;
      }
      .scheduleBox .scheduleContent .dateShowBox .dateBox{
        height: 32px;
        flex: 1 1 calc(100% / 7);
        justify-content: center;
        margin: 0;
        cursor: pointer;
        text-align: center;
      }
      .scheduleBox .scheduleContent .dateShowBox .dateBox::before{
      	content: '';
      	display: inline-block;
      	height: 100%;
      	width: 0;
      	vertical-align: middle;
      }
      .scheduleBox .scheduleContent .dateShowBox .dateBox span{
        position: relative;
        display: inline-block;
        vertical-align: middle;
        min-width: 17px;
      }
      .selected::after{
        content: '';
        width: 100%;
        height: 4px;
        display: block;
        background: #55acee;
      }
      .backlog::before{
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #55acee;
        position: absolute;
        left: 100%;
        top: 0;
      }
      .curDate{
        color: red;
      }
      .curMonth{
        color: #333736;
      }
      .otherMonth{
        color: #c2c3c5;
      }
      .goback{
      	padding-left: 5px;
		    color: #55ACEE;
		    cursor: pointer;
      }
      .goback:hover{
      	color: #3f89c1;
      }
		</style>
		<li id="888" class="dashboardWidget" data-mode="open" data-row="1" data-sizex="5" data-sizey="1" style="position: absolute;" data-name="aabbcc">
			<div class="scheduleBox">
				<div class="scheduleTitle">
					<i class="upMonth changeMonth"></i>
					<span class="calendarTitle">2017年11月</span>
					<i class="downMonth changeMonth"></i>
				</div>
				<div class="scheduleContent">
					<div class="weekTitle">
						<span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
					</div>
					<div class="dateShowBox">
					</div>
				</div>
			</div>

		</li>
	</ul>
	<input type="hidden" id=row value="{$ROWCOUNT}" />
	<input type="hidden" id=col value="{$COLCOUNT}" />
	<input type="hidden" id="userDateFormat" value="{$CURRENT_USER->get('date_format')}" />
	<input type="hidden" id="maxrow" value="" />
</div>
<literal>
	<style type="text/css">
		.icon-refresh {
			background-position: 122px 0;
			height: 0;
		}
		</style>
	<!-- 日期选择JS -->
	<script src="layouts\vlayout\modules\snow\resources\dashboards\dashboardsDateTodo.js"></script>
	<script type="text/javascript">
	    $(function(){
	       $(document.body).delegate("#pipelinedAmount","mousemove",function(){
                var $this=$(this);
                $this.find("div:eq(1)").css({
                     left:"0px"
                });

	       });
	    });

		//$(document).ready(function(){

				/*$('.icon-refresh').click(function(){
				 $('.refresh').remove();
				 });*/
			/*$(".icon-refresh").on("click",function (e) {
				e.preventDefault();
				e.stopPropagation();
			});*/
				//$('.icon-refresh').remove();
		//});
		/*$(document).ready(function(){
			alert('1');
			$("#page").load(function(){
				alert('2');
				$('.icon-refresh').remove();
			});
		});*/
//		window.onload = function(){
//			alert('1');
//			$('.icon-refresh').remove();
//		};
		$(window).load(function() {
			//alert('1');
			$('.icon-refresh').remove();
			setTimeout(function (){
				$('.icon-refresh').remove();
			}, 10000);
			setTimeout(function (){
				$('.icon-refresh').remove();
			}, 15000);
			setTimeout(function (){
				$('.icon-refresh').remove();
			}, 20000);
			setTimeout(function (){
				$('.icon-refresh').remove();
			}, 25000);
			setTimeout(function (){
				$('.icon-refresh').remove();
			}, 30000);
			setTimeout(function (){
				$('.icon-refresh').remove();
			}, 35000);
			setTimeout(function (){
				$('.icon-refresh').remove();
			}, 50000);
			setTimeout(function (){
				$('.icon-refresh').remove();
			}, 55000);
			setTimeout(function (){
				$('.icon-refresh').remove();
			}, 90000);

		});
	</script>
</literal>
