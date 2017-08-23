var m = require("mithril");

module.exports = {
    view: function (vnode) {
        var final_class = "";
        switch (vnode.attrs.category) {
            case "Doujinshi":
                final_class = "ts circular doujinshi label";
                break;
            case "Manga":
                final_class = "ts circular manga label";
                break;
            case "Artist CG Sets":
                final_class = "ts circular acg label";
                break;
            case "Game CG Sets":
                final_class = "ts circular gcg label";
                break;
            case "Western":
                final_class = "ts circular western label";
                break;
            case "Non-H":
                final_class = "ts circular nonh label";
                break;
            case "Image Sets":
                final_class = "ts circular imageset label";
                break;
            case "Cosplay":
                final_class = "ts circular cosplay label";
                break;
            case "Misc":
                final_class = "ts circular label";
                break;
        }
        return m("span", {
            class: final_class
        }, vnode.attrs.category);
    },
}