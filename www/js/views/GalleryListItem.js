
var m = require("mithril");
var Overlay = require("../models/Overlay");
var LikedList = require("../models/LikedList");

var GalleryCatLabel = require("./GalleryCatLabel");

module.exports = {
    view: function (vnode) {
        return m(".ts.raised.centered.card", [
            m(".extra.content",[
                    m(".small.header", [
                        m(".single.line", [
                            vnode.attrs.item.title
                        ])
                    ])
                ]
            ),
            m(".content", [
                m(".ts.1:1.embed", [
                    m("img", {
                        src: vnode.attrs.item.thumb,
                        onclick: function (){ Overlay.showOverlay(vnode.attrs.item.thumb); }
                    })
                ])
            ]),
            m(".center.aligned.extra.content", [
                m(".ts.horizontal.bulleted.link.list", [
                    m(".item", [
                        m(GalleryCatLabel, {
                            category: vnode.attrs.item.category
                        })
                    ]),
                    m(".item", [
                        m("a", {
                            href: "#"
                        }, "Someone")
                    ]),
                    m(".item", [
                        m("i", {
                            class: "star large warning icon"
                        }),
                        "x" + vnode.attrs.item.rating
                    ]),
                ])
            ]),
            m(".ts.fluid.bottom.attached.buttons", [
                m("button", {
                    class: "ts big icon button"
                }, [
                    m("i", {
                        class: "download icon"
                    }, ""),
                ]),
                m("button", {
                    class: "ts big primary icon button"
                }, [
                    m("i", {
                        class: "eye icon"
                    }, ""),
                ]),
                m("button", {
                    class: "ts big icon button",
                    onclick: function() {LikedList.toggleLikeGallery(vnode.attrs.item)}
                }, [
                    (LikedList.isGalleryInList(vnode.attrs.item))?
                        m("i", {class: "negative heart icon"}, "") : m("i", {class: "empty heart icon"}, ""),
                ])
            ])
        ])
    }
}
