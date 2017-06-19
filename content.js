chrome.runtime.sendMessage({todo: "showPageAction"});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.todo === "setTemplate") {
		var templateType = {
			developer : "**Dev Notes:**\n**SVN Revision:**\n**Evidencias de teste:**\n**Dicas de teste:**",
			tester : "**Status do teste:**\n**Notas do teste:**\n**Evidencias do teste:**",
			bug: "**Breve Descrição:**\n**Passos para Reproduzir:**\n**Resultado Esperado:**\n**Evidencias do Bug:**\n**Browser/Dispositivo:**",
			enhancement: "**Descrição:**\nComo um ________ eu quero _________ para que seja possível ________\n**Regras de Negócio:**\n**Mockup:**\n"
		};
		var chosenTemplate = request.chosenTemplate;

		if (!!templateType[chosenTemplate]) {
			if (chosenTemplate === "developer" || chosenTemplate === "tester") {
				var commentLink = document.getElementById("comment_issue");
				if (!!commentLink) {
					commentLink.click();
					document.getElementById("comment").value = templateType[chosenTemplate];
				} else {
					console.log("Oops... we were unable to find link to click to comment")
				}
			} else if (chosenTemplate === "bug" || chosenTemplate === "enhancement") {
				var descriptionField = document.getElementById("description");
				if (!!descriptionField) {
					descriptionField.value = templateType[chosenTemplate];
				} else {
					console.log("%c Oops.. It looks like you've tried to use the template %c" + chosenTemplate + "%c on the comments page. Try using it on the Task creation page","color:yellow","color:red","color:yellow");
				}
			} else {
				console.log("%c Oops.. You've tried to use the template %c" + chosenTemplate + "%c but it didn't work... Check if you are using it in the correct page. Notice that Bug/enhancement templates will only work on Ticket Creation pages. Developer/Tester templates will only work on ticket's page.","color:yellow","color:red","color:yellow");
			}
		} else {
			console.log("%c Oops.. App received a request to add the template: %c" + chosenTemplate + "%c but it doesn't exist. Please contact admin for support or open issue on Github Project","color:yellow","color:red","color:yellow");
		}
	}
})