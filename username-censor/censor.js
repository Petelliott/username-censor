
class_list = {"www.reddit.com":["author"]};

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    var site = window.location.hostname;

    if (request.action == "toggle_censor" && site in class_list) {
        var usernames = [];
        for (let i = 0; i < class_list[site].length; ++i) {
            usernames = usernames.concat(document.getElementsByClassName(class_list[site][i]));
        }

        for (let i = 0; i < usernames.length; ++i) {
            usernames[i].style.color = "red";
            usernames[i].style.backgroundColor = "red";
        }

    } else if (!(site in class_list)) {
        console.error("unsupported site");
    } else {
        console.error("unrecognized action");
    }
});
