
get_users = {
    "www.reddit.com": function() {
        return document.getElementsByClassName("author");
    },
    "www.youtube.com": function() {
        return document.getElementsByClassName("comment-author-text");
    },
    "www.facebook.com": function() {
        return document.getElementsByClassName("UFICommentActorName");
    }
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

var censor_state = false


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
        let color = color_hash(users[i].textContent);
        users[i].style.color = (censor_state)? null:color;
        users[i].style.backgroundColor = (censor_state)? null:color;
    }
    censor_state = !censor_state;
});


function color_hash(name) {
    var val = 0;
    for (let i = 0; i < name.length; ++i) {
        val = ((val << 5) - val) + name.charCodeAt(i);
    }

    var R = val & 0xFF;
    var G = (val>>8) & 0xFF;
    var B = (val>>16) & 0xFF;

    return "rgb("+R+","+G+","+B+")"
}
