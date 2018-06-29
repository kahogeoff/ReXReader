var m = require("mithril");
var PullToRefresh = require("pulltorefreshjs");
//var Hammer = require('hammerjs');

var GalleryListHolder = require("./views/GalleryListHolder");
var LikedListHolder = require("./views/LikedListHolder");
var OverlayView = require("./views/OverlayView");
var PrivacyOverlay = require("./views/PrivacyOverlay");
var NavMenuView = require("./views/NavMenuView");
var MainMenuView = require("./views/MainMenuView");
var ImageGalleryView = require("./views/ImageGalleryView");

var GalleryList = require("./models/GalleryList");

/*
var swipeToShowMenu = function() {
    var stage = document.getElementById("gesture-stage");
    var mc = new Hammer.Manager(stage);
    mc.add(new Hammer.Swipe());

    mc.on('swiperight', function(e) {
        ts('.left.inverted.sidebar').sidebar({
            dimPage: true,
            scrollLock: true
        }).sidebar('show');
    });

    mc.on('swipeleft', function(e) {
        ts('.left.inverted.sidebar').sidebar({
            dimPage: true,
            scrollLock: true
        }).sidebar('hide');
    });
}
*/

var HomePage = {
    oncreate: function(){
        PullToRefresh.init({
            mainElement: '#reloader',
            triggerElement: "#gallery-holder",
            instructionsPullToRefresh: "下拉以重新載入⋯",
            instructionsReleaseToRefresh: "放開即可重新載入",
            instructionsRefreshing: "重新載入中⋯",
            shouldPullToRefresh: function(){
                return (document.getElementById("gallery-holder").scrollTop <= 0);
            },
            onRefresh: function(){ 
                GalleryList.reloadList();
            }
        });
    },
    view: function (vnode) {
        return m("div", {
            style: "width: 100vw; height: 100vh"
        }, [
            m(OverlayView),
            m(PrivacyOverlay),
            m(MainMenuView),
            m("div", {
                class: "pusher"
            }, [
                m(NavMenuView),
                m("div", {
                    class: "ts container gallery",
                    id: "gallery-holder",
                    onscroll: function(){
                        var tmp_dom = document.getElementById("gallery-holder");
                        if(GalleryList.loaded_galleries.length === GalleryList.current_loaded_page){
                            GalleryList.is_loading = false;
                        }
                        if ( tmp_dom.scrollTop >= (tmp_dom.scrollHeight - tmp_dom.offsetHeight) && !GalleryList.is_loading ){
                            GalleryList.is_loading = true;
                            GalleryList.current_loaded_page += 1;
                            GalleryList.getGalleries(GalleryList.current_loaded_page);
                        }
                    }
                }, [
                    m("div", {
                        class: "ts hidden divider",
                        id: "reloader"
                    }),
                    m(GalleryListHolder),
                    (GalleryList.is_loading)?m(".ts.active.centered.inline.text.loader", "載入中..."):"",
                    (GalleryList.is_loading)?m(".ts.hidden.divider"):""
                ])
            ])
        ])
    }
}

var LikedPage = {
    view: function () {
        return m("div", {
            style: "width: 100vw; height: 100vh"
        }, [
            m(OverlayView),
            m(PrivacyOverlay),
            m(MainMenuView),
            m("div", {
                class: "pusher"
            }, [
                m(NavMenuView),
                m("div", {
                    class: "ts container gallery",
                    id: "gallery-holder"
                }, [
                    m("div", {
                        class: "ts hidden divider"
                    }),
                    m(LikedListHolder)
                ])
            ])
        ])
    }
}

var GalleryPage = {
    view: function () {
        return m("div", {
            style: "width: 100vw; height: 100vh"
        }, [
            //m(OverlayView),
            m(PrivacyOverlay),
            m(MainMenuView),
            m("div", {
                class: "pusher"
            }, [
                m(NavMenuView, {is_gallery: 1}),
                m("div", {
                    class: "ts container gallery",
                    id: "gallery-holder"
                }, [
                    m("div", {
                        class: "ts hidden divider"
                    }),
                    m(ImageGalleryView)
                ])
            ])
        ])
    }
}

// Route handling
m.route(document.body, "/Home", {
    "/Home": HomePage,
    "/Liked": LikedPage,
    "/Gallery": GalleryPage
});