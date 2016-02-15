;(function ($) {
	$.fn.sort = function (options) {
		var options = $.extend({
			sort_by : "p",
			item : "div",
			order : "asc",
			is_num : false,
			sort_by_attr : false,
			attr_name : ""
		},options);

		return this.each(function () {
			var i = 0;
			var self = this;
			var sortList = [];

			//初始化排序列表
			$(this).find(options.item).each(function () {
				var sortBy = $(this).find(options.sort_by);
				var txt;
				txt = options.sort_by_attr?sortBy.attr(options.attr_name).toLowerCase():sortBy.text().toLowerCase();	
				sortList.push([txt,i]);
				$(this).attr("sort","sort"+i);
				i++;
			});

			this.sortNum = function (a,b) {
				return eval(a[0] - b[0]);
			};

			this.sortABC = function (a,b) {
				return a[0] > b[0] ? 1 : -1;
			}
			
			options.is_num?sortList.sort(self.sortNum):sortList.sort(self.sortABC)

			if(options.order == "desc") {
				options.is_num?sortList.reverse(self.sortNum):sortList.reverse(self.sortABC)
			}

			for(var j = 0,len = sortList.length;j < len;j++) {
				var el = $(self).find(options.item + "[sort='sort" + sortList[j][1] + "']");
                $(self).append(el);
			}	
		});
	}
}(jQuery))

