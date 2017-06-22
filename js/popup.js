$(function(){

	var template = $('input[name=templateType]:checked').val();
	$('input[name=templateType]').on("change click", function() {
		template = $(this).val();
	});
    $("#setTemplate").click(function() {     
    	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {todo: "setTemplate", chosenTemplate: template})
		});
    });
});