var m = require("mithril");
var ImageGallery = require("../models/ImageGallery");

module.exports = {
    oninit: function (vnode) {
        var gid = Number(m.route.param("gid"))
        var gtoken = String(m.route.param("gtoken"))
        console.log(gid)
    },
    view: function (vnode) {
        return m(".ts.active.centered.inline.text.loader", "載入中...")
    }
}