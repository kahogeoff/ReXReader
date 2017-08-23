var vm = new Moon({
    el: "#moon-instance",
    data: {
        current_state: 'home',
        current_loaded_page: 1,
        showPrivacyCover: false,
        showCover: false,
        shownCoverUrl: "",
        default_site: 'http://g.e-hentai.org/',
        default_api: 'https://api.e-hentai.org/api.php',
        loaded_list: [],
        gallery_list: [],
        liked_list: [],
        applied_filter: []
    },

    methods: {
        init: function (){
            this.callMethod('getGalleryList', [this.get('current_loaded_page') - 1]);
            this.set('loaded_list', this.get('gallery_list'));
        },

        getGalleryList: function(pageID) {
            var request = ajax({
                method: 'get',
                url: this.get('default_site'),
                data: {
                  page: pageID
                }
            });

            request.then(function(response){
                vm.callMethod('parsingRawGListHTML', [response]);
            });
        },

        parsingRawGListHTML: function(raw) {
            var tmp_gidlist = [];
            var regex_patten = /class="it5"><a href="https:\/\/e-hentai\.org\/g\/(\d+)\/(\S+)\/"/g;
            //console.log(raw);

            while ((m = regex_patten.exec(raw)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex_patten.lastIndex) {
                    regex_patten.lastIndex++;
                }
                tmp_gidlist.push([ parseInt(m[1]), m[2] ]);
            }

            //this.set('gallery_list', tmp_gidlist);
            console.log(tmp_gidlist);
            this.callMethod('getGalleryMetaData',[tmp_gidlist]);
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
                url: this.get('default_api'),
                headers: {
                    'content-type': 'application/json'
                },
                data: JSON.stringify(tmp_data)
            });

            request.then(function(response){
                console.log(response);
                vm.callMethod('extendCurrentGalleryList', [response]);
            });
        },

        extendCurrentGalleryList: function(data){
            var final_data = data;

            var tmp_glist = vm.get('gallery_list');
            tmp_glist[vm.get('current_loaded_page') - 1] = final_data;
            vm.set('gallery_list', tmp_glist);
            console.log(vm.get('gallery_list'));
        },
        
        reloadCurrentGalleryList: function (){
            this.set('gallery_list', []);
            this.set('current_state', 'home');
            this.callMethod('init');
            this.callMethod('toggleMenuSidebar');
        },

        showLikedGalleryList: function(){
            this.set('current_state', 'liked');
            this.set('loaded_list', [{
                gmetadata:this.get('liked_list')
            }]);
            console.log(this.get('liked_list'));
            console.log(this.get('loaded_list'));
            this.callMethod('toggleMenuSidebar');
        },

        toggleGalleryCover: function(coverUrl){
            if(!this.get('showCover'))
            {
                this.set('shownCoverUrl', coverUrl);
                this.set('showCover', true);
                StatusBar.overlaysWebView(true);
            }else{
                this.set('shownCoverUrl', "");
                this.set('showCover', false);
                StatusBar.overlaysWebView(false);
            }
        },

        togglePrivacyCover: function(state){
            this.set('showPrivacyCover', state);
            StatusBar.overlaysWebView(state);
            console.log(this.get('showPrivacyCover'));
        },

        toggleLikedGallery: function(gdata){
            var liked_list = this.get('liked_list');
            var indexOfDataInList = liked_list.indexOf(gdata);
            if(indexOfDataInList > -1){
                liked_list.splice(indexOfDataInList, 1);
            }else{
                liked_list.push(gdata);
            }
            this.set('liked_list', liked_list);
        },

        toggleMenuSidebar: function(){
            ts('.left.inverted.sidebar').sidebar({
                dimPage: true,
                scrollLock: true
            }).sidebar('toggle');
        }
    }
});

vm.callMethod('init');