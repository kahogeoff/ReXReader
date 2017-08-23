var m = require("mithril");

var Overlay = {
    isShow: false,
    src_url: "",
    showOverlay: function (url) {
        StatusBar.overlaysWebView(true);
        document.getElementById("gallery-holder").classList.add("disabled");

        Overlay.src_url = url;
        Overlay.isShow = true;

        m.redraw();
    },
    
    hideOverlay: function() {
        StatusBar.overlaysWebView(false);
        document.getElementById("gallery-holder").classList.remove("disabled");

        Overlay.isShow = false;
    },

    toggleOverlay: function(url){
        if(Overlay.isShow){
            Overlay.hideOverlay();
        }else{
            Overlay.showOverlay(url);
        }
    }
}

module.exports = Overlay;