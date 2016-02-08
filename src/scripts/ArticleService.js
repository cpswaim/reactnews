var ArticleService = function() {
    var me = this,
        firebaseApi = new Firebase("https://hacker-news.firebaseio.com/v0/");

    var isNumber = function(val){
        return typeof val === "number";
    }

    me.getTopStoriesList = function(start, limit) {
        return new Promise(function(resolve, reject) {
            var count = 0,
                endpoint = firebaseApi.child('topstories'),
                valueChange = function(response) {
                    var topStories = response.val();
                    if(limit && limit > 0){
                        if(!start || !(start < limit) || !(start > 0)) {
                            start = 0;
                        }
                        topStories = topStories.slice(start, limit);
                    }
                    resolve(topStories);
                    endpoint.off('value', valueChange);
                };
            endpoint.on('value', valueChange);
        });
    };

    me.getItemById = function(itemId) {
        return new Promise(function(resolve, reject) {
            var endpoint = (itemId) ? firebaseApi.child('item').child(itemId) : null,
                valueChange = function(response) {
                    var item = response.val();
                    resolve(item);
                    if (endpoint) {
                        endpoint.off('value', valueChange);
                    }
                };
            endpoint.on('value', valueChange);
        })
    };

    me.getItemsByIds = function(items){
        return new Promise(function(resolve, reject){
            var i = 0,
                itemsToResolve = [],
                itemId = null
                prms = null;

            if(items && items.length){
                for(i = 0; i < items.length; i++){
                    itemId = items[i];
                    if(itemId){
                        prms = me.getItemById(itemId);
                    }
                    if(prms){
                        itemsToResolve.push(prms);
                    }
                    prms = null;
                }
            }

            if(itemsToResolve && itemsToResolve.length){
                Promise.all(itemsToResolve).then(function(itemList){
                    resolve(itemList);
                })
            }
        })
    }

    me.getArticleList = function(start, limit){
        return new Promise(function(resolve, reject){
            me.getTopStoriesList(start, limit).then(function(storyList){
                var prms = null;
                prms = me.getItemsByIds(storyList);
                prms.then(function(articleList){
                    resolve(articleList);
                })
            });
        });
    };

    me.getCommentTree = function(item, depth, fullResolve) {
        var i = 0,
            depth = depth || 0,
            prms = null,
            kidPrmsList = [];

        return new Promise(function(resolve, reject) {
            
            //Check to make sure the article has childern 
            // and these children aren't already resolved
            if (item && item.kids && item.kids.length > 0 &&
                item.kids.every(isNumber)) {
                prms = me.getItemsByIds(item.kids);
                prms.then(function(kids) {
                    item.kids = kids;
                    if(!fullResolve && depth === 0) {
                        resolve(item);
                    }
                    else if(kids && kids.length){
                        for(i = 0; i < kids.length; i++){
                            kidPrmsList.push(me.getCommentTree(kids[i], depth-1, fullResolve));
                        }
                        Promise.all(kidPrmsList).then(function(kids){
                            resolve(item);
                        })
                    }
                });
            }
            else {
                resolve(item);
            }

        });
    }

// {
//     "by": "danso",
//     "id": 9019137,
//     "kids": [9019301, 9019404, 9019417, 9019389, 9019405, 9019442, 9019207, 9019203, 9019452, 9019336, 9019321],
//     "score": 91,
//     "text": "",
//     "time": 1423440827,
//     "title": "Annotated code: Circles bouncing off lines",
//     "type": "story",
//     "url": "http://annotated-code.maryrosecook.com/circles-bouncing-off-lines/index.html"
// };
};