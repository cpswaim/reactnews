/**
{
	"by": "infinite8s",
	"descendants": 60,
	"id": 11053525,
	"kids": [
		11054270,
		11054081,
		11053824,
		11053778,
		11053966,
		11053937,
		11053777,
		11054075,
		11054098,
		11053714,
		11053971,
		11054238,
		11054056,
		11053962,
		11053794
	],
	"score": 104,
	"time": 1454864038,
	"title": "Records: Python library for making raw SQL queries to Postgres databases",
	"type": "story",
	"url": "https://github.com/kennethreitz/records"
}
**/

var ArticleStore = function() {

	var me = this,
		items = [],
		map = {},
		dispatcher = AppDispatcher,
		api = new ArticleService();

	if(!dispatcher){
		console.error("No AppDispatcher found, creating a global dispatcher.");
		dispatcher = window.AppDispatcher = new Flux.Dispatcher();
	}

    me.getApi = function(){
    	return api;
    }

    me.load = function(){
    	return api.getArticleList(0, 10)
    		.then(function(articles){
    			me.addAll(articles);
    			me.trigger('articlesLoaded');
    		});
    }

	me.getAll = function(){
		return items;
	};

	me.removeAll = function(){
		items = [];
		map = {};

		me.trigger('articlesChanged');
	};

	me.addAll = function(additions){
		me.removeAll();
		additions.forEach(function(item){
			if(item && item.id){
				map[item.id] = item;
			}
		});

		items = additions;
		me.trigger('articlesChanged');
	};

	me.getById = function(id){
		return map[id];
	};

	// Add event triggers
	MicroEvent.mixin(me);

}