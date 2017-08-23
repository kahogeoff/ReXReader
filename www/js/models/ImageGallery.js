var m = require("mithril");
var ajax = require('@fdaciuk/ajax');

var ImageGallery = {
    max_list_page: 1,
    max_file_num: 1,
    current_loaded_page: 0,
    loaded_pages: [],
    gallery_url: "",
    default_src: 'https://e-hentai.org/',
    default_api: 'https://api.e-hentai.org/api.php',

    getGallery: function(gid, gtoken, file_count){
        ImageGallery.gallery_url = ImageGallery.default_src + "g/" + gid + "/" + gtoken + "/";
        ImageGallery.max_file_num = file_count;
        
        
    },

    getMaxListPage: function(gurl){
        var request = ajax({
            method: 'get',
            url: gurl,
            data: {
              p: 0
            }
        });

        request.then(function(response){
            //ImageGallery.getMaxListPage(response);
            var raw = response;
            //var regex_patten = /e-hentai\.org\/g\/(?:\d+)\/(?:\S+)\/?p=(\d+)/g;
            var regex_patten = new RegExp (ImageGallery.default_src+'g/(?:\\d+)/(?:\\S+)/?p=(\\d+)',"g");
            var tmp_a = [];
            while ((match = regex_patten.exec(raw)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (match.index === regex_patten.lastIndex) {
                    regex_patten.lastIndex++;
                }
                tmp_a.push(parseInt(match[1]));
            }
            ImageGallery.max_list_page = Math.max.apply(Math,tmp_a) + 1;
        });
    }


}

module.exports = ImageGallery