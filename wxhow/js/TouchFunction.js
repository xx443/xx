//总共有多少页
var count = $(".page").length;
//当前页下标
var nowPage = 0;

var startY, endY, moveY;

$(".page").on("touchstart touchmove touchend", function(e) {
	//关闭浏览器默认时事件
	e.preventDefault();
	switch(e.type) {
		case "touchstart":
			startY = e.originalEvent.targetTouches[0].clientY;
			break;
		case "touchmove":
			endY = e.originalEvent.targetTouches[0].clientY;
			break;
		case "touchend":
			if(endY == true) return;
			moveY = endY - startY;
			//向上翻页，进入下一页
			if(moveY < 0) {
				if(nowPage == count - 1) return;
				$(this).addClass("toTop").next().removeClass("hidden").addClass("nextTop");
				//当切页动画结束后，移除多余的class属性
				$(this).on("webkitAnimationEnd", function() {
						$(this).removeClass("toTop").addClass("hidden")
								.next().removeClass("nextTop");
						$(this).off("webkitAnimationEnd");
					})
					//更新nowPage
				nowPage++;
			} else if(moveY > 0) {
				if(nowPage == 0) return;
				$(this).addClass("toBottom")
						.prev().removeClass("hidden")
								.addClass("prevBottom");
				//当切页动画结束后，移除多余的class属性
				$(this).on("webkitAnimationEnd", function() {
						$(this).removeClass("toBottom").addClass("hidden")
								.prev().removeClass("prevBottom");
						$(this).off("webkitAnimationEnd");
					})
					//更新nowPage
				nowPage--;
			}
			endY = true;
			break;
		default:
			break;
	}
})

$(".up").on("touchstart", function() {
	if(nowPage == count - 1) return;
	$(".page").eq(nowPage).addClass("toTop")
							.next().removeClass("hidden").addClass("nextTop");
	//当切页动画结束后，移除多余的class属性
	$(".page").eq(nowPage).on("webkitAnimationEnd", function() {
			$(this).removeClass("toTop").addClass("hidden")
					.next().removeClass("nextTop");
			$(this).off("webkitAnimationEnd");
		})
		//更新nowPage
	nowPage++;
})