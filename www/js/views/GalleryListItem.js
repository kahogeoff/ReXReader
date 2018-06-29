
var m = require("mithril");
var Overlay = require("../models/Overlay");
var LikedList = require("../models/LikedList");

var GalleryCatLabel = require("./GalleryCatLabel");

var tagParser = function (tag_list) {
    var list_size = tag_list.length
    var tag_info = { artist: 0, group: 0, others:[] }
    for (let i = 0; i < list_size; i++) {
        const element = tag_list[i]
        if (element.startsWith('artist:')) {
            tag_info["artist"] = element.replace('artist:', '')
        }else if (element.startsWith('group:')) {
            tag_info["group"] = element.replace('group:', '')
        }else{
            tag_info["others"].push(element)
        }
    }

    return tag_info
}

var displaytName = function (name){
    var output = ""
    var splited_name = name.split(" ")

    for (const i in splited_name) {
        var name_part = splited_name[i]
        
        output += name_part.replace(name_part[0], name_part[0].toUpperCase())
        if(i < splited_name.length - 1){
            output += " "
        }
    }

    return output
}

module.exports = {
    view: function (vnode) {
        var tag_info = tagParser(vnode.attrs.item.tags)
        var artist_name = displaytName(tag_info["artist"] !== 0? tag_info["artist"] : (tag_info["group"] !== 0? tag_info["group"] : "*Unknown*"))

        return m(".ts.raised.centered.card", [

            // Gallery title
            m(".extra.content",[
                    m(".small.header", [
                        m(".single.line", [
                            vnode.attrs.item.title
                        ])
                    ])
                ]
            ),

            // Gallery Cover
            m(".content", [
                m(".ts.1:1.embed", [
                    m("img", {
                        src: vnode.attrs.item.thumb,
                        onclick: function (){ Overlay.showOverlay(vnode.attrs.item.thumb); }
                    })
                ])
            ]),

            // Gallery Info
            m(".center.aligned.extra.content", [
                m(".ts.horizontal.bulleted.link.list", [

                    // Category
                    m(".item", [
                        m(GalleryCatLabel, {
                            category: vnode.attrs.item.category
                        })
                    ]),

                    // Artist/Group name
                    m(".item", [
                        m("a", {
                            href: "#",
                            style: ""
                        }, artist_name)
                    ]),

                    // Rating
                    m(".item", [
                        m("i", {
                            class: "star large warning icon"
                        }),
                        "x" + vnode.attrs.item.rating
                    ]),
                ])
            ]),

            // Control Buttons
            m(".ts.fluid.bottom.attached.buttons", [

                // "Download" Button
                m("button", {
                    class: "ts big icon button"
                }, [
                    m("i", {
                        class: "download icon"
                    }, ""),
                ]),

                // "Read Gallery" Button
                m("a", {
                    class: "ts big primary icon button",
                    href: `/Gallery?gid=${vnode.attrs.item.gid}&gtoken=${vnode.attrs.item.token}`,
                    oncreate: m.route.link, 
                    onclick: function() { 
                        console.log("Read the gallery")
                    }
                }, [
                    m("i", {
                        class: "eye icon"
                    }, ""),
                ]),

                // "Like" Button
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
