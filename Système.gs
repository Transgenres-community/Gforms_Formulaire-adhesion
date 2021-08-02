var POST_URL = "https://discord.com/api/webhooks/";

function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
    var items = [];

    for (var i = 0; i < response.length; i++) {
        var question = response[i].getItem().getTitle();
        var answer = response[i].getResponse();
        try {
            var parts = answer.match(/[\s\S]{1,1024}/g) || [];
        } catch (e) {
            var parts = answer;
        }

        if (answer == "") {
            continue;
        }
        for (var j = 0; j < parts.length; j++) {
            if (j == 0) {
                items.push({
                    "name":  "**🔎 | " + question + "**" ,
                    "value": "\`\`\`▶️ | " + parts[j] + "\`\`\`",
                    "inline": false
                });
            } else {
                items.push({
                    "name":  "**🔎 | " + question.concat(" (cont.)")  + "**" ,
                    "value": "\`\`\`▶️ | " + parts[j] + "\`\`\`",
                    "inline": false
                });
            }
        }
    }
//"\`\`\`" + + "\`\`\`"
    var options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": "‌@everyone | Nouvelle demande d'adhésion", // This is not an empty string
            "embeds": [{
                "title": "📋 TransCom | Demande d'adhésion",
                   "color": 7506394,
                "fields": items,
                "footer": {
                    "text": "Formulaire d'adhésion dev par Nathanaelle"
               
                }
            }]
        })
    };

    UrlFetchApp.fetch(POST_URL, options);
};

