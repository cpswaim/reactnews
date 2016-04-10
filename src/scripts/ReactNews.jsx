import React from 'react';
import ArticleStore from './stores/ArticleStore';
import LoadMask from './components/LoadMask';
import Banner from './components/Banner';
import ArticleList from './components/ArticleList';
import CommentList from './components/CommentList';
import $ from 'jquery';

export default class ReactNews extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            selectedArticle: null
        };
        this.listeners = {
            "reload": "loadData",
            "home": "showArticleList",
            "viewComments": "selectArticle"
        };
    }
    componentDidMount() {
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
    }
    mask(){
        $('.loadmask.modal').show();
    }
    unmask(){
        $('.loadmask.modal').hide();
    }
    setStore(newStore){
        if(this.store){
            this.store.unbind('articlesLoaded', this.updateArticles.bind(this));
            this.store = null;
        }
        if(newStore){
            newStore.bind('articlesLoaded', this.updateArticles.bind(this));
            this.store = newStore;
        }
    }
    getStore(){
        return this.store;
    }
    loadData(){
        var me = this;
        me.mask();

        me.getStore().load().then(function(articles){
            me.unmask();
            $.material.init();
        });
    }
    updateArticles(){
        var me = this,
            articles = null;
        articles = me.getStore().getAll();
        me.setState({data: articles, selectedArticle: null});
    }
    selectArticle(selected){
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
    }
    showArticleList(){
        var me = this,
            store = me.getStore(),
            articles = store.getAll();

        me.setState({data: articles, selectedArticle: null});
    }
    render() {
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
    }
}