var m = require("mithril");
var LikedList = require("../models/LikedList");

var GalleryListItem = require("./GalleryListItem");

module.exports = {
    oninit: function (vnode) {
        //GalleryList.getGalleries(0);
    },
    view: function (vnode) {
        if (LikedList.liked_galleries.length < 1) {
            return m("h3", { class: "ts center aligned icon header" }, [
                m("i", { class: "negative empty heart icon"}),
                m("p", "沒有東西"),
                m("div", { class: "sub header" }, "您目前沒有標記任何「我的最愛」...")
            ]);
        } else {
            var tmp = [];
            tmp[0] = LikedList.liked_galleries;
            return m(".ts.one.column.centered.grid", [
                tmp.map(function (page) {
                    return m("div", [
                        m(".row",[
                            m(".ts.container", [
                                m(".ts.three.stackable.cards", [
                                    page.map(function (item) {
                                        return m(GalleryListItem, {
                                            item: item
                                        })
                                    })
                                ])
                            ])
                        ]),
                        m(".row", [
                            m(".ts.horizontal.divider", "到底了")
                        ])
                    ])
                })
            ]);
        }
    }
}