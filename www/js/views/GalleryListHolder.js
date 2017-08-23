var m = require("mithril");
var GalleryList = require("../models/GalleryList");

var GalleryListItem = require("./GalleryListItem");

module.exports = {
    oninit: function (vnode) {
        GalleryList.getGalleries(0);
    },
    view: function (vnode) {
        if (GalleryList.loaded_galleries.length < 1) {
            return m(".ts.active.centered.inline.text.loader", "載入中...");
        } else {
            return m(".ts.one.column.centered.grid", [
                GalleryList.loaded_galleries.map(function (page) {
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
                            m(".ts.horizontal.divider", [
                                m("i", {class: "caret up icon"}),
                                " Page " + (GalleryList.loaded_galleries.indexOf(page)+1) + " ",
                                m("i", {class: "caret up icon"})
                            ])
                        ])
                    ])
                })
            ]);
        }
    }
}