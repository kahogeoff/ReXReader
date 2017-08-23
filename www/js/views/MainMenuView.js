var m = require("mithril");
var MainMenu = require("../models/MainMenu");
var GalleryList = require("../models/GalleryList");

module.exports = {
    view: function (vnode) {
        return m("div", { class: "ts left sidebar inverted overlapped vertical large menu"}, [

            m("a", { class: "item", href: "/Home", oncreate: m.route.link, onclick: function(){
                ts('.left.inverted.sidebar').sidebar({
                    dimPage: true,
                    scrollLock: true
                }).sidebar('hide');
                GalleryList.reloadList();
                document.getElementById("gallery-holder").scrollTop = 0;
            }}, [
                m("i",{ class: "home icon"}),
                " 首頁"
            ]), 

            m("a", { class: "item", href: "/Liked", oncreate: m.route.link, onclick: function(){
                ts('.left.inverted.sidebar').sidebar({
                    dimPage: true,
                    scrollLock: true
                }).sidebar('hide');
                document.getElementById("gallery-holder").scrollTop = 0;
            }}, [
                m("i",{ class: "heart icon"}),
                " 我的最愛"
            ]), 
        ]);
    }
}