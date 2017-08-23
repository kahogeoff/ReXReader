var m = require("mithril");

var LikedList = {
    liked_galleries: [],

    addGallery: function(gdata){
        LikedList.liked_galleries.push(gdata);
    },

    toggleLikeGallery: function(gdata){
        if(LikedList.isGalleryInList(gdata)){
            var targetIndex = LikedList.liked_galleries.findIndex(function(item){
                return item.gid === gdata.gid;
            });
            LikedList.liked_galleries.splice(targetIndex, 1);
        }else{
            LikedList.addGallery(gdata);
        }
    },

    isGalleryInList: function(gdata){
        var tmp = LikedList.liked_galleries.find(function(item){
            return item.gid === gdata.gid;
        });
        //var targetIndex = LikedList.liked_galleries.indexOf(gdata);
        //console.log(tmp);
        return !(tmp === undefined);
    }
}

module.exports = LikedList;