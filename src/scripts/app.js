var ReactNews = React.createClass({
    getInitialState: function() {
        return {data: [], selectedArticle: null};
    },
    componentDidMount: function() {
        var me = this,
            articleStore = new ArticleStore();

        AppDispatcher.register(function(payload){
            var action = null;
            if(me.listeners && me.listeners[payload.eventName]){
                action = me.listeners[payload.eventName];
                if(typeof action === "function"){
                    action.call(me, payload.content);
                }
                else if(typeof action === "string" && me[action]){
                    me[action].call(me, payload.content);
                }
            }
        });

        me.setStore(articleStore);
        me.loadData();

    },
    mask: function(){
        $('.loadmask.modal').show();
    },
    unmask: function(){
        $('.loadmask.modal').hide();
    },
    setStore: function(newStore){
        if(this.store){
            this.store.unbind('articlesLoaded', this.updateArticles);
            this.store = null;
        }
        if(newStore){
            newStore.bind('articlesLoaded', this.updateArticles);
            this.store = newStore;
        }
    },
    getStore: function(){
        return this.store;
    },
    loadData: function(){
        var me = this;
        me.mask();

        me.getStore().load().then(function(articles){
            me.unmask();
            $.material.init();
        });
    },
    updateArticles: function(){
        var me = this,
            articles = null;
        articles = me.getStore().getAll();
        me.setState({data: articles, selectedArticle: null});
    },
    selectArticle: function(selected){
        var me = this,
            store = me.getStore(),
            article = store.getById(selected.articleId);

        me.mask();
        store.getCommentsForArticle(article)
        .then(function(fullArticle){
            var articles = store.getAll();
            me.setState({data: articles, selectedArticle: article});
            me.unmask();
        })
    },
    showArticleList: function(){
        var me = this,
            store = me.getStore(),
            articles = store.getAll();

        me.setState({data: articles, selectedArticle: null});
    },
    render: function() {
        return (
            <div className="application container">
                <LoadMask />
                <Banner />
                
                { !this.state.selectedArticle ? 
                    <ArticleList data={this.state.data} /> :
                    null
                }

                { this.state.selectedArticle ? 
                    <CommentList article={this.state.selectedArticle} /> : 
                    null 
                }

            </div>
        );
    },
    listeners: {
        "reload": "loadData",
        "home": "showArticleList",
        "viewComments": "selectArticle"
    }
});

document.addEventListener("DOMContentLoaded", function(event) {
    window.AppDispatcher = new Flux.Dispatcher();

    React.render(
        <ReactNews />,
        document.getElementById('content')
    );
})