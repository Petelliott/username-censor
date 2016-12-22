censor_state = false;


chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action == "toggle_censor") {
        var usernames = document.getElementsByClassName("author");

        for (var i = 0; i < usernames.length; i++) {
            usernames[i].style.color = "red";
            usernames[i].style.backgroundColor = "red";
        }
    }
});
