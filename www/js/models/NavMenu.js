var m = require("mithril");

var NavMenu = {
    toggleMainMenu: function(){
        ts('.left.inverted.sidebar').sidebar({
            dimPage: true,
            scrollLock: true
        }).sidebar('toggle');
    }
}

module.exports = NavMenu;