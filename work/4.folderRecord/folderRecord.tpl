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
<input type="hidden" name="module" value="{$MODULE}" />
{if $MODULE == 'MessageCenter'}

{else}
{strip}
	<div class="quickWidgetContainer accordion" style="margin-bottom:0;">
		{assign var=val value=1}
		{foreach item=SIDEBARWIDGET key=index from=$QUICK_LINKS['SIDEBARWIDGET']}
			<div class="quickWidget">
				<div class="accordion-heading accordion-toggle quickWidgetHeader" data-target="#folderRecord" data-toggle="collapse" data-parent="#folders" data-label="{$SIDEBARWIDGET->getLabel()}" data-widget-url="{$SIDEBARWIDGET->getUrl()}" >
					<span class="pull-left"><img class="imageElement" data-rightimage="{vimage_path('rightArrowWhite.png')}" data-downimage="{vimage_path('downArrowWhite.png')}" src="{vimage_path('rightArrowWhite.png')}" /></span>
					<h5 class="title widgetTextOverflowEllipsis pull-right" title="{vtranslate($SIDEBARWIDGET->getLabel(), $MODULE)}">{vtranslate($SIDEBARWIDGET->getLabel(), $MODULE)}</h5>
					<div class="loadingImg hide pull-right">
						<div class="loadingWidgetMsg"><strong>{vtranslate('LBL_LOADING_WIDGET', $MODULE)}</strong></div>
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="widgetContainer accordion-body collapse" id="folderRecord" data-url="{$SIDEBARWIDGET->getUrl()}">
					<!-- 这里写你要放的代码 -->
					<ul class="nav nav-list" style="padding:0 2%;height:0;">
						{foreach item=FOLDER from=$FOLDERS}
							<li data-clickEvent="click" data-id="{$DEFAULT_CUSTOM_FILTER_ID}" data-val='{decode_html($FOLDER->getName())}' title="{decode_html($FOLDER->getName())}"><a href="javascript:void(0);">{$FOLDER->getName()}</a></li>
              {foreachelse}
              <li style="text-align:center">{vtranslate('LBL_NO_RECORDS', $MODULE)}
              </li>
	          {/foreach}
					</ul>
				</div>
			</div>
		{/foreach}
	</div>
{/strip}
{/if}
{literal}
<script type="text/javascript">
	(function($,win){
		$('body').on('click','[data-clickEvent="click"]',function(){
	    /* 发送给后台的参数,方法顺序不能乱 */
	    var urlParams = {
	        'module': app.getModuleName(),
	        'parent': app.getParentModuleName(),
	        'page': $('#pageNumber').val(),
	        'view': 'List',
	        'viewname': $(this).attr('data-id'),
	        'orderby': $('#orderBy').val(),
	        'sortorder': $('#sortOrder').val(),
	        'search_params': '',
	        'folder_id': 'folderid',
	        'folder_value': $(this).attr('data-val'),
	        'search_key': $('#alphabetSearchKey').val(),
	        'search_value': '',
	    }
	    if (typeof urlParams == 'undefined') {
	        urlParams = {};
	    };
	    /* 这段代码是将 url 进行加密然后跳转 */
	    var postServerUrl = "",
	        temArr = [];
	    for (var item in urlParams) {
	        temArr.push(item + "=" + urlParams[item])
	    };
	    postServerUrl = temArr.join("&")
	    app.encode(postServerUrl, function(res) {
	        location.href = res
	    });

		});
	}(jQuery,window))
</script>
{/literal}
