
get_users = {
    "www.reddit.com": function() {
        return document.getElementsByClassName("author");
    }
};

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    var site = window.location.hostname;

    if (!(site in get_users)) {
        console.error("unsupported site");
        return;
    }
    if (request.action != "toggle_censor"){
        console.error("unrecognized action");
        return;
    }


    var users = get_users[site]();

    for (let i = 0; i < users.length; ++i) {
        users[i].style.color = "red";
        users[i].style.backgroundColor = "red";
    }

});
