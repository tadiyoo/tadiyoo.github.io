var stopScroll = false;
$(document).ready(function(){
	tabControl();
	autoScroll();
	
	$("#controlAuto").click(function(){
		if(stopScroll == false)
			stopScrolling();
		else
			beginScrolling();

		return false;
	});
});

function tabControl(){
	var $div_li = $("div.tabMenu ul li");
	$div_li.hover(function(){
	$(this).addClass("selected")
			.siblings().removeClass("selected");
	var index = $div_li.index(this);
	$("div.tabBox > div").eq(index).show()
						.siblings().hide();
	});
}

function scrollNext()
{
	var currentItem = $(".wrap.main");
	var children = $("#carousel > div.wrap");
	var imgNumber = children.length-1;
	if(imgNumber == 0)
		return false;

	var index = currentItem.index();
	var itemWidth = currentItem.width();
	var windowWidth = $(window).width();
	var leftValue = (windowWidth - itemWidth)/2;
	if(leftValue < 0)
		leftValue = 0;

	if(currentItem.is(":animated"))
		return false;
	currentItem.children(".scrollImg")
	.children("a.prev-image").remove();
	currentItem.children(".scrollImg")
	.children("a.next-image").remove();

	var preImg = currentItem.children(".scrollImg")
							.children("a.current-image").clone();

	preImg.addClass("prev-image");
	preImg.removeClass("current-image")

	if(index == imgNumber){
		var nextItem = $("div.wrap:eq(0)");
	}

	else{
		var nextItem = $(".wrap.main + div.wrap");
	}

	nextItem.removeClass("hide");
	nextItem.removeClass("hiddenLeft");
	nextItem.addClass("hiddenRight");
	nextItem.css("left",itemWidth+leftValue);

	if(nextItem.index() == imgNumber)
	{
		nextNextItem = $("div.wrap:eq(0)");
	}

	else{
		var nextNextItem = nextItem.next();
	}

	var nextImg = nextNextItem.children(".scrollImg")
							.children("a.current-image").clone();
	nextImg.addClass("next-image");
	nextImg.removeClass("current-image");
	nextImg.appendTo(nextItem.children(".scrollImg"));
	nextItem.animate({left:leftValue,opacity:'1'},1000,function(){
		nextItem.removeClass("hiddenRight");
		nextItem.removeAttr("style");
		nextItem.addClass("wrap");
		nextItem.addClass("main");

		preImg.appendTo(nextItem.children(".scrollImg"));
		
	});

	currentItem.animate({left:-itemWidth,opacity: '0.2'},1000,function(){
			currentItem.removeClass("main").removeAttr("style")
				.addClass("hiddenLeft").addClass("hide");
	});
}

function scrollPrev()
{
	var currentItem = $(".wrap.main");
	var index = currentItem.index();
	var children = $("#carousel > div.wrap");
	var imgNumber = children.length-1;
	if(imgNumber == 0)
		return false;

	var itemWidth = currentItem.width();
	var windowWidth = $(window).width();
	var leftValue = (windowWidth - itemWidth)/2;
	if(leftValue < 0)
		leftValue = 0;

	if(currentItem.is(":animated"))
		return false;

	currentItem.children(".scrollImg")
	.children("a.prev-image").remove();

	currentItem.children(".scrollImg")
	.children("a.next-image").remove();


	if(currentItem.index() == 0){
		var prevItem = $("div.wrap:eq("+imgNumber+")");
	}
	else{
		var prevItem = currentItem.prev();
	}

	var left = leftValue-1000;
	prevItem.css("left",left+"px");

	var nextImg = currentItem.children(".scrollImg")
							.children("a.current-image").clone();

	prevItem.removeClass("hide");
	nextImg.addClass("next-image");
	nextImg.removeClass("current-image");

	if(prevItem.index() == 0){
		prevImg = $("div.wrap:eq("+imgNumber+")").children(".scrollImg")
								.children("a.current-image").clone();
	}
	else{
		prevImg = prevItem.prev().children(".scrollImg")
							.children("a.current-image").clone();
	}
	prevImg.removeClass("current-image");
	prevImg.addClass("prev-image");
	prevImg.appendTo(prevItem.children(".scrollImg"));

	prevItem.animate({left:leftValue,opacity:'1.0'},1000,function(){
		prevItem.removeClass("hiddenLeft");
		prevItem.addClass("main");
		prevItem.removeAttr("style");
		nextImg.appendTo(prevItem.children(".scrollImg"));
	});

	currentItem.animate({left:itemWidth,opacity: '0'},1000,function(){
			currentItem.removeClass("main").removeAttr("style")
				.addClass("hiddenLeft").addClass("hide");
	});
}

function autoScroll(){
	if(stopScroll == false)
		scrollNext();
	setTimeout("autoScroll()",7000);
}

function stopScrolling(){
	$("#stopBegin").attr("src","scrollPlay.jpg");
	stopScroll = true;
}

function beginScrolling(){
	$("#stopBegin").attr("src","scrollStop.jpg");
	stopScroll = false;
}