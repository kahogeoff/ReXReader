var m = require("mithril");
var ajax = require('@fdaciuk/ajax');

var GalleryList = {
    current_loaded_page: 1,
    loaded_galleries: [],
    default_src: 'https://e-hentai.org/',
    default_api: 'https://api.e-hentai.org/api.php',
    is_loading: false,

    reloadList: function () {
        GalleryList.is_loading = false;
        GalleryList.loaded_galleries = [];
        GalleryList.current_loaded_page = 1;
        m.redraw();
        GalleryList.getGalleries(0);
    },

    getGalleries: function(pageID){
        var request = ajax({
            method: 'get',
            url: GalleryList.default_src,
            data: {
              page: pageID
            }
        });

        request.then(function(response){
            GalleryList.parsingRawGListHTML(response);
        });
    },

    parsingRawGListHTML: function(raw) {
        var tmp_gidlist = [];
        //var regex_patten = /class="it5"><a href="https:\/\/e-hentai\.org\/g\/(\d+)\/(\S+)\/"/g;
        var regex_patten = new RegExp ('class="it5"><a href="'+GalleryList.default_src+'g/(\\d+)/(\\S+)/"',"g");
        //console.log(raw);

        while ((match = regex_patten.exec(raw)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (match.index === regex_patten.lastIndex) {
                regex_patten.lastIndex++;
            }
            tmp_gidlist.push([ parseInt(match[1]), match[2] ]);
        }

        //this.set('gallery_list', tmp_gidlist);
        console.log(tmp_gidlist);
        GalleryList.getGalleryMetaData(tmp_gidlist);
    },

    getGalleryMetaData: function(gidlist){
        var tmp_data = {
            method: "gdata",
            gidlist: gidlist,
            namespace: 1
        };
        //console.log(tmp_data);
        //console.log(JSON.stringify(tmp_data));

        var request = ajax({
            method: 'post',
            url: GalleryList.default_api,
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(tmp_data)
        });

        request.then(function(response){
            console.log(response);
            GalleryList.extendCurrentGalleryList(response.gmetadata);
        });
    },

    extendCurrentGalleryList: function(data){
        var final_data = data;

        var tmp_glist = GalleryList.loaded_galleries;
        tmp_glist[GalleryList.current_loaded_page - 1] = final_data;
        GalleryList.loaded_galleries = tmp_glist;
        console.log(GalleryList.loaded_galleries);

        m.redraw();
    }
}

module.exports = GalleryList;