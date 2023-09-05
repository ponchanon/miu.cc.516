$(".tab-parent").click(function(){
	var tab_child = $(this).attr("child");
	$(".tab-child").removeClass('active');
	$(".tab-child-body").removeClass('active');
	$(".tab-child-body").removeClass('in');
  	$("#"+tab_child).addClass('active');
  	$("#"+tab_child+"-body").addClass('active');
  	$("#"+tab_child+"-body").addClass('in');
});