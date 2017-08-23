var m = require("mithril");

var Overlay = require("../models/Overlay");

module.exports = {
    view: function (vnode) {
        if(Overlay.isShow){
            return m("div", {class: "ts active dimmer", onclick: Overlay.hideOverlay}, [
                m("img", {class: "ts image", src: Overlay.src_url})
            ]);
        }else{
            return m("div", {class: "ts disabled dimmer"});
        }
    }
}