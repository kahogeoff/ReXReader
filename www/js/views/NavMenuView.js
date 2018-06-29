var m = require("mithril");
var NavMenu = require("../models/NavMenu");

module.exports = {
    data: {
        menu_buttons: []
    },
    oninit: function (vnode) {
        console.log(`Is gallery? ${vnode.attrs.is_gallery}`)
        var search_button = m("a", { class: "item"}, [
            m("i", { class: "search icon" }, "")
        ])

        var back_button = m("a", { 
            class: "item",
            href: "/Home",
            oncreate: m.route.link, 
            onclick: function() { 
            }
        }, [
            m("i", { class: "cancel icon" }, "")
        ])

        var is_gallery = Number(vnode.attrs.is_gallery) === 1 || false
        vnode.state.data.menu_buttons = [
            m("a", { class: "item",  onclick: NavMenu.toggleMainMenu}, [
                m("i", { class: "list icon" }, "")
            ]),
            m("div", { class: "header stretched center aligned item" }, "Gallery List"),
            (!is_gallery? search_button: back_button)
        ]
    },
    view: function (vnode) {
        return m("div", { class: "ts borderless inverted primary raised top fixed fluid large menu" }, 
            vnode.state.data.menu_buttons
        );
    }
}