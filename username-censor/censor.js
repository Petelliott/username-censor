
get_users = {
    "www.reddit.com": function() {
        return document.getElementsByClassName("author");
    },
    // "staff.tumblr.com": function() { TODO: add tumblr support later
    //     const classes = ["asker","answerer","tumblr_blog"];
    //
    //     var users = [];
    //     for (let i = 0; i < classes.length; ++i) {
    //         users = users.concat(Array.prototype.slice.call(
    //                 document.getElementsByClassName(classes[i])
    //         ));
    //     }
    //
    //     for (let i = 0; i < users.length; ++i) {
    //         if (users[i].tagName != "a") {
    //             users.splice(i, 1);
    //         }
    //     }
    //     console.log(users);
    //     return users;
    // }
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
