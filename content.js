chrome.runtime.sendMessage({todo: "showPageAction"});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.todo === "setTemplate") {
		var templateType = {
			developer : "**Dev Notes:**\n**SVN Revision:**\n**Evidencias de teste:**\n**Dicas de teste:**",
			tester : "**Status do teste:**\n**Notas do teste:**\n**Evidencias do teste:**"
		};
		var chosenTemplate = request.chosenTemplate;
		//The Code below is specific for IFC JIRA Pages. You need to customize it
		//according to your page details
		
		//open comment textarea
		document.getElementById("comment_issue").click();
		if (!!templateType[chosenTemplate]) {
			$("#comment").val(templateType[chosenTemplate]);
		} else {
			console.log("Oops.. chosenTemplate mismatch error... Please report it on github");
		}
	}
})