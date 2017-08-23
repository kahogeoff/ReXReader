var m = require("mithril");

module.exports = {
    view: function (vnode) {
        return m("div", { class: "ts disabled dimmer", id: "privacy-cover"},[
            m("div", { class: "ts active dimmer" },[
                m("h3", { class: "ts center aligned inverted icon header" },[
                   m("i", { class: "icons" }, [
                        m("i", { class: "small eye icon" }),
                        m("i", { class: "big negative dont icon" })
                   ]),
                   m("p", "不給您看！")
                ])
            ])
        ]);
    }
}