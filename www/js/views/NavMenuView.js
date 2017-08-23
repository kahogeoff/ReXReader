var m = require("mithril");
var NavMenu = require("../models/NavMenu");

module.exports = {
    view: function (vnode) {
        return m("div", { class: "ts borderless inverted primary raised top fixed fluid large menu" },[
            m("a", { class: "item",  onclick: NavMenu.toggleMainMenu}, [
                m("i", { class: "list icon" }, "")
            ]),
            m("div", { class: "header stretched center aligned item" }, "Gallery List"),
            m("a", { class: "item"}, [
                m("i", { class: "search icon" }, "")
            ])
        ]);
    }
}